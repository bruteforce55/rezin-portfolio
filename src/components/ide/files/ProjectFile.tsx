import { motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import type { FileId } from "@/lib/ide-store";

interface ProjectInfo {
  name: string;
  tagline: string;
  overview: string;
  problem: string;
  solution: string;
  stack: string[];
  features: string[];
  challenges: string[];
  lessons: string[];
  architecture: string[];
  image?: string;
}

const projects: Record<string, ProjectInfo> = {
  HumanFollowingTrolley: {
    name: "Human Following Trolley",
    tagline: "Autonomous IoT companion robot",
    overview: "An autonomous trolley that follows its operator using computer vision and ultrasonic sensors, designed for warehouses and airports.",
    problem: "Workers in logistics and travel constantly carry heavy loads with no hands-free option.",
    solution: "A robotic platform that locks onto a user via vision tracking and maintains a safe following distance using a sensor mesh.",
    stack: ["Python", "OpenCV", "Raspberry Pi", "Arduino", "Node.js", "WebSocket"],
    features: ["Person detection + tracking", "Obstacle avoidance", "Live telemetry dashboard", "Manual override via mobile"],
    challenges: ["Real-time inference on low-power hardware", "Sensor fusion noise filtering", "Battery / motor torque tuning"],
    lessons: ["Edge inference tradeoffs", "Embedded ↔ web bridging", "Hardware reliability discipline"],
    architecture: ["Camera → OpenCV pipeline → Tracking model", "Pi → Arduino over serial", "WebSocket telemetry to dashboard"],
    image: "/HumanFollower.jpg",
  },
  SPACE: {
    name: "SPACE — Streaming Proctored Assessments",
    tagline: "Real-time exam streaming platform",
    overview: "An enterprise exam-proctoring platform that streams thousands of concurrent candidates with low-latency video and event sync.",
    problem: "Existing proctoring vendors couldn't sustain high-concurrency live streams without buffering or proctor drift.",
    solution: "Custom LiveKit SDK integration with Redis-backed Socket.IO rooms and adaptive bitrate fallbacks.",
    stack: ["React", "Node.js", "Socket.IO", "Redis", "LiveKit", "WebRTC", "AWS"],
    features: ["Multi-proctor live grid", "AI behavior flags", "Session replay", "Scalable to 10k+ concurrent"],
    challenges: ["WebRTC scaling at peak", "Sync between video + event channels", "Graceful degradation on poor networks"],
    lessons: ["WebRTC SFU economics", "Redis adapter scaling patterns", "Observability for real-time systems"],
    architecture: ["LiveKit SFU → Edge", "Socket.IO over Redis adapter", "Event bus for AI flags"],
  },
  EnterpriseLMS: {
    name: "Enterprise LMS",
    tagline: "Scalable corporate learning system",
    overview: "Modular LMS serving regulated industries with content delivery, certifications, and reporting at scale.",
    problem: "Legacy LMS suffered from slow course delivery and brittle bulk-import flows.",
    solution: "Rewrote ingestion pipeline, introduced caching, and parallelized media transcoding.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS S3", "CloudFront"],
    features: ["SCORM / xAPI", "Bulk user import", "Adaptive learning paths", "Compliance reporting"],
    challenges: ["RDS hot tables", "Background job orchestration", "Multi-tenant isolation"],
    lessons: ["Indexes earn their keep", "Job queues > cron", "Tenant-scoped caching keys"],
    architecture: ["Next.js → API → Postgres", "Redis cache for course meta", "S3 + CF for delivery"],
  },
  MediaLibrary: {
    name: "Media Library",
    tagline: "Asset library with smart processing",
    overview: "A centralized media library with on-the-fly transformations, deduping, and rights management.",
    problem: "Marketing teams uploaded the same asset dozens of times across business units.",
    solution: "Content-addressable storage, perceptual hashing, and a single React asset-picker SDK.",
    stack: ["React", "Node.js", "MongoDB", "Sharp", "AWS S3"],
    features: ["Dedup via perceptual hashing", "On-the-fly resize/format", "Folder + tag taxonomy", "Picker SDK"],
    challenges: ["Hash collisions", "Large blob streaming", "Cross-tenant ACLs"],
    lessons: ["Pre-signed URLs simplify everything", "Schema for tags is hard", "Picker UX matters more than the API"],
    architecture: ["Client SDK → API → S3", "Worker for transforms", "Mongo for metadata"],
  },
  LiveKitSDK: {
    name: "LiveKit SDK (Video-as-a-Service)",
    tagline: "Reusable Video-as-a-Service SDK",
    overview: "A thin, opinionated SDK on top of LiveKit that ships a complete meeting experience to any internal product in a day.",
    problem: "Every product team was rebuilding the same WebRTC scaffolding.",
    solution: "A typed React SDK + headless hooks + ready-made UI primitives, packaged with sensible defaults.",
    stack: ["TypeScript", "React", "LiveKit", "WebRTC", "Tailwind"],
    features: ["Hooks for room/state", "Drop-in UI", "Recording", "Adaptive layouts"],
    challenges: ["API surface stability", "Theming across consumers", "Tree-shake friendly bundle"],
    lessons: ["Defaults > knobs", "Hooks before components", "Document the why"],
    architecture: ["SDK ↔ LiveKit server", "Hooks layer", "Theming via CSS variables"],
  },
  SocketFramework: {
    name: "Distributed Socket Framework",
    tagline: "Distributed Socket.IO framework",
    overview: "An internal framework that standardizes real-time features (rooms, presence, typed events) across services.",
    problem: "Socket code was duplicated and inconsistent across our microservices.",
    solution: "A typed framework with Redis adapter, presence helpers, and convention-based namespace routing.",
    stack: ["Node.js", "Socket.IO", "Redis", "TypeScript"],
    features: ["Typed events", "Presence helpers", "Backpressure handling", "Tracing hooks"],
    challenges: ["Cross-service auth", "Sticky sessions vs adapter", "Type ergonomics"],
    lessons: ["Convention > config for internal frameworks", "Tracing is non-optional", "Plan for replays"],
    architecture: ["Service → SocketFramework → Redis adapter", "Tracing into OTel", "Convention-based namespaces"],
  },
  AngryBirdsClone: {
    name: "Angry Birds Clone / Physics Sandbox",
    tagline: "2D physics engine exploration",
    overview: "A custom 2D physics replica of Angry Birds built to explore rigid-body mechanics, impulse resolution, and game loop architecture.",
    problem: "Commercial engines abstract away physics, making it hard to understand impulse calculations and spatial partitioning systems deeply.",
    solution: "Built a custom engine with Verlet integration, circular & AABB collision detection, and contact resolver from scratch in canvas.",
    stack: ["TypeScript", "Matter.js", "HTML5 Canvas", "Vite"],
    features: ["Sling launching mechanics", "AABB & Circle collisions", "Destructible block structures", "Particle effect debris"],
    challenges: ["Resolving simultaneous multi-body contact points", "Optimizing broad-phase collisions", "Ensuring frame-rate independent physics simulation"],
    lessons: ["Numerical stability of solvers", "Spatial partitioning (grid hashing)", "Entity-Component systems"],
    architecture: ["Game Loop (requestAnimationFrame) → Input handler", "Broad-phase sweep & prune → Narrow-phase SAT", "Impulse solver → Canvas renderer"],
    image: "/GameDev.png",
  },
};

