from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base, SessionLocal
from app import models
from app.routes import auth, projects, skills, experience, education, contact, settings
from app.routes.analytics import router as analytics_router # Direct import

from app.models.site_setting import SiteSetting
from app.models.skill import Skill
from app.models.education import Education

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(skills.router)
app.include_router(experience.router)
app.include_router(education.router)
app.include_router(contact.router)
app.include_router(settings.router)
app.include_router(analytics_router) # Use the direct import here

@app.on_event("startup")
def seed_data():
    db = SessionLocal()
    if db.query(SiteSetting).count() == 0:
        settings_data = [
            ("hero_name", "NIYONKURU Patrick"),
            ("hero_title", "Embedded System Designer & Full-Stack Developer"),
            ("hero_tagline", "I am a passionate, creative, and technology-driven individual who enjoys solving problems, learning new skills, and developing innovative solutions."),
            ("about_text", "I am a passionate and motivated technology enthusiast with a strong interest in software development, computer systems, and innovative technology solutions. I enjoy learning new skills, exploring modern technologies, and turning ideas into practical projects that solve real-world problems.\n\nMy interests include web and mobile application development, artificial intelligence, Internet of Things (IoT), embedded systems, and database management. Through my projects, I aim to build useful, reliable, and user-friendly solutions that improve people's lives.\n\nI am looking for opportunities to gain practical experience, collaborate with other passionate people, and grow as a professional in the IT field."),
            ("email", "patrickniyonkuru002@gmail.com"),
            ("github_url", "https://github.com/patrickniyonkuru002-png"),
            ("instagram_url", "https://www.instagram.com/n.p___002/?hl=en"),
            ("x_url", "https://x.com/home")
        ]
        for k, v in settings_data:
            db.add(SiteSetting(key=k, value=v))
            
    if db.query(Skill).count() == 0:
        skills_data = [
            ("React.js", "Frontend", 65, 1), ("JavaScript", "Frontend", 65, 2), ("HTML5", "Frontend", 80, 3), 
            ("CSS3", "Frontend", 75, 4), ("Vite", "Frontend", 65, 5), ("Python", "Backend", 65, 6), 
            ("FastAPI", "Backend", 60, 7), ("REST APIs", "Backend", 60, 8), ("WebSockets", "Backend", 45, 9),
            ("MySQL", "Database", 60, 10), ("SQL", "Database", 55, 11),
            ("AI Integration", "AI & ML", 50, 12), ("Sign Language Recognition", "AI & ML", 45, 13),
            ("Arduino / C++", "Embedded & IoT", 55, 14), ("ESP32 / IoT", "Embedded & IoT", 55, 15), ("Sensor Integration", "Embedded & IoT", 50, 16),
            ("Git & GitHub", "Tools", 55, 17), ("npm", "Tools", 65, 18), ("VS Code", "Tools", 75, 19), ("Debugging", "Tools", 65, 20),
            ("Problem-Solving", "Professional", 80, 21), ("Continuous Learning", "Professional", 90, 22), ("Creative Thinking", "Professional", 80, 23), ("Project Planning", "Professional", 70, 24), ("Technical Research", "Professional", 70, 25)
        ]
        for name, cat, prof, order in skills_data:
            db.add(Skill(name=name, category=cat, proficiency=prof, sort_order=order))

    if db.query(Education).count() == 0:
        db.add(Education(school="Your University", degree="BSc", field="Computer Science", start_date="2023-01-01", end_date="2027-01-01"))

    db.commit()
    db.close()

@app.get("/")
def root():
    return {"message": "Portfolio API is running 🚀", "docs": "/docs"}