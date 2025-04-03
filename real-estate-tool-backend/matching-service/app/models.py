from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Buyer(Base):
    __tablename__ = "buyers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    contact = Column(String)
    preferences = Column(String)
    embedded_string = Column(String, nullable=True)
    agent_id = Column(Integer, nullable=True)

class Seller(Base):
    __tablename__ = "sellers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    contact = Column(String)
    agent_id = Column(Integer, nullable=True)
    
    # Relationship with properties
    properties = relationship("Property", back_populates="seller")

class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    seller_id = Column(Integer, ForeignKey("sellers.id"))
    property_type = Column(String)
    floor_area_sqm = Column(Float)
    remaining_lease_years = Column(Integer)
    remaining_lease_months = Column(Integer)
    flat_type = Column(String)
    floor_category = Column(String)
    town = Column(String)
    block = Column(String)
    street_name = Column(String)
    description = Column(String)
    asking_price = Column(Float)
    
    # Relationship with seller
    seller = relationship("Seller", back_populates="properties")