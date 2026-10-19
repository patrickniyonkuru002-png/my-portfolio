from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.skill import Skill
from app.schemas.skill import SkillCreate, SkillUpdate, SkillOut
from app.services.auth import get_current_user

router = APIRouter(prefix="/api/skills", tags=["skills"])

@router.get("", response_model=List[SkillOut])
def list_skills(db: Session = Depends(get_db)):
    return db.query(Skill).order_by(Skill.sort_order).all()

@router.post("", response_model=SkillOut, dependencies=[Depends(get_current_user)])
def create_skill(payload: SkillCreate, db: Session = Depends(get_db)):
    obj = Skill(**payload.model_dump())
    db.add(obj); db.commit(); db.refresh(obj)
    return obj

@router.put("/{skill_id}", response_model=SkillOut, dependencies=[Depends(get_current_user)])
def update_skill(skill_id: int, payload: SkillUpdate, db: Session = Depends(get_db)):
    obj = db.query(Skill).get(skill_id)
    if not obj:
        raise HTTPException(404, "Skill not found")
    for k, v in payload.model_dump().items():
        setattr(obj, k, v)
    db.commit(); db.refresh(obj)
    return obj

@router.delete("/{skill_id}", dependencies=[Depends(get_current_user)])
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    obj = db.query(Skill).get(skill_id)
    if not obj:
        raise HTTPException(404, "Skill not found")
    db.delete(obj); db.commit()
    return {"ok": True}