from pydantic import BaseModel
from datetime import date
from typing import Optional

class EducationBase(BaseModel):
    school: str
    degree: Optional[str] = None
    field: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None

class EducationCreate(EducationBase): pass
class EducationUpdate(EducationBase): pass

class EducationOut(EducationBase):
    id: int
    class Config:
        from_attributes = True