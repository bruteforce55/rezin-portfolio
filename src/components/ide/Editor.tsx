import { AnimatePresence, motion } from "motion/react";
import { useIDE } from "@/lib/ide-store";
import { fileMeta } from "./files/registry";
import { ReadmeFile } from "./files/ReadmeFile";
import { AboutFile } from "./files/AboutFile";
import { ExperienceFile } from "./files/ExperienceFile";
import { SkillsFile } from "./files/SkillsFile";
import { ArchitectureFile } from "./files/ArchitectureFile";
import { AchievementsFile } from "./files/AchievementsFile";
import { ContactFile } from "./files/ContactFile";
import { TerminalFile } from "./files/TerminalFile";
import { ProjectFile } from "./files/ProjectFile";
import { ChevronRight } from "lucide-react";

export function Editor() {
  const { activeTab } = useIDE();
  const meta = fileMeta[activeTab];

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-[var(--color-editor)]">
      {/* breadcrumbs */}
      <div className="h-7 shrink-0 border-b border-border flex items-center px-4 text-[12px] text-muted-foreground font-mono gap-1">
        {meta.path.split("/").map((seg, i, arr) => (
          <span key={i} className="flex items-center gap-1">
            <span className={i === arr.length - 1 ? "text-foreground" : ""}>{seg}</span>
            {i < arr.length - 1 && <ChevronRight className="h-3 w-3" />}
          </span>
        ))}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-ide">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {renderFile(activeTab)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function renderFile(id: string) {
  switch (id) {
    case "README.md": return <ReadmeFile />;
    case "about.ts": return <AboutFile />;
    case "experience.ts": return <ExperienceFile />;
    case "skills.json": return <SkillsFile />;
    case "architecture.md": return <ArchitectureFile />;
    case "achievements.md": return <AchievementsFile />;
    case "contact.tsx": return <ContactFile />;
    case "terminal.sh": return <TerminalFile />;
    default:
      if (id.startsWith("projects/")) return <ProjectFile id={id as never} />;
      return null;
  }
}
