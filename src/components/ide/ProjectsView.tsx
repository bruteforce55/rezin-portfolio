import { Folder } from "lucide-react";
import { useIDE } from "@/lib/ide-store";
import { projectsList } from "./files/registry";

export function ProjectsView() {
  const { openFile } = useIDE();
  return (
    <div className="h-full flex flex-col">
      <div className="h-9 px-4 flex items-center text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
        Projects
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-ide px-2 pb-4 space-y-1">
        {projectsList.map((p) => (
          <button
            key={p.id}
            onClick={() => openFile(p.id)}
            className="w-full text-left rounded-md border border-border bg-[var(--color-editor)] p-2.5 hover:border-[var(--color-primary)]/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Folder className="h-4 w-4 text-[var(--color-accent-amber)]" />
              <span className="text-[13px] font-medium font-mono">{p.name}</span>
            </div>
            <div className="text-[11.5px] text-muted-foreground mt-1 pl-6">{p.tagline}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
