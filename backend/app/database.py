from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings
import os
import ssl

# Remove the unsupported 'ssl-mode' parameter from the URL for pymysql
db_url = settings.DATABASE_URL
if "?ssl-mode=REQUIRED" in db_url:
    db_url = db_url.replace("?ssl-mode=REQUIRED", "")

# If the CA_CERT is provided (which it is on Render), configure the SSL context
ssl_args = {}
ca_cert = os.getenv("CA_CERT")
if ca_cert:
    ssl_args = {
        "ssl": {
            "ca": ca_cert,
            "check_hostname": False  # Allows connection to Aiven without strict hostname verification
        }
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