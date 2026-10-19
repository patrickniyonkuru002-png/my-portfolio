import { useEffect, useState } from "react";
import { getVisits } from "../services/api";

export default function VisitChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVisits()
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="glass p-8 rounded-2xl w-full flex flex-col items-center justify-center h-80 shadow-xl">
        <svg className="animate-spin h-10 w-10 text-[var(--accent-color)] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-[var(--text-muted)] font-medium animate-pulse">Loading Live Analytics...</span>
      </div>
    );
  }

  const chartData = data.length > 0 ? data : Array(7).fill({ count: 0, day_name: "-" });
  const maxCount = Math.max(...chartData.map((d) => d.count), 5); 
  const height = 300; 
  const width = 600;
  const padding = 40;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const points = chartData.map((d, i) => {
    const x = padding + (i / (chartData.length - 1)) * graphWidth;
    const y = height - padding - (d.count / maxCount) * graphHeight;
    return { x, y, ...d };
  });

  let linePath = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const midX = (p1.x + p2.x) / 2;
    linePath += ` C ${midX} ${p1.y}, ${midX} ${p2.y}, ${p2.x} ${p2.y}`;
  }
  
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <div className="glass p-8 rounded-2xl w-full animate-fade-in shadow-xl relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--accent-color)] opacity-10 rounded-full blur-[80px]"></div>

      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Platform Visits</h3>
          <p className="text-sm text-[var(--text-muted)] font-medium">Traffic overview</p>
        </div>
        <span className="text-sm font-bold text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-4 py-2 rounded-full border border-[var(--accent-color)]/20">
          Last 7 Days
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible relative z-10">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + ratio * graphHeight}
            x2={width - padding}
            y2={padding + ratio * graphHeight}
            stroke="var(--border-color)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        <path d={areaPath} fill="url(#chartGradient)" />
        <path d={linePath} fill="none" stroke="var(--accent-color)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

        {points.map((p, i) => (
          <g key={i} className="group">
            <circle cx={p.x} cy={p.y} r="10" fill="var(--accent-color)" className="opacity-0 group-hover:opacity-20 transition-opacity" />
            <circle cx={p.x} cy={p.y} r="6" fill="var(--bg-surface)" stroke="var(--accent-color)" strokeWidth="3" />
            <title>{p.count} visits on {p.date}</title>
            <text x={p.x} y={height - 10} textAnchor="middle" fontSize="13" fill="var(--text-muted)" className="font-bold">
              {p.day_name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}