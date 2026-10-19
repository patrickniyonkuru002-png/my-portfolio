from sqlalchemy import Column, Integer, String, Text, Date
from app.database import Base

class Education(Base):
    __tablename__ = "education"

    id = Column(Integer, primary_key=True, index=True)
    school = Column(String(150), nullable=False)
    degree = Column(String(150))
    field = Column(String(150))
    description = Column(Text)
    start_date = Column(Date)
    end_date = Column(Date, nullable=True)