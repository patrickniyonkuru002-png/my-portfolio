export default function Experience({ education }) {
  // Format date (e.g., "2023-01-01" -> "2023")
  const formatYear = (dateStr) => dateStr ? dateStr.split("-")[0] : "";

  return (
    <section id="education" className="py-24 px-6 bg-card/30 min-h-[50vh]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold whitespace-nowrap">My <span className="gradient-text">Education</span></h2>
          <div className="h-px bg-slate-800 w-full"></div>
        </div>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-secondary before:via-slate-800 before:to-transparent">
          {education.map((ed) => (
            <div key={ed.id} className="relative flex items-start gap-6">
              <div className="w-10 h-10 rounded-full bg-card border-2 border-secondary flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
              </div>
              <div className="glass p-6 rounded-2xl w-full">
                <h3 className="text-xl font-bold text-white">{ed.degree} {ed.field && `in ${ed.field}`}</h3>
                <div className="text-secondary font-medium mb-3">{ed.school}</div>
                <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs mono text-slate-400">
                  {formatYear(ed.start_date)} — {formatYear(ed.end_date)}
                </div>
              </div>
            </div>
          ))}
          {education.length === 0 && <p className="text-slate-500 pl-16">No education added yet.</p>}
        </div>
      </div>
    </section>
  );
}