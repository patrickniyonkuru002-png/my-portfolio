from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings
import os
import ssl

# Remove the unsupported 'ssl-mode' parameter from the URL for pymysql
db_url = settings.DATABASE_URL
if "?ssl-mode=REQUIRED" in db_url:
    db_url = db_url.replace("?ssl-mode=REQUIRED", "")

# Set up SSL arguments
ssl_args = {}
ca_cert = os.getenv("CA_CERT")

if ca_cert:
    # Create an SSL context and pass the certificate TEXT directly
    ssl_context = ssl.create_default_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_REQUIRED
    try:
        ssl_context.load_verify_locations(cadata=ca_cert)
    except Exception as e:
        print(f"Warning: Could not load CA cert: {e}")

    ssl_args = {
        "ssl": ssl_context
    }

engine = create_engine(
    db_url, 
    pool_pre_ping=True,
    connect_args=ssl_args
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()