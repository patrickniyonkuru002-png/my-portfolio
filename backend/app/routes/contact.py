from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.contact import ContactMessage
from app.schemas.contact import ContactCreate, ContactOut
from app.services.auth import get_current_user

router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.post("", response_model=ContactOut)
def send_message(payload: ContactCreate, db: Session = Depends(get_db)):
    # Save to database only (Email sending disabled for now)
    obj = ContactMessage(**payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.get("", response_model=List[ContactOut], dependencies=[Depends(get_current_user)])
def list_messages(db: Session = Depends(get_db)):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()