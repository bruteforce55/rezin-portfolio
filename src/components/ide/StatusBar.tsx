import { GitBranch, Check, Bell, Wifi, Zap } from "lucide-react";
import { useIDE } from "@/lib/ide-store";
import { fileMeta } from "./files/registry";

export function StatusBar() {
  const { activeTab, setPaletteOpen } = useIDE();
  const meta = fileMeta[activeTab];
  return (
    <div className="h-6 shrink-0 bg-[var(--color-statusbar)] text-white/90 text-[11px] flex items-center px-3 gap-3 font-medium">
      <div className="flex items-center gap-1.5">
        <GitBranch className="h-3 w-3" /> main
      </div>
      <div className="flex items-center gap-1.5">
        <Check className="h-3 w-3" /> 0 errors · 0 warnings
      </div>
      <div className="flex-1" />
      <button
        onClick={() => setPaletteOpen(true)}
        className="hidden sm:flex items-center gap-1.5 hover:bg-white/15 px-1.5 rounded"
      >
        <Zap className="h-3 w-3" /> ⌘K
      </button>
      <div className="hidden md:flex items-center gap-3">
        <span>{meta.language}</span>
        <span>UTF-8</span>
        <span>LF</span>
        <span>Spaces: 2</span>
      </div>
      <Bell className="h-3 w-3" />
      <Wifi className="h-3 w-3" />
    </div>
  );
}
