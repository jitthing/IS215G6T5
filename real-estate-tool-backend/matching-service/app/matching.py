from sentence_transformers import SentenceTransformer
import numpy as np
from typing import List
from .schemas import Property, Buyer

# Load the model once when the module is imported
model = SentenceTransformer('all-MiniLM-L6-v2')  # You can choose a different model

def get_property_embedding(property: Property) -> np.ndarray:
    """Convert property details to an embedding vector"""
    property_text = f"{property.property_type} in {property.town}, {property.flat_type}, {property.floor_area_sqm} sqm, " \
                    f"floor {property.floor_category}, remaining lease {property.remaining_lease_years} years " \
                    f"{property.remaining_lease_months} months. {property.description}"
    return model.encode(property_text)

def get_buyer_embedding(buyer: Buyer) -> np.ndarray:
    """Convert buyer preferences to an embedding vector"""
    return model.encode(buyer.preferences)

def find_matching_buyers(property: Property, buyers: List[Buyer], top_n: int = 5) -> List[dict]:
    """Find the top N buyers that match a property based on semantic similarity"""
    if not buyers:
        return []
    
    property_embedding = get_property_embedding(property)
    
    # Calculate similarity scores for all buyers
    buyer_scores = []
    for buyer in buyers:
        buyer_embedding = get_buyer_embedding(buyer)
        # Cosine similarity
        similarity = np.dot(property_embedding, buyer_embedding) / (np.linalg.norm(property_embedding) * np.linalg.norm(buyer_embedding))
        # Convert Buyer object to dict and add match_score
        buyer_dict = {**buyer.__dict__}
        if '_sa_instance_state' in buyer_dict:
            buyer_dict.pop('_sa_instance_state')
        buyer_dict['match_score'] = int(similarity * 100)  # Convert to percentage
        buyer_scores.append((buyer_dict, similarity))
    
    # Sort by similarity score (highest first)
    buyer_scores.sort(key=lambda x: x[1], reverse=True)
    
    # Return top N buyers with scores included
    return [buyer for buyer, _ in buyer_scores[:top_n]]

def find_suggested_properties(buyer: Buyer, properties: List[Property], top_n: int = 5) -> List[dict]:
    """Find the top N properties that match a buyer based on semantic similarity"""
    if not properties:
        return []
    
    buyer_embedding = get_buyer_embedding(buyer)
    
    # Calculate similarity scores for all properties
    property_scores = []
    for property in properties:
        property_embedding = get_property_embedding(property)
        # Cosine similarity
        similarity = np.dot(buyer_embedding, property_embedding) / (np.linalg.norm(buyer_embedding) * np.linalg.norm(property_embedding))
        # Convert Property object to dict and add match_score
        property_dict = {**property.__dict__}
        if '_sa_instance_state' in property_dict:
            property_dict.pop('_sa_instance_state')
        property_dict['match_score'] = int(similarity * 100)  # Convert to percentage
        property_scores.append((property_dict, similarity))
    
    # Sort by similarity score (highest first)
    property_scores.sort(key=lambda x: x[1], reverse=True)
    
    # Return top N properties with scores included
    return [property for property, _ in property_scores[:top_n]]