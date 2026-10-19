export default function Hero({ settings }) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-24 pb-12">
      <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-[var(--accent-color)] opacity-10 rounded-full blur-[100px] animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-[#a855f7] opacity-10 rounded-full blur-[100px] animate-float" style={{ animationDelay: "3s" }}></div>

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        <div className="flex justify-center order-1 md:order-1">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full border-2 border-[var(--accent-color)] border-dashed opacity-30 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-[var(--bg-surface)] shadow-2xl bg-[var(--bg-surface-hover)] flex items-center justify-center group cursor-pointer hover:scale-105 transition-transform duration-300">
               <img src="/profile.jpg" alt="Patrick" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
        </div>

        <div className="text-center md:text-left order-2 md:order-2">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[var(--accent-color)] bg-[var(--bg-surface)] text-[var(--accent-color)] mono text-xs md:text-sm animate-fade-in font-semibold shadow-sm">
            Available for work
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight text-[var(--text-primary)] leading-tight">
            Hi, I'm <br className="block md:hidden" />
            <span className="gradient-text whitespace-nowrap">{settings.hero_name}</span>
          </h1>
          
          <h2 className="text-lg md:text-2xl text-[var(--text-secondary)] font-bold mb-6">
            {settings.hero_title}
          </h2>
          
          <p className="text-sm md:text-lg text-[var(--text-muted)] mb-8 leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">
            {settings.hero_tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <a href="#projects" className="w-full sm:w-auto px-8 py-3.5 bg-[var(--accent-color)] rounded-xl font-bold text-[var(--accent-text)] hover:bg-[var(--accent-hover)] transition-all shadow-lg hover:scale-105">
              View My Work
            </a>
            <a href="#contact" className="w-full sm:w-auto px-8 py-3.5 glass rounded-xl font-bold text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-all">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}