from pydantic import BaseModel
from datetime import date
from typing import Optional

class ExperienceBase(BaseModel):
    company: str
    role: str
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    is_current: bool = False
    sort_order: int = 0

class ExperienceCreate(ExperienceBase): pass
class ExperienceUpdate(ExperienceBase): pass

class ExperienceOut(ExperienceBase):
    id: int
    class Config:
        from_attributes = True