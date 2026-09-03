from datetime import datetime, timedelta
from typing import Optional
import asyncio
import io
import pandas as pd
from fastapi import FastAPI, Depends, HTTPException, status, Request, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from jose import jwt, JWTError
from dotenv import load_dotenv

load_dotenv()

from backend.auth import verify_password, create_access_token, get_password_hash, SECRET_KEY, ALGORITHM
from backend.llm_service import query_local_llm

SQLALCHEMY_DATABASE_URL = "sqlite:///./business_intelligence.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="viewer")

class QueryLog(Base):
    __tablename__ = "query_logs"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    question = Column(Text)
    answer = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="AI Business Decision Intelligence API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    try:
        admin_user = db.query(User).filter(User.username == "admin").first()
        if not admin_user:
            hashed_admin = get_password_hash("admin123")
            db.add(User(username="admin", hashed_password=hashed_admin, role="admin"))
        
        viewer_user = db.query(User).filter(User.username == "viewer").first()
        if not viewer_user:
            hashed_viewer = get_password_hash("viewerpassword")
            db.add(User(username="viewer", hashed_password=hashed_viewer, role="viewer"))
        
        db.commit()
    finally:
        db.close()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    return user

@app.post("/api/auth/login")
@limiter.limit("5/minute")
def login(request: Request, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.username == form_data.username).first()
        if not user or not verify_password(form_data.password, user.hashed_password):
            raise HTTPException(status_code=400, detail="Incorrect username or password")
        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(
            data={"sub": user.username, "role": user.role}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer", "role": user.role}
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Login failed: {type(e).__name__}: {e}")

class QueryRequest(BaseModel):
    question: str

class QueryWrapper(BaseModel):
    payload: QueryRequest

@app.post("/api/nlp-query")
async def nlp_query(query_data: QueryWrapper, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    question = query_data.payload.question
    try:
        answer = await query_local_llm(question)
        if not answer:
            answer = "Standard heuristic response: AI service unavailable."
            
        db_log = QueryLog(username=current_user.username, question=question, answer=answer)
        db.add(db_log)
        db.commit()

        return {"question": question, "answer": answer, "user": current_user.username}
    except Exception as e:
        return {"question": question, "answer": f"Error communicating with LLM: {str(e)}", "user": current_user.username}

@app.get("/api/history")
def get_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    logs = db.query(QueryLog).filter(QueryLog.username == current_user.username).all()
    return [{"id": l.id, "question": l.question, "answer": l.answer, "timestamp": l.timestamp} for l in logs]

@app.get("/api/export/excel")
def export_excel(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    logs = db.query(QueryLog).filter(QueryLog.username == current_user.username).all()
    df = pd.DataFrame([{"ID": l.id, "Timestamp": l.timestamp, "Question": l.question, "Answer": l.answer} for l in logs])
    output = io.BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Query History')
    output.seek(0)
    return StreamingResponse(output, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", headers={"Content-Disposition": "attachment; filename=business_intelligence_report.xlsx"})
