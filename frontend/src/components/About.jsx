export default function About({ settings }) {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold whitespace-nowrap text-[var(--text-primary)]">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="h-px bg-[var(--border-color)] w-full"></div>
        </div>

        <div className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden group">
          <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg whitespace-pre-line relative z-10 font-medium">
            {settings.about_text}
          </p>
        </div>
      </div>
    </section>
  );
}