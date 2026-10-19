import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import VisitChart from "../components/VisitChart";
import Loader from "../components/Loader"; // Import the new loader
import { getProjects, getSkills, getSettings, trackVisit } from "../services/api";

// (Keep your defaultSettings, defaultSkills, and defaultProjects exactly as they are)
const defaultSettings = { /* ... */ };
const defaultSkills = [ /* ... */ ];
const defaultProjects = [ /* ... */ ];

export default function Home() {
  const [settings, setSettings] = useState(defaultSettings);
  const [projects, setProjects] = useState(defaultProjects);
  const [skills, setSkills] = useState(defaultSkills);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Track the visit exactly once when the component mounts
    trackVisit().catch((err) => console.error("Tracking failed:", err));

    // 2. Fetch the data
    Promise.all([getSettings(), getProjects(), getSkills()])
      .then(([s, p, sk]) => {
        const map = { ...defaultSettings };
        if (s.data.length > 0) s.data.forEach((row) => (map[row.key] = row.value));
        setSettings(map);
        
        if (p.data && p.data.length > 0) setProjects(p.data);
        if (sk.data && sk.data.length > 0) setSkills(sk.data);
      })
      .catch((err) => console.error("Load error:", err))
      .finally(() => {
        // Add a tiny delay so the user actually sees the beautiful loader
        setTimeout(() => setLoading(false), 800); 
      });
  }, []); // The empty array [] ensures this only runs ONCE per page load

  // Show the new premium loader while waiting
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