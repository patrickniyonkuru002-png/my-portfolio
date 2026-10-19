from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.experience import Experience
from app.schemas.experience import ExperienceCreate, ExperienceUpdate, ExperienceOut
from app.services.auth import get_current_user

router = APIRouter(prefix="/api/experience", tags=["experience"])

@router.get("", response_model=List[ExperienceOut])
def list_experience(db: Session = Depends(get_db)):
    return db.query(Experience).order_by(Experience.sort_order).all()

@router.post("", response_model=ExperienceOut, dependencies=[Depends(get_current_user)])
def create_exp(payload: ExperienceCreate, db: Session = Depends(get_db)):
    obj = Experience(**payload.model_dump())
    db.add(obj); db.commit(); db.refresh(obj)
    return obj

@router.put("/{exp_id}", response_model=ExperienceOut, dependencies=[Depends(get_current_user)])
def update_exp(exp_id: int, payload: ExperienceUpdate, db: Session = Depends(get_db)):
    obj = db.query(Experience).get(exp_id)
    if not obj:
        raise HTTPException(404, "Experience not found")
    for k, v in payload.model_dump().items():
        setattr(obj, k, v)
    db.commit(); db.refresh(obj)
    return obj

@router.delete("/{exp_id}", dependencies=[Depends(get_current_user)])
def delete_exp(exp_id: int, db: Session = Depends(get_db)):
    obj = db.query(Experience).get(exp_id)
    if not obj:
        raise HTTPException(404, "Experience not found")
    db.delete(obj); db.commit()
    return {"ok": True}