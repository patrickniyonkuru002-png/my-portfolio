export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-primary)] transition-colors duration-300">
      {/* Animated Spinner Container */}
      <div className="relative flex items-center justify-center w-24 h-24 mb-6">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--accent-color)] border-r-[var(--accent-color)] animate-spin opacity-80"></div>
        
        {/* Inner Ring (Spins backwards) */}
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-[var(--secondary-color)] border-l-[var(--secondary-color)] animate-[spin_1.5s_linear_infinite_reverse] opacity-80"></div>
        
        {/* Center Glowing Dot */}
        <div className="w-4 h-4 bg-[var(--accent-color)] rounded-full animate-pulse shadow-[0_0_20px_var(--accent-color)]"></div>
      </div>

      {/* Text */}
      <h2 className="text-2xl font-black gradient-text tracking-widest uppercase animate-pulse">
        Patrick
      </h2>
      <p className="text-sm font-medium text-[var(--text-muted)] mt-2 tracking-widest uppercase mono">
        Loading Portfolio
      </p>
    </div>
  );
}