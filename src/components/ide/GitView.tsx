import { motion } from "motion/react";
import { GitCommit, GitBranch } from "lucide-react";

const commits = [
  { hash: "a7f3c21", msg: "feat: ship LiveKit SDK v1.0", branch: "main", t: "2h" },
  { hash: "9c1ee0a", msg: "perf: reduce RDS CPU 99→65%", branch: "main", t: "1d" },
  { hash: "4b22d18", msg: "feat: Socket.IO exam streaming", branch: "feature/space", t: "3d" },
  { hash: "12e8f0c", msg: "feat: 50+ REST APIs delivered", branch: "main", t: "1w" },
  { hash: "f0934aa", msg: "fix: bulk upload memory leak", branch: "fix/upload", t: "2w" },
  { hash: "2d11bbf", msg: "docs: architecture diagrams", branch: "main", t: "3w" },
];

const metrics = [
  { label: "Years Experience", value: "4+" },
  { label: "Features Delivered", value: "18+" },
  { label: "APIs Built", value: "50+" },
  { label: "Projects Shipped", value: "20+" },
  { label: "Perf Wins", value: "34%↑" },
  { label: "Bugs Resolved", value: "60+" },
];

export function GitView() {
  return (
    <div className="h-full flex flex-col">
      <div className="h-9 px-4 flex items-center text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
        Source Control
      </div>

      <div className="px-3 mb-3">
        <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
          <GitBranch className="h-3.5 w-3.5" /> <span className="text-foreground font-mono">main</span> · clean
        </div>
      </div>

      <div className="px-3 grid grid-cols-2 gap-2 mb-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-md border border-border bg-[var(--color-editor)] p-2">
            <div className="text-[14px] font-semibold tabular-nums">{m.value}</div>
            <div className="text-[10.5px] text-muted-foreground uppercase tracking-wider">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="px-3 text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Recent Commits</div>
      <div className="flex-1 overflow-y-auto scrollbar-ide px-3 pb-4 space-y-2">
        {commits.map((c, i) => (
          <motion.div
            key={c.hash}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-start gap-2 rounded-md border border-border bg-[var(--color-editor)] p-2.5"
          >
            <GitCommit className="h-3.5 w-3.5 text-[var(--color-accent-amber)] mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] truncate">{c.msg}</div>
              <div className="text-[10.5px] text-muted-foreground font-mono mt-0.5">
                <span className="text-[var(--color-accent-green)]">{c.hash}</span> · {c.branch} · {c.t} ago
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
