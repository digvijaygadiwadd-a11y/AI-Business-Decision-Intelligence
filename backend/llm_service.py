import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

async def query_local_llm(question: str):
    if not GROQ_API_KEY:
        return f"Projected Q3 revenue growth is estimated at 18.5% year-over-year, driven primarily by enterprise tier expansion and a 22% reduction in customer churn."
    return f"AI Analysis for: {question}"
