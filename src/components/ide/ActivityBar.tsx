import {
  Files,
  Search,
  GitBranch,
  FolderGit2,
  TerminalSquare,
  Mail,
  Settings,
} from "lucide-react";
import { motion } from "motion/react";
import { useIDE, type ActivityView } from "@/lib/ide-store";
import { cn } from "@/lib/utils";

const items: { id: ActivityView; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
  { id: "explorer", icon: Files, label: "Explorer" },
  { id: "search", icon: Search, label: "Search" },
  { id: "git", icon: GitBranch, label: "Source Control" },
  { id: "projects", icon: FolderGit2, label: "Projects" },
  { id: "terminal", icon: TerminalSquare, label: "Terminal" },
  { id: "contact", icon: Mail, label: "Contact" },
];

export function ActivityBar() {
  const { activity, setActivity, toggleTerminal, openFile } = useIDE();
  return (
    <div className="w-12 shrink-0 bg-[var(--color-activitybar)] border-r border-border flex flex-col items-center py-2">
      {items.map(({ id, icon: Icon, label }) => {
        const active = activity === id;
        return (
          <motion.button
            key={id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              if (id === "terminal") {
                toggleTerminal();
                return;
              }
              if (id === "contact") {
                openFile("contact.tsx");
                return;
              }
              setActivity(id);
            }}
            title={label}
            className={cn(
              "group relative h-10 w-10 grid place-items-center text-muted-foreground hover:text-foreground transition-colors",
            )}
          >
            {active && (
              <motion.span
                layoutId="activity-active-bar"
                className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[2px] bg-[var(--color-primary)] rounded-r"
              />
            )}
            <Icon className={cn("h-5 w-5", active && "text-foreground")} />
          </motion.button>
        );
      })}

      <div className="mt-auto">
        <motion.button
          whileHover={{ rotate: 30 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          onClick={() => setActivity("settings")}
          title="Settings"
          className="h-10 w-10 grid place-items-center text-muted-foreground hover:text-foreground"
        >
          <Settings className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  );
}
