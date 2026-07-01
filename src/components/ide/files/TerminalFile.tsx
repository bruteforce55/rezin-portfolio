import { useEffect, useRef, useState } from "react";
import { useIDE, type FileId } from "@/lib/ide-store";

interface Line {
  prompt: string;
  cmd?: string;
  out?: React.ReactNode;
}

const BANNER = `
  ╭───────────────────────────────────────╮
  │   rezin@portfolio:~$  type 'help'     │
  ╰───────────────────────────────────────╯`;

export function TerminalFile({ embedded = false }: { embedded?: boolean }) {
  const { openFile } = useIDE();
  const [lines, setLines] = useState<Line[]>([
    { prompt: "", out: <pre className="text-[var(--color-accent-green)] font-mono text-[12px] leading-tight">{BANNER}</pre> },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setHistIdx(-1);

    let out: React.ReactNode = null;
    const lower = cmd.toLowerCase();

    if (lower === "clear") {
      setLines([]);
      return;
    }
    if (lower === "help") {
      out = (
        <div className="font-mono text-[12.5px]">
          <div className="text-muted-foreground mb-1">Available commands:</div>
          {[
            ["help", "list commands"],
            ["about", "open about.ts"],
            ["skills", "open skills.json"],
            ["experience", "open experience.ts"],
            ["projects", "list projects"],
            ["contact", "open contact.tsx"],
            ["resume", "download resume"],
            ["github / linkedin", "open profile"],
            ["theme dark|light", "switch theme"],
            ["clear", "clear screen"],
          ].map(([c, d]) => (
            <div key={c}><span className="text-[var(--color-accent-blue)]">{c.padEnd(20)}</span><span className="text-muted-foreground">{d}</span></div>
          ))}
        </div>
      );
    } else if (lower === "about") {
      openFile("about.ts");
      out = <span className="text-muted-foreground">opening about.ts...</span>;
    } else if (lower === "skills") {
      openFile("skills.json");
      out = <span className="text-muted-foreground">opening skills.json...</span>;
    } else if (lower === "experience") {
      openFile("experience.ts");
      out = <span className="text-muted-foreground">opening experience.ts...</span>;
    } else if (lower === "projects") {
      out = (
        <div className="font-mono text-[12.5px]">
          {["HumanFollowingTrolley", "SPACE", "EnterpriseLMS", "MediaLibrary", "LiveKitSDK", "SocketFramework", "AngryBirdsClone"].map((p) => (
            <button
              key={p}
              className="block text-left text-[var(--color-accent-blue)] hover:underline"
              onClick={() => openFile(`projects/${p}.md` as FileId)}
            >
              projects/{p}/
            </button>
          ))}
        </div>
      );
    } else if (lower === "contact") {
      openFile("contact.tsx");
      out = <span className="text-muted-foreground">opening contact.tsx...</span>;
    } else if (lower === "resume") {
      out = <span className="text-[var(--color-accent-green)]">↓ Resume downloaded (resume.pdf)</span>;
    } else if (lower === "github") {
      window.open("https://github.com", "_blank");
      out = <span className="text-muted-foreground">opening github.com...</span>;
    } else if (lower === "linkedin") {
      window.open("https://www.linkedin.com/in/rezin-muhammed", "_blank");
      out = <span className="text-muted-foreground">opening linkedin.com...</span>;
    } else if (lower.startsWith("theme")) {
      out = <span className="text-muted-foreground">theme set (dark by default in this build).</span>;
    } else if (lower === "whoami") {
      out = <span className="text-[var(--color-accent-amber)]">rezin — Full Stack Engineer · Dubai · 4+ yrs</span>;
    } else if (lower === "sudo hire-me") {
      out = (
        <div className="text-[var(--color-accent-green)] font-mono text-[12.5px]">
          [sudo] password for recruiter: ********<br />
          ✓ access granted. let's talk → rezin555@gmail.com
        </div>
      );
    } else if (lower === "npm install success") {
      out = (
        <pre className="text-muted-foreground font-mono text-[12px] leading-tight">
{`added 1337 packages, and audited 1 portfolio in 0.2s
found 0 vulnerabilities
✓ success installed at v4.0.0`}
        </pre>
      );
    } else {
      out = <span className="text-[var(--color-accent-pink)]">command not found: {cmd}. try 'help'.</span>;
    }

    setLines((l) => [...l, { prompt: "rezin@portfolio:~$", cmd, out }]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(next);
        setInput(history[next]);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={`${embedded ? "h-full" : "min-h-[70vh]"} font-mono text-[13px] bg-[var(--color-editor)] p-4 overflow-y-auto scrollbar-ide`}
    >
      {lines.map((l, i) => (
        <div key={i} className="mb-1">
          {l.cmd !== undefined && (
            <div>
              <span className="text-[var(--color-accent-green)]">{l.prompt}</span>{" "}
              <span>{l.cmd}</span>
            </div>
          )}
          {l.out && <div className="mb-1">{l.out}</div>}
        </div>
      ))}
      <div className="flex items-center gap-2">
        <span className="text-[var(--color-accent-green)]">rezin@portfolio:~$</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          className="flex-1 bg-transparent outline-none border-0 text-foreground caret-[var(--color-primary)]"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <div ref={endRef} />
    </div>
  );
}
