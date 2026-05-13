import Logo from "../_components/Logo";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-slate-950" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.18),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.14),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.08]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-emerald-500/5 p-8">
          <div className="flex items-center gap-2.5 mb-7">
            <Logo size={36} />
            <div className="text-lg font-semibold tracking-tight text-slate-100">ASO Studio</div>
          </div>

          <h1 className="text-xl font-semibold text-slate-100 mb-1">Welcome back</h1>
          <p className="text-sm text-slate-400 mb-6">Sign in to ASO Studio</p>

          <form className="space-y-3">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-500 font-medium mb-1.5">Email</label>
              <input
                type="email"
                defaultValue="long.phan@apero.vn"
                className="w-full h-10 px-3 rounded-md bg-slate-950/60 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/15"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] uppercase tracking-wider text-slate-500 font-medium">Password</label>
                <a className="text-[11px] text-emerald-300 hover:text-emerald-200">Forgot?</a>
              </div>
              <input
                type="password"
                defaultValue="••••••••••••"
                className="w-full h-10 px-3 rounded-md bg-slate-950/60 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/15"
              />
            </div>

            <label className="flex items-center gap-2 pt-1 cursor-pointer text-xs text-slate-400">
              <input type="checkbox" defaultChecked className="w-3.5 h-3.5 accent-emerald-500 bg-slate-900 border-slate-700 rounded" />
              Remember me for 30 days
            </label>

            <button
              type="button"
              className="mt-2 w-full h-10 font-medium text-sm text-slate-950 bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 rounded-md transition-all shadow-lg shadow-emerald-500/20"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500">
              Don't have an account? <span className="text-slate-300">Ask your Admin to invite you.</span>
            </p>
          </div>
        </div>

        <p className="mt-5 text-center text-[11px] text-slate-600">
          ASO Studio · Internal tool
        </p>
      </div>
    </div>
  );
}
