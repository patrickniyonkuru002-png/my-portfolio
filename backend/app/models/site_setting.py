from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class SiteSetting(Base):
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column("key", String(80), unique=True, nullable=False)
    value = Column("value", Text)