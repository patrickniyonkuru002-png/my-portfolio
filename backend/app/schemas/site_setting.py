from pydantic import BaseModel
from typing import Optional

class SettingUpdate(BaseModel):
    value: Optional[str] = None

class SettingOut(BaseModel):
    id: int
    key: str
    value: Optional[str] = None
    class Config:
        from_attributes = True