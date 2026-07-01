import { useIDE } from "@/lib/ide-store";
import { Explorer } from "./Explorer";
import { SearchView } from "./SearchView";
import { GitView } from "./GitView";
import { ProjectsView } from "./ProjectsView";
import { ContactFile } from "./files/ContactFile";

export function SidebarPanel() {
  const { activity, sidebarOpen, setSidebarOpen } = useIDE();

  if (!sidebarOpen) return null;

  const displayActivity = activity === "contact" ? "explorer" : activity;

  return (
    <>
      {/* Mobile backdrop to click-away and close sidebar */}
      <div
        className="fixed inset-0 z-30 bg-black/30 md:hidden"
        onClick={() => setSidebarOpen(false)}
      />

      <div className="fixed left-12 top-9 bottom-9 w-64 bg-[var(--color-sidebar)] border-r border-border z-40 flex flex-col shadow-2xl md:static md:h-full md:w-64 md:shrink-0 md:bg-[var(--color-sidebar)] md:border-r md:border-border md:shadow-none">
        {displayActivity === "explorer" && <Explorer />}
        {displayActivity === "search" && <SearchView />}
        {displayActivity === "git" && <GitView />}
        {displayActivity === "projects" && <ProjectsView />}
        {displayActivity === "settings" && <SettingsView />}
      </div>
    </>
  );
}

function SettingsView() {
  return (
    <div className="p-4 text-[13px] space-y-3">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Settings</div>
      <Row k="Theme" v="Rezin Dark+" />
      <Row k="Font" v="JetBrains Mono" />
      <Row k="Indent" v="2 spaces" />
      <Row k="Format on save" v="Enabled" />
      <Row k="Auto-fetch" v="every 3m" />
      <Row k="Telemetry" v="Off" />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-mono text-[12.5px]">{v}</span>
    </div>
  );
}
// reference imports
void ContactFile;
