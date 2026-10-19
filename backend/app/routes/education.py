from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.education import Education
from app.schemas.education import EducationCreate, EducationUpdate, EducationOut
from app.services.auth import get_current_user

router = APIRouter(prefix="/api/education", tags=["education"])

@router.get("", response_model=List[EducationOut])
def list_education(db: Session = Depends(get_db)):
    return db.query(Education).all()

@router.post("", response_model=EducationOut, dependencies=[Depends(get_current_user)])
def create_edu(payload: EducationCreate, db: Session = Depends(get_db)):
    obj = Education(**payload.model_dump())
    db.add(obj); db.commit(); db.refresh(obj)
    return obj

@router.delete("/{edu_id}", dependencies=[Depends(get_current_user)])
def delete_edu(edu_id: int, db: Session = Depends(get_db)):
    obj = db.query(Education).get(edu_id)
    if not obj:
        raise HTTPException(404, "Education not found")
    db.delete(obj); db.commit()
    return {"ok": True}