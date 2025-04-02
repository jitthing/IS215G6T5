from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import schemas, models, database
from .matching import find_matching_buyers
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

@app.get("/buyers", response_model=List[schemas.Buyer])
def get_buyers(db: Session = Depends(database.get_db)):
    return db.query(models.Buyer).all()

@app.get("/sellers", response_model=List[schemas.Seller])
def get_sellers(db: Session = Depends(database.get_db)):
    return db.query(models.Seller).all()

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
    matching_buyers = find_matching_buyers(property, buyers)
    
    return {
        "property": property,
        "matching_buyers": matching_buyers
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