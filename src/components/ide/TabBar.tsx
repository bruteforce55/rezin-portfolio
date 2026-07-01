import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useIDE, type FileId } from "@/lib/ide-store";
import { cn } from "@/lib/utils";
import { fileMeta } from "./files/registry";

export function TabBar() {
  const { openTabs, activeTab, setActiveTab, closeTab } = useIDE();
  return (
    <div className="h-9 shrink-0 bg-[var(--color-titlebar)] border-b border-border flex items-end overflow-x-auto scrollbar-ide">
      <AnimatePresence initial={false}>
        {openTabs.map((tab) => (
          <Tab key={tab} id={tab} active={tab === activeTab} onSelect={() => setActiveTab(tab)} onClose={() => closeTab(tab)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Tab({ id, active, onSelect, onClose }: { id: FileId; active: boolean; onSelect: () => void; onClose: () => void }) {
  const meta = fileMeta[id];
  const Icon = meta.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.14 }}
      className={cn(
        "relative group flex items-center gap-2 h-9 pl-3 pr-2 text-[12.5px] border-r border-border cursor-pointer select-none whitespace-nowrap",
        active
          ? "bg-[var(--color-tab-active)] text-foreground"
          : "bg-[var(--color-tab-inactive)] text-muted-foreground hover:text-foreground",
      )}
      onClick={onSelect}
    >
      {active && (
        <motion.span
          layoutId="active-tab-indicator"
          className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--color-primary)]"
        />
      )}
      <Icon className={cn("h-3.5 w-3.5", meta.color)} />
      <span>{meta.shortName}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="h-5 w-5 grid place-items-center rounded-sm opacity-0 group-hover:opacity-100 hover:bg-accent transition-opacity"
        aria-label={`Close ${meta.shortName}`}
      >
        <X className="h-3 w-3" />
      </button>
    </motion.div>
  );
}
