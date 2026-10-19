from sqlalchemy import Column, Integer, String
from app.database import Base

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(80), nullable=False)
    category = Column(String(80))
    proficiency = Column(Integer, default=0)
    icon = Column(String(100))
    sort_order = Column(Integer, default=0)