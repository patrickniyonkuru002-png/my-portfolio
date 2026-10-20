import axios from "axios";

const api = axios.create({
  baseURL: "https://patrick-portfolio-api.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// GET
export const getProjects   = () => api.get("/api/projects");
export const getSkills     = () => api.get("/api/skills");
export const getExperience = () => api.get("/api/experience");
export const getEducation  = () => api.get("/api/education");
export const getSettings   = () => api.get("/api/settings");

// POST
export const sendContact = (data) => api.post("/api/contact", data);

// AUTH
export const login = (data) => api.post("/api/auth/login", data);

// ANALYTICS (NEW)
export const trackVisit = () => api.post("/api/analytics/track");
export const getVisits = () => api.get("/api/analytics/visits");

export default api;