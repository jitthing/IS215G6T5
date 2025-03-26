from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class PredictRequest(BaseModel):
    size: str
    lease: str
    remaining_months: str
    flat_type: str
    floor_cat: str

class PredictResponse(BaseModel):
    status: str
    amount: int