import { ChevronRight, ChevronDown, FileCode2, FileText, FileJson, FileTerminal, Folder, FolderOpen } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useIDE, type FileId } from "@/lib/ide-store";
import { cn } from "@/lib/utils";

type Node =
  | { type: "file"; name: string; id: FileId; icon: React.ComponentType<{ className?: string }>; color: string }
  | { type: "folder"; name: string; children: Node[] };

const tree: Node[] = [
  { type: "file", name: "README.md", id: "README.md", icon: FileText, color: "text-[var(--color-accent-blue)]" },
  { type: "file", name: "about.ts", id: "about.ts", icon: FileCode2, color: "text-[var(--color-accent-amber)]" },
  { type: "file", name: "experience.ts", id: "experience.ts", icon: FileCode2, color: "text-[var(--color-accent-amber)]" },
  {
    type: "folder",
    name: "projects",
    children: [
      { type: "file", name: "HumanFollowingTrolley.md", id: "projects/HumanFollowingTrolley.md", icon: FileText, color: "text-[var(--color-accent-blue)]" },
      { type: "file", name: "SPACE.md", id: "projects/SPACE.md", icon: FileText, color: "text-[var(--color-accent-blue)]" },
      { type: "file", name: "EnterpriseLMS.md", id: "projects/EnterpriseLMS.md", icon: FileText, color: "text-[var(--color-accent-blue)]" },
      { type: "file", name: "MediaLibrary.md", id: "projects/MediaLibrary.md", icon: FileText, color: "text-[var(--color-accent-blue)]" },
      { type: "file", name: "LiveKitSDK.md", id: "projects/LiveKitSDK.md", icon: FileText, color: "text-[var(--color-accent-blue)]" },
      { type: "file", name: "SocketFramework.md", id: "projects/SocketFramework.md", icon: FileText, color: "text-[var(--color-accent-blue)]" },
      { type: "file", name: "AngryBirdsClone.md", id: "projects/AngryBirdsClone.md", icon: FileText, color: "text-[var(--color-accent-blue)]" },
    ],
  },
  { type: "file", name: "skills.json", id: "skills.json", icon: FileJson, color: "text-[var(--color-accent-amber)]" },
  { type: "file", name: "architecture.md", id: "architecture.md", icon: FileText, color: "text-[var(--color-accent-blue)]" },
  { type: "file", name: "achievements.md", id: "achievements.md", icon: FileText, color: "text-[var(--color-accent-blue)]" },
  { type: "file", name: "contact.tsx", id: "contact.tsx", icon: FileCode2, color: "text-[var(--color-accent-blue)]" },
  { type: "file", name: "terminal.sh", id: "terminal.sh", icon: FileTerminal, color: "text-[var(--color-accent-green)]" },
];

export function Explorer() {
  return (
    <div className="h-full flex flex-col">
      <div className="h-9 shrink-0 px-4 flex items-center text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
        Explorer
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-ide pb-4">
        <FolderRow name="portfolio" defaultOpen>
          {tree.map((n, i) => (
            <NodeRender key={i} node={n} depth={1} />
          ))}
        </FolderRow>
      </div>
    </div>
  );
}

function FolderRow({ name, defaultOpen, children }: { name: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-1 px-2 py-[3px] text-[13px] hover:bg-accent/60 transition-colors"
      >
        {open ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
        {open ? <FolderOpen className="h-4 w-4 text-[var(--color-accent-amber)]" /> : <Folder className="h-4 w-4 text-[var(--color-accent-amber)]" />}
        <span className="truncate">{name}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NodeRender({ node, depth }: { node: Node; depth: number }) {
  if (node.type === "folder") {
    return (
      <div style={{ paddingLeft: depth * 10 }}>
        <FolderRow name={node.name}>
          {node.children.map((c, i) => (
            <NodeRender key={i} node={c} depth={depth + 1} />
          ))}
        </FolderRow>
      </div>
    );
  }
  return <FileRow node={node} depth={depth} />;
}

function FileRow({ node, depth }: { node: Extract<Node, { type: "file" }>; depth: number }) {
  const { openFile, activeTab } = useIDE();
  const Icon = node.icon;
  const active = activeTab === node.id;
  return (
    <button
      onClick={() => openFile(node.id)}
      style={{ paddingLeft: depth * 10 + 18 }}
      className={cn(
        "w-full flex items-center gap-2 pr-2 py-[3px] text-[13px] hover:bg-accent/60 transition-colors",
        active && "bg-accent text-foreground",
      )}
    >
      <Icon className={cn("h-4 w-4", node.color)} />
      <span className="truncate">{node.name}</span>
    </button>
  );
}
