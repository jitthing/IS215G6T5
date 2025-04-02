from pydantic import BaseModel
from typing import Optional, List

# Base schemas for creation operations
class BuyerCreate(BaseModel):
    name: str
    contact: str
    preferences: str

class SellerCreate(BaseModel):
    name: str
    contact: str

class PropertyCreate(BaseModel):
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

# Schemas for response models including IDs
class Property(PropertyCreate):
    id: int
    seller_id: int

    class Config:
        orm_mode = True

class Buyer(BuyerCreate):
    id: int

    class Config:
        orm_mode = True

class Seller(SellerCreate):
    id: int

    class Config:
        orm_mode = True

class PropertyWithMatchingBuyers(BaseModel):
    property: Property
    matching_buyers: List[Buyer]

    class Config:
        orm_mode = True