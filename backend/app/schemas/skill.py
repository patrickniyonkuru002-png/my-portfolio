from pydantic import BaseModel
from typing import Optional

class SkillBase(BaseModel):
    name: str
    category: Optional[str] = None
    proficiency: int = 0
    icon: Optional[str] = None
    sort_order: int = 0

class SkillCreate(SkillBase): pass
class SkillUpdate(SkillBase): pass

class SkillOut(SkillBase):
    id: int
    class Config:
        from_attributes = True