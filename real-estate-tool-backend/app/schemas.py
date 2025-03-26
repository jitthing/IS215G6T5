from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class PredictRequest(BaseModel):
    size: int
    lease: int
    remaining_months: int
    flat_type: str
    floor_cat: str

class PredictResponse(BaseModel):
    status: str
    amount: int