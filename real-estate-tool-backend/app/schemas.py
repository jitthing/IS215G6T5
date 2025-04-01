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
    
class Property(BaseModel):
    id: Optional[int] = None
    seller_id: int
    property_type: str
    floor_area_sqm: float
    remaining_lease_years: int
    remaining_lease_months: int
    flat_type: str
    floor_category: str
    town: str
    block: str
    street_name: str
    description: str
    asking_price: float

class Buyer(BaseModel):
    id: Optional[int] = None
    name: str
    contact: str
    preferences: str  # This will contain the buyer's requirements as text

class Seller(BaseModel):
    id: Optional[int] = None
    name: str
    contact: str

class PropertyWithMatchingBuyers(BaseModel):
    property: Property
    matching_buyers: List[Buyer]