import { motion } from "motion/react";
import { CodeBlock, K, S, P, O, N } from "../syntax";

const skills = {
  frontend: [
    ["React", 95, "4y"],
    ["Next.js", 88, "3y"],
    ["TypeScript", 92, "4y"],
    ["JavaScript", 95, "5y"],
    ["Tailwind", 90, "3y"],
    ["Material UI", 82, "3y"],
  ],
  backend: [
    ["Node.js", 93, "4y"],
    ["Express", 92, "4y"],
    ["Socket.IO", 88, "2y"],
    ["GraphQL", 78, "2y"],
    ["Auth (JWT/OAuth)", 86, "3y"],
  ],
  database: [
    ["MongoDB", 88, "4y"],
    ["PostgreSQL", 86, "3y"],
    ["MySQL", 80, "3y"],
    ["Redis", 84, "2y"],
  ],
  cloud: [
    ["AWS", 86, "3y"],
    ["Azure", 76, "2y"],
    ["Google Cloud", 72, "2y"],
  ],
  testing: [
    ["JMeter", 80, "2y"],
    ["Artillery", 74, "1y"],
  ],
  tools: [
    ["Git", 95, "5y"],
    ["GitHub", 95, "5y"],
    ["GitLab", 86, "4y"],
    ["Jira", 88, "4y"],
  ],
} as const;

type SkillEntry = readonly [string, number, string];

export function SkillsFile() {
  return (
    <div className="px-8 py-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10">
        <div>
          <CodeBlock>
            {[
              <>{"{"}</>,
              ...Object.entries(skills).flatMap(([cat, items], idx, arr) => [
                <>{"  "}<P>{cat}</P>: [</>,
                ...items.map((s) => (
                  <>{"    "}<S>"{s[0]}"</S>,</>
                )),
                <>{"  "}{idx === arr.length - 1 ? "]" : "],"}</>,
              ]),
              <>{"}"}</>,
            ]}
          </CodeBlock>

          <div className="mt-6 rounded-lg border border-border bg-[var(--color-editor)] p-4 font-mono text-[12.5px]">
            <div className="text-muted-foreground">$ npm list --global</div>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-1">
              {Object.values(skills).flat().slice(0, 18).map(([name, , yrs]) => (
                <div key={name as string} className="truncate">
                  <span className="text-[var(--color-syntax-keyword)]">├─</span>{" "}
                  <span className="text-[var(--color-syntax-variable)]">{name}</span>
                  <span className="text-muted-foreground">@{yrs}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(skills).map(([cat, items]) => (
            <SkillCategory key={cat} title={cat} items={items as readonly SkillEntry[]} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillCategory({ title, items }: { title: string; items: readonly SkillEntry[] }) {
  return (
    <div>
      <h3 className="text-[12px] uppercase tracking-widest text-muted-foreground font-mono mb-3">
        {title}
      </h3>
      <div className="space-y-2.5">
        {items.map(([name, level, years], i) => (
          <div key={name}>
            <div className="flex items-baseline justify-between text-[12.5px]">
              <span className="font-medium">{name}</span>
              <span className="text-muted-foreground font-mono">{years} · {level}%</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-[var(--color-tab-inactive)] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${level}%` }}
                transition={{ duration: 0.9, delay: i * 0.05, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-green)]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

void K; void O; void N;
