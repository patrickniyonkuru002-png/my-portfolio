from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    tech_stack: Optional[str] = None
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    featured: bool = False
    sort_order: int = 0

class ProjectCreate(ProjectBase): pass
class ProjectUpdate(ProjectBase): pass

class ProjectOut(ProjectBase):
    id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True