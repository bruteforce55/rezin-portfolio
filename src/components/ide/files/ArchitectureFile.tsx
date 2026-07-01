import { motion } from "motion/react";
import { ArrowRight, Database, Cloud, Server, Globe, Layers, Repeat } from "lucide-react";

export function ArchitectureFile() {
  return (
    <div className="px-8 py-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight"># System Architecture</h1>
      <p className="mt-2 text-muted-foreground text-[14px] max-w-2xl">
        A reference architecture I lean on for real-time, AI-augmented enterprise workloads — composed of
        a React client, Express API, Redis cache, MongoDB primary store, and AWS infrastructure.
      </p>

      <div className="mt-8 rounded-xl border border-border bg-[var(--color-editor)] p-6 overflow-x-auto">
        <div className="flex items-stretch justify-center gap-6 min-w-[680px]">
          <Layer icon={Globe} label="React" sub="Client / SPA" color="text-[var(--color-accent-blue)]" />
          <Flow label="HTTP / WS" />
          <Layer icon={Server} label="Express" sub="REST + Socket.IO" color="text-[var(--color-accent-green)]" />
          <Flow label="GET / SET" />
          <Layer icon={Repeat} label="Redis" sub="Cache + Pub/Sub" color="text-[var(--color-accent-pink)]" />
          <Flow label="Miss" />
          <Layer icon={Database} label="MongoDB" sub="Source of truth" color="text-[var(--color-accent-amber)]" />
          <Flow label="" />
          <Layer icon={Cloud} label="AWS" sub="S3 · RDS · CW" color="text-[var(--color-primary)]" />
        </div>

        {/* animated request dots */}
        <div className="relative h-10 mt-2">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border" />
          {[0, 0.6, 1.2].map((delay) => (
            <motion.span
              key={delay}
              className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]"
              initial={{ left: "0%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 2.2, delay, repeat: Infinity, ease: "linear" }}
            />
          ))}
          {[0.3, 0.9, 1.5].map((delay) => (
            <motion.span
              key={`ws-${delay}`}
              className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent-green)] shadow-[0_0_8px_var(--color-accent-green)]"
              initial={{ right: "0%" }}
              animate={{ right: "100%" }}
              transition={{ duration: 2.6, delay, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <Bullet icon={Layers} title="Caching strategy" body="Read-through cache. 60% RDS load reduction observed in prod." />
        <Bullet icon={Server} title="Real-time" body="Socket.IO rooms backed by Redis adapter for horizontal scaling." />
        <Bullet icon={Cloud} title="Cloud" body="S3 for assets, CloudFront CDN, autoscaled ECS workers." />
      </div>

      <pre className="mt-8 rounded-lg border border-border bg-[var(--color-editor)] p-5 font-mono text-[12.5px] leading-relaxed text-muted-foreground overflow-x-auto">
{`Client (React)
   │  https / wss
   ▼
API  (Express + Socket.IO)
   │
   ├── Redis (cache · pub/sub · rate-limit)
   │      │ miss
   │      ▼
   └── MongoDB / PostgreSQL
              │
              ▼
        AWS · S3 · RDS · CloudWatch`}
      </pre>
    </div>
  );
}

function Layer({
  icon: Icon,
  label,
  sub,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="flex flex-col items-center justify-center w-28 rounded-lg border border-border bg-[var(--color-tab-inactive)] py-4 text-center"
    >
      <Icon className={`h-6 w-6 ${color}`} />
      <div className="mt-2 text-[13px] font-semibold">{label}</div>
      <div className="text-[10.5px] text-muted-foreground">{sub}</div>
    </motion.div>
  );
}

function Flow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-muted-foreground">
      <ArrowRight className="h-4 w-4" />
      {label && <span className="text-[10px] font-mono mt-1">{label}</span>}
    </div>
  );
}

function Bullet({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <div className="rounded-lg border border-border bg-[var(--color-editor)] p-4">
      <Icon className="h-4 w-4 text-[var(--color-primary)]" />
      <div className="mt-2 text-[13.5px] font-semibold">{title}</div>
      <div className="mt-1 text-[12.5px] text-muted-foreground">{body}</div>
    </div>
  );
}
