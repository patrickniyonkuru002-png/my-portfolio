from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectOut
from app.services.auth import get_current_user

router = APIRouter(prefix="/api/projects", tags=["projects"])

@router.get("", response_model=List[ProjectOut])
def list_projects(db: Session = Depends(get_db)):
    return db.query(Project).order_by(Project.sort_order).all()

@router.get("/{project_id}", response_model=ProjectOut)
def get_project(project_id: int, db: Session = Depends(get_db)):
    obj = db.query(Project).get(project_id)
    if not obj:
        raise HTTPException(404, "Project not found")
    return obj

@router.post("", response_model=ProjectOut, dependencies=[Depends(get_current_user)])
def create_project(payload: ProjectCreate, db: Session = Depends(get_db)):
    obj = Project(**payload.model_dump())
    db.add(obj); db.commit(); db.refresh(obj)
    return obj

@router.put("/{project_id}", response_model=ProjectOut, dependencies=[Depends(get_current_user)])
def update_project(project_id: int, payload: ProjectUpdate, db: Session = Depends(get_db)):
    obj = db.query(Project).get(project_id)
    if not obj:
        raise HTTPException(404, "Project not found")
    for k, v in payload.model_dump().items():
        setattr(obj, k, v)
    db.commit(); db.refresh(obj)
    return obj

@router.delete("/{project_id}", dependencies=[Depends(get_current_user)])
def delete_project(project_id: int, db: Session = Depends(get_db)):
    obj = db.query(Project).get(project_id)
    if not obj:
        raise HTTPException(404, "Project not found")
    db.delete(obj); db.commit()
    return {"ok": True}