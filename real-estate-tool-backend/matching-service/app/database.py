from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import time

# Default to a SQLite database if no DATABASE_URL is provided (for local development)
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./matching_service.db")
MAX_RETRIES = 10  # Number of attempts
RETRY_DELAY = 5  # Seconds between retries

def get_db_connection():
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            # Connect with the right parameters depending on database type
            if SQLALCHEMY_DATABASE_URL.startswith('sqlite'):
                engine = create_engine(
                    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
                )
            else:
                engine = create_engine(
                    SQLALCHEMY_DATABASE_URL, pool_pre_ping=True, pool_recycle=300
                )
            
            # Test a quick connection
            conn = engine.connect()
            conn.close()
            return engine
        except Exception as e:
            if attempt < MAX_RETRIES:
                print(
                    f"[Matching-Service] DB connection attempt {attempt} failed: {e}. "
                    f"Retrying in {RETRY_DELAY} seconds..."
                )
                time.sleep(RETRY_DELAY)
            else:
                raise Exception(
                    "[Matching-Service] Database connection failed after multiple attempts."
                ) from e

engine = get_db_connection()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