export function ProjectFile({ id }: { id: FileId }) {
  const key = id.replace("projects/", "").replace(".md", "");
  const p = projects[key];
  if (!p) return <div className="p-8">Project not found.</div>;

  return (
    <div className="px-8 py-8 max-w-5xl mx-auto">
      <div className="text-[12px] text-muted-foreground font-mono">projects / {key}.md</div>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{p.name}</h1>
      <p className="mt-1.5 text-[14px] text-muted-foreground">{p.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {/* <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-2.5 h-7 text-[12px] rounded-md border border-border hover:bg-accent transition-colors">
          <Github className="h-3.5 w-3.5" /> Repo
        </a>
        <a href="#" className="inline-flex items-center gap-1.5 px-2.5 h-7 text-[12px] rounded-md border border-border hover:bg-accent transition-colors">
          <ArrowUpRight className="h-3.5 w-3.5" /> Live Demo
        </a> */}
        {p.stack.map((s) => (
          <span key={s} className="px-2 py-0.5 text-[11.5px] rounded border border-border bg-[var(--color-tab-inactive)] font-mono">
            {s}
          </span>
        ))}
      </div>

      {p.image && (
        <div className="mt-6 rounded-lg overflow-hidden border border-border bg-black/10 max-h-[380px] w-full flex items-center justify-center">
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-auto max-h-[380px] object-cover"
          />
        </div>
      )}

      <Section title="## Overview"><p className="text-muted-foreground">{p.overview}</p></Section>

      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        <Card title="The Problem" body={p.problem} accent="text-[var(--color-accent-pink)]" />
        <Card title="The Solution" body={p.solution} accent="text-[var(--color-accent-green)]" />
      </div>

      <Section title="## Architecture">
        <pre className="font-mono text-[12.5px] leading-relaxed text-muted-foreground rounded-lg border border-border bg-[var(--color-editor)] p-4 overflow-x-auto">
          {p.architecture.map((a, i) => (
            <div key={i}>{i === 0 ? "" : "   ↓\n"}{a}</div>
          ))}
        </pre>
      </Section>

      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        <List title="## Features" items={p.features} />
        <List title="## Challenges" items={p.challenges} />
      </div>

      <Section title="## Lessons Learned">
        <ul className="space-y-1.5 text-muted-foreground text-[14px]">
          {p.lessons.map((l) => (
            <motion.li key={l} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} className="flex gap-2">
              <span className="text-[var(--color-accent-amber)]">→</span> {l}
            </motion.li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h2 className="text-[var(--color-syntax-keyword)] font-mono text-[13px] mb-2">{title}</h2>
      <div className="text-[14px]">{children}</div>
    </div>
  );
}

function Card({ title, body, accent }: { title: string; body: string; accent: string }) {
  return (
    <div className="rounded-lg border border-border bg-[var(--color-editor)] p-4">
      <div className={`text-[12px] font-mono uppercase tracking-wider ${accent}`}>{title}</div>
      <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-[var(--color-syntax-keyword)] font-mono text-[13px] mb-2">{title}</h3>
      <ul className="space-y-1.5 text-[13.5px] text-muted-foreground">
        {items.map((i) => (
          <li key={i} className="flex gap-2"><span className="text-[var(--color-primary)]">●</span> {i}</li>
        ))}
      </ul>
    </div>
  );
}
