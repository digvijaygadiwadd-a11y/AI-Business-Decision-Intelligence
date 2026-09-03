from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sqlglot
from sqlglot import exp

router = APIRouter(prefix="/api/v1/secure", tags=["Security & AST Validation"])

class QueryPayload(BaseModel):
    sql: str
    dialect: str = "sql"

@router.post("/analyze")
def analyze_query(payload: QueryPayload):
    try:
        parsed = sqlglot.parse_one(payload.sql, read=payload.dialect)
        
        forbidden_types = (exp.Drop, exp.Delete, exp.Alter)
        if isinstance(parsed, forbidden_types):
            raise HTTPException(
                status_code=400, 
                detail=f"Security Violation: '{parsed.key.upper()}' statements are strictly forbidden."
            )

        return {
            "status": "success",
            "dialect": payload.dialect,
            "ast": str(parsed),
            "message": "Query successfully validated via SQLGlot AST."
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid SQL Query: {str(e)}")
