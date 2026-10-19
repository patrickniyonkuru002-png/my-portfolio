import { useEffect, useState } from "react";
import { login, getProjects, getSkills, getExperience } from "../services/api";
import api from "../services/api";

export default function Admin() {
  const [logged, setLogged] = useState(!!localStorage.getItem("token"));
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    if (logged) loadAll();
  }, [logged]);

  const loadAll = async () => {
    try {
      const [p, s, e] = await Promise.all([getProjects(), getSkills(), getExperience()]);
      setProjects(p.data);
      setSkills(s.data);
      setExperience(e.data);
    } catch (e) {
      console.error(e);
    }
  };

  const doLogin = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await login(creds);
      localStorage.setItem("token", res.data.access_token);
      setLogged(true);
    } catch {
      setErr("Invalid username or password");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLogged(false);
  };

  if (!logged) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <form onSubmit={doLogin} className="bg-slate-900 p-8 rounded-xl w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
          <input
            placeholder="Username"
            value={creds.username}
            onChange={(e) => setCreds({ ...creds, username: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded p-3 outline-none focus:border-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={creds.password}
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded p-3 outline-none focus:border-primary"
          />
          {err && <p className="text-red-400 text-sm">{err}</p>}
          <button className="w-full bg-primary py-3 rounded font-semibold hover:bg-indigo-500">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <div className="flex gap-3">
          <a href="/" className="text-sm text-slate-400 hover:text-primary">← View Site</a>
          <button onClick={logout} className="text-sm text-red-400 hover:text-red-300">Logout</button>
        </div>
      </div>

      <Section title="Projects" count={projects.length} />
      <Section title="Skills" count={skills.length} />
      <Section title="Experience" count={experience.length} />

      <p className="text-slate-500 text-sm mt-8">
        💡 Tip: use Swagger UI at <a className="text-primary" href="http://127.0.0.1:8000/docs" target="_blank">http://127.0.0.1:8000/docs</a> to add/edit items for now. A full CRUD UI is the next step.
      </p>
    </div>
  );
}

function Section({ title, count }) {
  return (
    <div className="bg-slate-900 p-5 rounded-lg mb-4 flex justify-between items-center">
      <span className="font-semibold">{title}</span>
      <span className="text-slate-400 text-sm">{count} item(s)</span>
    </div>
  );
}