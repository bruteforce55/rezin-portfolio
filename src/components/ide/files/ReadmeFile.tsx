import { motion } from "motion/react";
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { useIDE } from "@/lib/ide-store";

const ASCII = `
██████╗ ███████╗███████╗██╗███╗   ██╗
██╔══██╗██╔════╝╚══███╔╝██║████╗  ██║
██████╔╝█████╗    ███╔╝ ██║██╔██╗ ██║
██╔══██╗██╔══╝   ███╔╝  ██║██║╚██╗██║
██║  ██║███████╗███████╗██║██║ ╚████║
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝
`;

export function ReadmeFile() {
  const { openFile } = useIDE();
  return (
    <div className="px-8 py-10 max-w-4xl mx-auto">
      <motion.pre
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-[8px] sm:text-[10px] md:text-[12px] leading-[1.05] text-[var(--color-primary)] whitespace-pre overflow-hidden"
      >
        {ASCII}
      </motion.pre>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-6 flex items-center gap-2 text-[12px] text-muted-foreground"
      >
        <Sparkles className="h-3.5 w-3.5 text-[var(--color-accent-amber)]" />
        <span># Rezin Muhammed · Full Stack Engineer</span>
      </motion.div>

      <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
        Building scalable enterprise software,{" "}
        <span className="text-[var(--color-primary)]">one commit at a time.</span>
      </h1>
      <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
        Full Stack Engineer with 4+ years of experience designing distributed systems, AI-powered
        products, and real-time platforms used across enterprise environments. I care about
        thoughtful architecture, performance, and developer experience.
      </p>

      <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          ["4+", "Years experience"],
          ["50+", "REST APIs"],
          ["18+", "Enterprise features"],
          ["99→65%", "RDS CPU reduction"],
        ].map(([n, l]) => (
          <div key={l} className="rounded-lg border border-border bg-[var(--color-editor)] p-4">
            <div className="text-2xl font-semibold tracking-tight">{n}</div>
            <div className="text-[12px] text-muted-foreground mt-0.5">{l}</div>
          </div>
        ))}
      </div>

      <Section title="## Tech Stack">
        <div className="flex flex-wrap gap-1.5">
          {[
            "React", "Next.js", "TypeScript", "Node.js", "Express", "Socket.IO",
            "PostgreSQL", "MongoDB", "Redis", "AWS", "Azure", "GCP", "WebRTC", "LiveKit",
          ].map((t) => (
            <span key={t} className="px-2 py-0.5 text-[12px] rounded border border-border bg-[var(--color-tab-inactive)] font-mono">
              {t}
            </span>
          ))}
        </div>
      </Section>

      <Section title="## Current Focus">
        <ul className="text-[14px] text-muted-foreground space-y-1.5">
          <li>→ Distributed real-time systems with Socket.IO + Redis</li>
          <li>→ AI workflow tooling and orchestration</li>
          <li>→ Reusable platform SDKs (Video-as-a-Service)</li>
          <li>→ Performance engineering at scale</li>
        </ul>
      </Section>

      <Section title="## Quick Links">
        <div className="flex flex-wrap gap-2">
          <QuickLink onClick={() => openFile("about.ts")}>about.ts</QuickLink>
          <QuickLink onClick={() => openFile("experience.ts")}>experience.ts</QuickLink>
          <QuickLink onClick={() => openFile("projects/SPACE.md")}>projects/</QuickLink>
          <QuickLink onClick={() => openFile("skills.json")}>skills.json</QuickLink>
          <QuickLink onClick={() => openFile("contact.tsx")}>contact.tsx</QuickLink>
        </div>
      </Section>

      <div className="mt-10 flex flex-wrap items-center gap-3 pt-6 border-t border-border">
        <button
          onClick={() => openFile("contact.tsx")}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-[var(--color-primary)] text-primary-foreground text-[13px] font-medium hover:opacity-90 transition-opacity"
        >
          Let's build something <ArrowRight className="h-4 w-4" />
        </button>
        {/* <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-10 px-3 rounded-md border border-border text-[13px] hover:bg-accent transition-colors">
          <Github className="h-4 w-4" /> GitHub
        </a> */}
        <a href="https://www.linkedin.com/in/rezin-muhammed" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-10 px-3 rounded-md border border-border text-[13px] hover:bg-accent transition-colors">
          <Linkedin className="h-4 w-4" /> LinkedIn
        </a>
        <a href="mailto:rezin555@gmail.com" className="inline-flex items-center gap-2 h-10 px-3 rounded-md border border-border text-[13px] hover:bg-accent transition-colors">
          <Mail className="h-4 w-4" /> Email
        </a>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-9">
      <h2 className="text-[var(--color-syntax-keyword)] font-mono text-[13px] mb-3">{title}</h2>
      {children}
    </div>
  );
}

function QuickLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="font-mono text-[12.5px] px-2.5 py-1 rounded border border-border bg-[var(--color-editor)] text-[var(--color-accent-blue)] hover:bg-accent transition-colors"
    >
      {children}
    </button>
  );
}
