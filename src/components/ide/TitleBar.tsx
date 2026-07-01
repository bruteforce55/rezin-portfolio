import { motion } from "motion/react";
import { Github, Linkedin, Download, Moon, Sun, Code2 } from "lucide-react";
import { useState } from "react";
import { useGeoContact } from "@/hooks/use-geo-contact";

export function TitleBar() {
  const [dark, setDark] = useState(true);
  const geo = useGeoContact();
  return (
    <div className="h-9 shrink-0 bg-[var(--color-titlebar)] border-b border-border flex items-center justify-between px-3 select-none">
      {/* left: traffic lights + logo */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border">
          <div className="grid place-items-center h-5 w-5 rounded-sm bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
            <Code2 className="h-3.5 w-3.5" />
          </div>
          <span className="text-[12.5px] font-medium tracking-tight">rezin.portfolio</span>
        </div>
      </div>

      {/* center: workspace */}
      <div className="hidden md:flex items-center gap-2 text-[12px] text-muted-foreground bg-[var(--color-editor)] border border-border rounded-md px-3 py-0.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-green)]" />
        portfolio — Rezin Muhammed
      </div>

      {/* right: actions */}
      <div className="flex items-center gap-1">
        <IconBtn label="Theme" onClick={() => setDark((d) => !d)}>
          {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </IconBtn>
        {/* <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex h-7 px-2 items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
        >
          <Github className="h-3.5 w-3.5" /> GitHub
        </a> */}
        <a
          href="https://www.linkedin.com/in/rezin-muhammed"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex h-7 px-2 items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
        >
          <Linkedin className="h-3.5 w-3.5" /> LinkedIn
        </a>
        <a
          href={geo.loading ? "#" : geo.resumeFile}
          download={geo.resumeName}
          className="h-7 px-2.5 ml-1 flex items-center gap-1.5 text-[12px] font-medium rounded-md bg-[var(--color-primary)] text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Download className="h-3.5 w-3.5" /> Resume
        </a>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      aria-label={label}
      className="h-7 w-7 grid place-items-center text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
    >
      {children}
    </motion.button>
  );
}
