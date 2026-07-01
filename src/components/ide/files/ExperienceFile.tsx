import { motion } from "motion/react";
import { CodeBlock, K, S, V, C, P, O } from "../syntax";

const experiences = [
  {
    company: "AAISolutions",
    position: "Full Stack Engineer",
    duration: "Feb 2025 — Present",
    location: "Dubai, UAE",
    highlights: [
      "Enterprise modules",
      "Media Library",
      "ERP",
      "AI Workflows",
      "Socket.IO Exam Streaming",
      "Redis",
      "LiveKit SDK",
      "Video as a Service",
      "WebRTC",
      "Performance Optimization",
    ],
  },
  {
    company: "iLearningEngines",
    position: "Software Developer",
    duration: "Aug 2023 — Feb 2025",
    location: "Remote",
    highlights: [
      "50+ REST APIs",
      "18+ Enterprise Features",
      "Reduced RDS CPU from 99% to 65%",
      "Bulk Upload Optimization",
      "AWS · Azure · GCP",
      "JMeter",
      "React AI Application",
      "Rising Star Award",
    ],
  },
  {
    company: "SSITS",
    position: "System Administrator",
    duration: "Aug 2019 — Feb 2021",
    location: "India",
    highlights: [
      "Issue Tracking System",
      "SMS Platform",
      "CCTV Dashboard",
      "Infrastructure",
      "Networking",
    ],
  },
];

export function ExperienceFile() {
  return (
    <div className="px-8 py-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10">
        {/* code side */}
        <div>
          <CodeBlock>
            {[
              <><C>{`// portfolio/experience.ts`}</C></>,
              <><K>const</K> <V>experience</V> <O>=</O> [</>,
              ...experiences.flatMap((e, i) => [
                <>{"  "}{"{"}</>,
                <>{"    "}<P>company</P>: <S>"{e.company}"</S>,</>,
                <>{"    "}<P>position</P>: <S>"{e.position}"</S>,</>,
                <>{"    "}<P>duration</P>: <S>"{e.duration}"</S>,</>,
                <>{"    "}<P>highlights</P>: [</>,
                ...e.highlights.map((h) => (
                  <>{"      "}<S>"{h}"</S>,</>
                )),
                <>{"    "}]</>,
                <>{"  "}{i === experiences.length - 1 ? "}" : "},"}</>,
              ]),
              <>];</>,
            ]}
          </CodeBlock>
        </div>

        {/* timeline side */}
        <div className="relative">
          <h2 className="text-xl font-semibold tracking-tight mb-6">Timeline</h2>
          <div className="absolute left-[7px] top-[64px] bottom-2 w-px bg-border" />
          <div className="space-y-6">
            {experiences.map((e, i) => (
              <motion.div
                key={e.company}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative pl-7"
              >
                <span className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full bg-[var(--color-primary)] ring-4 ring-[var(--color-editor)]" />
                <div className="rounded-lg border border-border bg-[var(--color-editor)] p-4">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <div className="font-semibold">{e.position}</div>
                    <div className="text-[12px] text-muted-foreground font-mono">{e.duration}</div>
                  </div>
                  <div className="text-[13px] text-[var(--color-primary)]">{e.company} · <span className="text-muted-foreground">{e.location}</span></div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {e.highlights.map((h) => (
                      <span key={h} className="px-2 py-0.5 text-[11.5px] rounded border border-border bg-[var(--color-tab-inactive)] font-mono">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
