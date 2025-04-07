from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import schemas, models, database
from . import matching
# from .matching import find_matching_buyers, find_suggested_properties
from typing import List
import warnings

warnings.filterwarnings("ignore")

# Create database tables
models.Base.metadata.create_all(bind=database.engine)

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

@app.get("/buyers/{id}", response_model=List[schemas.Buyer])
def get_buyers(id: int, db: Session = Depends(database.get_db)):
    buyers = db.query(models.Buyer).filter(models.Buyer.agent_id == id).all()
    if not buyers:
        raise HTTPException(status_code=404, detail=f"No buyers found for agent with id {id}")
    return buyers

@app.get("/sellers/{id}", response_model=List[schemas.Seller])
def get_sellers(id: int, db: Session = Depends(database.get_db)):
    sellers = db.query(models.Seller).filter(models.Seller.agent_id == id).all()
    if not sellers:
        raise HTTPException(status_code=404, detail=f"No sellers found for agent with id {id}")
    return sellers

@app.post("/sellers/{seller_id}/properties", response_model=schemas.Property)
def add_property(seller_id: int, property_data: schemas.PropertyCreate, db: Session = Depends(database.get_db)):
    # Check if seller exists
    seller = db.query(models.Seller).filter(models.Seller.id == seller_id).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Seller not found")
    
    # Create new property
    db_property = models.Property(**property_data.dict(), seller_id=seller_id)
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    return db_property

@app.get("/sellers/{seller_id}/properties", response_model=List[schemas.Property])
def get_seller_properties(seller_id: int, db: Session = Depends(database.get_db)):
    # Check if seller exists
    seller = db.query(models.Seller).filter(models.Seller.id == seller_id).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Seller not found")
    
    # Get all properties for a seller
    return db.query(models.Property).filter(models.Property.seller_id == seller_id).all()

@app.get("/properties/{property_id}/matching-buyers", response_model=schemas.PropertyWithMatchingBuyers)
def get_matching_buyers(property_id: int, db: Session = Depends(database.get_db)):
    # Find the property
    property = db.query(models.Property).filter(models.Property.id == property_id).first()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Get all buyers
    buyers = db.query(models.Buyer).all()
    
    # Find matching buyers
    matching_buyers = matching.find_matching_buyers(property, buyers)
    
    return {
        "property": property,
        "matching_buyers": matching_buyers
    }

@app.get("/buyers/{buyer_id}/suggested-properties")
def get_suggested_properties(buyer_id: int, db: Session = Depends(database.get_db)):
    # Find the buyer
    buyer = db.query(models.Buyer).filter(models.Buyer.id == buyer_id).first()
    if not buyer:
        raise HTTPException(status_code=404, detail="Buyer not found")
    
    # Get all properties
    properties = db.query(models.Property).all()
    print(f"[DEBUG] Properties: {properties}")
    
    # Find matching properties (now returns dicts with match_score included)
    suggested_properties = matching.find_suggested_properties(buyer, properties)
    print(f"[DEBUG] Suggested properties count: {len(suggested_properties)}")
    
    return {
        "buyer": buyer,
        "suggested_properties": suggested_properties
    }

@app.post("/buyers", response_model=schemas.Buyer)
def add_buyer(buyer: schemas.BuyerCreate, db: Session = Depends(database.get_db)):
    # Add buyer to database
    db_buyer = models.Buyer(**buyer.dict())
    db.add(db_buyer)
    db.commit()
    db.refresh(db_buyer)
    return db_buyer

@app.post("/sellers", response_model=schemas.Seller)
def add_seller(seller: schemas.SellerCreate, db: Session = Depends(database.get_db)):
    # Add seller to database
    db_seller = models.Seller(**seller.dict())
    db.add(db_seller)
    db.commit()
    db.refresh(db_seller)
    return db_seller

@app.get("/properties", response_model=List[schemas.Property])
def get_properties(db: Session = Depends(database.get_db)):
    # Get all properties
    return db.query(models.Property).all()

@app.get("/properties/{property_id}", response_model=schemas.Property)
def get_property(property_id: int, db: Session = Depends(database.get_db)):
    # Find the property
    property = db.query(models.Property).filter(models.Property.id == property_id).first()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return property