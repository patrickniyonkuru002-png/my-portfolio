from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.site_setting import SiteSetting
from app.schemas.site_setting import SettingUpdate, SettingOut
from app.services.auth import get_current_user

router = APIRouter(prefix="/api/settings", tags=["settings"])

@router.get("", response_model=List[SettingOut])
def list_settings(db: Session = Depends(get_db)):
    return db.query(SiteSetting).all()

@router.put("/{key}", response_model=SettingOut, dependencies=[Depends(get_current_user)])
def update_setting(key: str, payload: SettingUpdate, db: Session = Depends(get_db)):
    obj = db.query(SiteSetting).filter(SiteSetting.key == key).first()
    if not obj:
        obj = SiteSetting(key=key, value=payload.value)
        db.add(obj)
    else:
        obj.value = payload.value
    db.commit(); db.refresh(obj)
    return obj