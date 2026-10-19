export default function Skills({ skills }) {
  const grouped = skills.reduce((acc, s) => {
    const key = s.category || "Other";
    (acc[key] ||= []).push(s);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold whitespace-nowrap text-[var(--text-primary)]">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="h-px bg-[var(--border-color)] w-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-3">
                <span className="w-8 h-1 bg-[var(--accent-color)] rounded-full"></span>
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((s) => (
                  <span key={s.id} className="px-4 py-2 glass rounded-lg text-sm font-semibold text-[var(--text-secondary)] transition-all cursor-default hover:text-[var(--accent-color)]">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}