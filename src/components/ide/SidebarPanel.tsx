import { useIDE } from "@/lib/ide-store";
import { Explorer } from "./Explorer";
import { SearchView } from "./SearchView";
import { GitView } from "./GitView";
import { ProjectsView } from "./ProjectsView";
import { ContactFile } from "./files/ContactFile";

export function SidebarPanel() {
  const { activity } = useIDE();

  if (activity === "contact") {
    // Open contact in editor instead; still show explorer here
    return <Explorer />;
  }

  return (
    <div className="w-64 shrink-0 bg-[var(--color-sidebar)] border-r border-border hidden md:flex flex-col">
      {activity === "explorer" && <Explorer />}
      {activity === "search" && <SearchView />}
      {activity === "git" && <GitView />}
      {activity === "projects" && <ProjectsView />}
      {activity === "settings" && <SettingsView />}
    </div>
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
