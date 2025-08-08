export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Pinkish glow overlays to echo landing page styling */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-28 h-80 w-80 rounded-full bg-rose-700/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,63,94,0.06)_0%,transparent_60%)]" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-12 sm:py-16">
        {children}
      </div>
    </div>
  );
}
