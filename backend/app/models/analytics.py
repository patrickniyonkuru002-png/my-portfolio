from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from app.database import get_db
from app.models.visit import PageVisit

router = APIRouter(prefix="/api/analytics", tags=["analytics"])

@router.post("/track")
def track_visit(db: Session = Depends(get_db)):
    """Called every time someone loads the homepage"""
    visit = PageVisit()
    db.add(visit)
    db.commit()
    return {"status": "tracked"}

@router.get("/visits")
def get_visits(db: Session = Depends(get_db)):
    """Returns the last 7 days of visit counts for the chart"""
    today = datetime.utcnow().date()
    seven_days_ago = today - timedelta(days=6)
    
    # Query database for visits grouped by day
    results = db.query(
        func.date(PageVisit.visited_at).label('date'),
        func.count(PageVisit.id).label('count')
    ).filter(
        PageVisit.visited_at >= seven_days_ago
    ).group_by(
        func.date(PageVisit.visited_at)
    ).all()

    # Create a dictionary of existing data
    data_map = {str(row.date): row.count for row in results}
    
    # Fill in missing days with 0
    chart_data = []
    for i in range(7):
        day = seven_days_ago + timedelta(days=i)
        day_str = str(day)
        chart_data.append({
            "date": day_str,
            "day_name": day.strftime("%a"), # e.g., "Mon", "Tue"
            "count": data_map.get(day_str, 0)
        })
        
    return chart_data