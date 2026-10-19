export default function Projects({ projects }) {
  return (
    <div className="grid gap-8">
      {projects.map((p) => (
        <div key={p.id} className="glass rounded-2xl overflow-hidden group flex flex-col">
          
          <div className="h-56 bg-white dark:bg-[var(--bg-surface-hover)] relative overflow-hidden flex items-center justify-center p-6 border-b border-[var(--border-color)]">
            {p.image_url ? (
              <img src={p.image_url} alt={p.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full flex items-center justify-center opacity-50">
                <span className="text-[var(--text-muted)] font-mono">No Image</span>
              </div>
            )}
          </div>

          <div className="p-8 flex flex-col flex-grow">
            <a 
              href={p.live_url || "#"} 
              target={p.live_url ? "_blank" : "_self"} 
              rel="noreferrer"
              className="block group-hover:text-[var(--accent-color)] transition-colors w-fit"
            >
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3 inline-flex items-center gap-2">
                {p.title}
                {p.live_url && (
                  <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                )}
              </h3>
            </a>
            
            <p className="text-[var(--text-muted)] mb-8 font-medium leading-relaxed">{p.description}</p>

            <div className="flex items-center gap-6 pt-6 border-t border-[var(--border-color)] mt-auto">
              {p.github_url && (
                <a href={p.github_url} target="_blank" rel="noreferrer" className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  Code
                </a>
              )}
              {p.live_url && (
                <a href={p.live_url} target="_blank" rel="noreferrer" className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}