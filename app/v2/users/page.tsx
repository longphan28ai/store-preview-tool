const USERS = [
  { name: "Phan Long", email: "long.phan@apero.vn", role: "Admin", initials: "LP", color: "from-emerald-400 to-teal-500", lastActive: "Active now", status: "online" },
  { name: "Nguyen Minh", email: "minh.nguyen@apero.vn", role: "Editor", initials: "NM", color: "from-blue-500 to-indigo-500", lastActive: "2h ago", status: "offline" },
  { name: "Tran Hoa", email: "hoa.tran@apero.vn", role: "Editor", initials: "TH", color: "from-violet-500 to-fuchsia-500", lastActive: "1d ago", status: "offline" },
  { name: "Le Duc", email: "duc.le@apero.vn", role: "Viewer", initials: "LD", color: "from-amber-400 to-orange-500", lastActive: "3d ago", status: "offline" },
  { name: "Pham Thu", email: "thu.pham@apero.vn", role: "Viewer", initials: "PT", color: "from-pink-500 to-rose-500", lastActive: "1w ago", status: "offline" },
  { name: "Vo Lan", email: "lan.vo@apero.vn", role: "Viewer", initials: "VL", color: "from-cyan-400 to-blue-500", lastActive: "Never", status: "pending" },
];

const ROLE_TONE: Record<string, string> = {
  Admin: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
  Editor: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/20",
  Viewer: "bg-slate-700/40 text-slate-300 ring-slate-700",
};

export default function UsersPage() {
  return (
    <div className="px-6 py-6 max-w-[1600px] mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-100">Users & Roles</h1>
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 ring-1 ring-inset ring-amber-400/20">
              Admin only
            </span>
          </div>
          <p className="text-sm text-slate-400">Create accounts, assign roles, manage access · {USERS.length} members</p>
        </div>
        <button className="h-9 px-3 text-sm font-medium text-slate-950 bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 rounded-md flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/></svg>
          New User
        </button>
      </div>

      {/* Role legend */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <RoleCard role="Admin" count={1} description="Full access. Manage users, apps, categories." color="amber" />
        <RoleCard role="Editor" count={2} description="Add/edit apps & categories. Cannot manage users." color="emerald" />
        <RoleCard role="Viewer" count={3} description="Read-only. Preview store listings only." color="slate" />
      </div>

      {/* Users table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
        <div className="grid grid-cols-[1fr_180px_140px_140px_60px] px-4 py-3 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-500 font-medium bg-slate-950/40">
          <div>User</div>
          <div>Role</div>
          <div>Last active</div>
          <div>Status</div>
          <div></div>
        </div>
        {USERS.map((u) => (
          <div key={u.email} className="grid grid-cols-[1fr_180px_140px_140px_60px] px-4 py-3 border-b border-slate-800/60 last:border-0 items-center hover:bg-slate-900/60">
            <div className="flex items-center gap-3">
              <div className={`relative w-9 h-9 rounded-full bg-gradient-to-br ${u.color} flex items-center justify-center text-xs font-semibold text-slate-950`}>
                {u.initials}
                {u.status === "online" && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-slate-900" />}
              </div>
              <div>
                <div className="text-sm font-medium text-slate-100">{u.name}</div>
                <div className="text-xs text-slate-500">{u.email}</div>
              </div>
            </div>
            <div>
              <span className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded ring-1 ring-inset ${ROLE_TONE[u.role]}`}>
                {u.role}
              </span>
            </div>
            <div className="text-xs text-slate-400">{u.lastActive}</div>
            <div>
              {u.status === "online" && <span className="text-xs text-emerald-300">● Online</span>}
              {u.status === "offline" && <span className="text-xs text-slate-500">○ Offline</span>}
              {u.status === "pending" && <span className="text-xs text-amber-300">◐ Pending</span>}
            </div>
            <div className="flex justify-end">
              <button className="h-7 w-7 grid place-items-center text-slate-500 hover:text-slate-100 hover:bg-slate-800 rounded">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Authentication via email + password. Passwords are hashed with bcrypt and stored in Vercel Postgres.
      </p>
    </div>
  );
}

function RoleCard({
  role,
  count,
  description,
  color,
}: {
  role: string;
  count: number;
  description: string;
  color: "amber" | "emerald" | "slate";
}) {
  const tones = {
    amber: { ring: "ring-amber-400/20", text: "text-amber-300", bg: "from-amber-400/10" },
    emerald: { ring: "ring-emerald-500/20", text: "text-emerald-300", bg: "from-emerald-500/10" },
    slate: { ring: "ring-slate-700", text: "text-slate-300", bg: "from-slate-800/30" },
  }[color];
  return (
    <div className={`rounded-xl bg-gradient-to-br ${tones.bg} to-transparent ring-1 ring-inset ${tones.ring} bg-slate-900/40 p-4`}>
      <div className="flex items-baseline justify-between">
        <span className={`text-xs font-semibold uppercase tracking-wider ${tones.text}`}>{role}</span>
        <span className="text-xl font-semibold tabular-nums text-slate-100">{count}</span>
      </div>
      <p className="mt-1 text-xs text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
