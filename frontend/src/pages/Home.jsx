import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import VisitChart from "../components/VisitChart";
import Loader from "../components/Loader";
import { getProjects, getSkills, getSettings, trackVisit } from "../services/api";

const defaultSettings = {
  hero_name: "NIYONKURU Patrick",
  hero_title: "Embedded System Designer & Full-Stack Developer",
  hero_tagline: "I am a passionate, creative, and technology-driven individual who enjoys solving problems, learning new skills, and developing innovative solutions.",
  about_text: "I am a passionate and motivated technology enthusiast with a strong interest in software development, computer systems, and innovative technology solutions. I enjoy learning new skills, exploring modern technologies, and turning ideas into practical projects that solve real-world problems.\n\nMy interests include web and mobile application development, artificial intelligence, Internet of Things (IoT), embedded systems, and database management. Through my projects, I aim to build useful, reliable, and user-friendly solutions that improve people's lives.\n\nI am looking for opportunities to gain practical experience, collaborate with other passionate people, and grow as a professional in the IT field.",
  email: "patrickniyonkuru002@gmail.com",
  github_url: "https://github.com/patrickniyonkuru002-png",
  instagram_url: "https://www.instagram.com/n.p___002/?hl=en",
  x_url: "https://x.com/home"
};

const defaultSkills = [
  { id: 1, name: "React.js", category: "Frontend", proficiency: 65 },
  { id: 2, name: "JavaScript", category: "Frontend", proficiency: 65 },
  { id: 3, name: "HTML5", category: "Frontend", proficiency: 80 },
  { id: 4, name: "CSS3", category: "Frontend", proficiency: 75 },
  { id: 5, name: "Vite", category: "Frontend", proficiency: 65 },
  { id: 6, name: "Python", category: "Backend", proficiency: 65 },
  { id: 7, name: "FastAPI", category: "Backend", proficiency: 60 },
  { id: 8, name: "REST APIs", category: "Backend", proficiency: 60 },
  { id: 9, name: "WebSockets", category: "Backend", proficiency: 45 },
  { id: 10, name: "MySQL", category: "Database", proficiency: 60 },
  { id: 11, name: "SQL", category: "Database", proficiency: 55 },
  { id: 12, name: "AI Integration", category: "AI & ML", proficiency: 50 },
  { id: 13, name: "Sign Language Recognition", category: "AI & ML", proficiency: 45 },
  { id: 14, name: "Arduino / C++", category: "Embedded & IoT", proficiency: 55 },
  { id: 15, name: "ESP32 / IoT", category: "Embedded & IoT", proficiency: 55 },
  { id: 16, name: "Sensor Integration", category: "Embedded & IoT", proficiency: 50 },
  { id: 17, name: "Git & GitHub", category: "Tools", proficiency: 55 },
  { id: 18, name: "npm", category: "Tools", proficiency: 65 },
  { id: 19, name: "VS Code", category: "Tools", proficiency: 75 },
  { id: 20, name: "Debugging", category: "Tools", proficiency: 65 },
  { id: 21, name: "Problem-Solving", category: "Professional", proficiency: 80 },
  { id: 22, name: "Continuous Learning", category: "Professional", proficiency: 90 },
  { id: 23, name: "Creative Thinking", category: "Professional", proficiency: 80 },
  { id: 24, name: "Project Planning", category: "Professional", proficiency: 70 },
  { id: 25, name: "Technical Research", category: "Professional", proficiency: 70 }
];

const defaultProjects = [
  {
    id: 999,
    title: "Green Africa Institute",
    description: "A community-led platform transforming climate challenges into practical solutions. Features ecosystem restoration, climate resilience, environmental education, and indigenous knowledge integration across Africa.",
    github_url: "https://github.com/patrickniyonkuru002-png/agriculture.git",
    live_url: "https://agriculture-livid-eight.vercel.app/",
    image_url: "/gai-logo.jpg",
    featured: false
  }
];

export default function Home() {
  const [settings, setSettings] = useState(defaultSettings);
  const [projects, setProjects] = useState(defaultProjects);
  const [skills, setSkills] = useState(defaultSkills);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackVisit().catch(console.error);

    Promise.all([getSettings(), getProjects(), getSkills()])
      .then(([s, p, sk]) => {
        const map = { ...defaultSettings };
        if (s.data && s.data.length > 0) {
          s.data.forEach((row) => (map[row.key] = row.value));
        }
        setSettings(map);
        
        // ONLY override if the backend actually has projects in the cloud DB
        if (p.data && p.data.length > 0) {
          setProjects(p.data);
        }
        
        // ONLY override if the backend actually has skills in the cloud DB
        if (sk.data && sk.data.length > 0) {
          setSkills(sk.data);
        }
      })
      .catch((err) => console.error("Load error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen text-[var(--text-primary)] transition-colors duration-300">
      <Navbar />
      <Hero settings={settings} />
      <About settings={settings} />
      <Skills skills={skills} />
      
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold whitespace-nowrap text-[var(--text-primary)]">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="h-px bg-[var(--border-color)] w-full"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <Projects projects={projects} />
            </div>
            <div className="lg:col-span-7 sticky top-24">
              <VisitChart />
            </div>
          </div>
        </div>
      </section>

      <Contact settings={settings} />
      <Footer settings={settings} />
    </div>
  );
}