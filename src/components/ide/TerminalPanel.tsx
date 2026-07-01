import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useIDE } from "@/lib/ide-store";
import { TerminalFile } from "./files/TerminalFile";

export function TerminalPanel() {
  const { terminalOpen, toggleTerminal } = useIDE();
  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 280 }}
          exit={{ height: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="shrink-0 border-t border-border bg-[var(--color-editor)] overflow-hidden"
        >
          <div className="h-8 flex items-center justify-between px-3 border-b border-border">
            <div className="flex items-center gap-2 text-[12px]">
              <span className="px-2 py-0.5 rounded-sm bg-[var(--color-tab-active)] border-t-2 border-[var(--color-primary)]">
                TERMINAL
              </span>
              <span className="text-muted-foreground">zsh — portfolio</span>
            </div>
            <button
              onClick={toggleTerminal}
              className="h-6 w-6 grid place-items-center text-muted-foreground hover:text-foreground hover:bg-accent rounded"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="h-[calc(100%-2rem)]">
            <TerminalFile embedded />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
