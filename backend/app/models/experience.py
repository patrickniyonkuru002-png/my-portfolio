from sqlalchemy import Column, Integer, String, Text, Date, Boolean
from app.database import Base

class Experience(Base):
    __tablename__ = "experience"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String(150), nullable=False)
    role = Column(String(150), nullable=False)
    description = Column(Text)
    start_date = Column(Date)
    end_date = Column(Date, nullable=True)
    is_current = Column(Boolean, default=False)
    sort_order = Column(Integer, default=0)