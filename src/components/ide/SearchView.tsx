import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useIDE, type FileId } from "@/lib/ide-store";

const corpus: { file: FileId; lines: string[] }[] = [
  { file: "about.ts", lines: ["Rezin Muhammed", "Full Stack Engineer", "Dubai, UAE", "Master of Computer Applications"] },
  { file: "experience.ts", lines: ["AAISolutions", "iLearningEngines", "SSITS", "Socket.IO Exam Streaming", "LiveKit SDK", "Rising Star Award"] },
  { file: "skills.json", lines: ["React", "Node", "PostgreSQL", "Redis", "AWS", "TypeScript", "Socket.IO"] },
  { file: "architecture.md", lines: ["Redis", "MongoDB", "Express", "WebSocket", "Caching"] },
  { file: "achievements.md", lines: ["Rising Star Award", "50+ REST APIs", "RDS optimization", "Reusable Video SDK"] },
  { file: "projects/SPACE.md", lines: ["Streaming", "Proctored", "WebRTC", "LiveKit"] },
  { file: "projects/LiveKitSDK.md", lines: ["SDK", "Video as a Service", "WebRTC"] },
];

export function SearchView() {
  const [q, setQ] = useState("");
  const { openFile } = useIDE();
  const results = useMemo(() => {
    if (!q.trim()) return [];
    return corpus
      .map(({ file, lines }) => ({
        file,
        matches: lines.filter((l) => l.toLowerCase().includes(q.toLowerCase())),
      }))
      .filter((r) => r.matches.length);
  }, [q]);

  return (
    <div className="h-full flex flex-col">
      <div className="h-9 px-4 flex items-center text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Search</div>
      <div className="px-3">
        <div className="flex items-center gap-2 bg-[var(--color-editor)] border border-border rounded-md px-2 h-8">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search portfolio..."
            className="flex-1 bg-transparent outline-none text-[13px]"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-ide mt-3">
        {results.length === 0 && q && (
          <div className="px-4 text-[12px] text-muted-foreground">No results.</div>
        )}
        {results.map((r) => (
          <div key={r.file} className="mb-3">
            <button onClick={() => openFile(r.file)} className="w-full text-left px-3 py-1 text-[12.5px] font-mono text-[var(--color-accent-blue)] hover:bg-accent/60">
              {r.file}
            </button>
            {r.matches.map((m, i) => (
              <button
                key={i}
                onClick={() => openFile(r.file)}
                className="w-full text-left pl-7 pr-3 py-0.5 text-[12px] text-muted-foreground hover:bg-accent/60 font-mono truncate"
              >
                {highlight(m, q)}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function highlight(text: string, q: string) {
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="bg-[var(--color-primary)]/30 text-foreground rounded-sm">{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </>
  );
}
