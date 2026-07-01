import { CodeBlock, K, S, F, V, C, P, O } from "../syntax";

export function AboutFile() {
  return (
    <div className="px-8 py-8 max-w-4xl mx-auto">
      <CodeBlock>
        {[
          <><C>{`// portfolio/about.ts — quick reference`}</C></>,
          <><K>export const</K> <V>developer</V> <O>=</O> {"{"}</>,
          <>{"  "}<P>name</P>: <S>"Rezin Muhammed"</S>,</>,
          <>{"  "}<P>role</P>: <S>"Full Stack Engineer"</S>,</>,
          <>{"  "}<P>experience</P>: <S>"4+ Years"</S>,</>,
          <>{"  "}<P>location</P>: <S>"Dubai, UAE"</S>,</>,
          <>{"  "}<P>education</P>: <S>"Master of Computer Applications"</S>,</>,
          <>{"  "}<P>passion</P>: <S>"Building scalable enterprise software"</S>,</>,
          <>{"}"} <K>as const</K>;</>,
          <></>,
          <><K>export type</K> <V>Developer</V> <O>=</O> <K>typeof</K> developer;</>,
        ]}
      </CodeBlock>

      <div className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Professional Summary</h2>
        <div className="mt-1 h-px bg-border" />
        <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground max-w-2xl">
          Full Stack Engineer with hands-on experience building scalable enterprise applications
          using React, Node.js, TypeScript, PostgreSQL, Redis, and AWS. I focus on architecture,
          performance, and shipping reliable software that holds up in production.
        </p>

        <h3 className="mt-8 text-[13px] font-mono text-[var(--color-syntax-keyword)] tracking-wide">
          // experienced in
        </h3>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            ["Enterprise Applications", "ERP, LMS, internal platforms"],
            ["AI-powered Products", "Workflow automation, AI assistants"],
            ["Distributed Systems", "Socket.IO, Redis, message buses"],
            ["Cloud Integrations", "AWS, Azure, GCP"],
            ["Performance Engineering", "RDS tuning, caching, load testing"],
            ["Reusable Platform Development", "SDKs and shared frameworks"],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-lg border border-border bg-[var(--color-editor)] p-3.5 hover:border-[var(--color-primary)]/40 transition-colors"
            >
              <div className="text-[13.5px] font-medium">{title}</div>
              <div className="text-[12px] text-muted-foreground mt-0.5">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Suppress unused warnings for tokens not used in this file
void F;
