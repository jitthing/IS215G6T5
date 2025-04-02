from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from . import schemas
# import seaborn as sns
# import matplotlib.pyplot as plt
import warnings
# import statsmodels.api as sm
warnings.filterwarnings("ignore")
from .matching import find_matching_buyers
from typing import List
# from . import database 


app = FastAPI(title="Agent Matching Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

mock_buyers = [
    schemas.Buyer(
        id=1,
        name="John Smith",
        contact="(555) 123-4567",
        preferences="Looking for a 3-room flat in Ang Mo Kio with good ventilation, near MRT, below 300k"
    ),
    schemas.Buyer(
        id=2,
        name="Sarah Johnson",
        contact="(555) 987-6543",
        preferences="Interested in a 4-room flat in Bishan, high floor, good school zone, budget 450k"
    ),
    schemas.Buyer(
        id=4,
        name="Emily Wilson",
        contact="(555) 789-0123",
        preferences="Looking for an executive flat in Tampines, at least 110 sqm, remaining lease > 70 years"
    ),
    schemas.Buyer(
        id=5,
        name="Michael Chang",
        contact="(555) 234-5678",
        preferences="Searching for a 5-room flat in Bedok, near amenities, medium floor, budget 520k"
    ),
    schemas.Buyer(
        id=6,
        name="Lisa Wong",
        contact="(555) 345-6789",
        preferences="Interested in a 3-room flat in Toa Payoh, renovated, near hawker center, max 350k"
    )
]

mock_sellers = [
    schemas.Seller(
        id=3,
        name="Robert Davis",
        contact="(555) 456-7890"
    ),
    schemas.Seller(
        id=7,
        name="James Lee",
        contact="(555) 567-8901"
    ),
    schemas.Seller(
        id=8,
        name="Sophia Tan",
        contact="(555) 678-9012"
    )
]

mock_properties = [
    schemas.Property(
        id=1,
        seller_id=3,
        property_type="HDB",
        floor_area_sqm=95,
        remaining_lease_years=55,
        remaining_lease_months=4,
        flat_type="4 ROOM",
        floor_category="medium",
        town="BISHAN",
        block="123",
        street_name="BISHAN STREET 13",
        description="Well-maintained 4-room flat near Bishan MRT, good ventilation, recently renovated kitchen",
        asking_price=420000
    ),
    schemas.Property(
        id=2,
        seller_id=7,
        property_type="HDB",
        floor_area_sqm=67,
        remaining_lease_years=60,
        remaining_lease_months=7,
        flat_type="3 ROOM",
        floor_category="low",
        town="ANG MO KIO",
        block="108",
        street_name="ANG MO KIO AVE 4",
        description="Cozy 3-room flat in Ang Mo Kio, walking distance to amenities, well-maintained",
        asking_price=280000
    ),
    schemas.Property(
        id=3,
        seller_id=8,
        property_type="HDB",
        floor_area_sqm=110,
        remaining_lease_years=72,
        remaining_lease_months=2,
        flat_type="EXECUTIVE",
        floor_category="high",
        town="TAMPINES",
        block="456",
        street_name="TAMPINES STREET 42",
        description="Spacious executive flat in Tampines with excellent view, near shopping mall and MRT",
        asking_price=580000
    )
]

@app.post("/sellers/{seller_id}/properties", response_model=schemas.Property)
def add_property(seller_id: int, property: schemas.Property):
    # Add property to database
    property.seller_id = seller_id
    property.id = len(mock_properties) + 1
    mock_properties.append(property)
    return property

@app.get("/sellers/{seller_id}/properties", response_model=List[schemas.Property])
def get_seller_properties(seller_id: int):
    # Get all properties for a seller
    return [p for p in mock_properties if p.seller_id == seller_id]

@app.get("/properties/{property_id}/matching-buyers", response_model=schemas.PropertyWithMatchingBuyers)
def get_matching_buyers(property_id: int):
    # Find the property
    property = next((p for p in mock_properties if p.id == property_id), None)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Find matching buyers
    matching_buyers = find_matching_buyers(property, mock_buyers)
    
    return {
        "property": property,
        "matching_buyers": matching_buyers
    }

@app.post("/buyers", response_model=schemas.Buyer)
def add_buyer(buyer: schemas.Buyer):
    # Add buyer to database
    buyer.id = len(mock_buyers) + 1
    mock_buyers.append(buyer)
    return buyer

@app.post("/sellers", response_model=schemas.Seller)
def add_seller(seller: schemas.Seller):
    # Add seller to database
    seller.id = len(mock_sellers) + 1
    mock_sellers.append(seller)
    return seller