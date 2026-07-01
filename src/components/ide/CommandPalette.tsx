import { useEffect } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useIDE, type FileId } from "@/lib/ide-store";
import { fileMeta, projectsList } from "./files/registry";
import { FileCode2, TerminalSquare, Github, Linkedin, Download, Mail } from "lucide-react";
import { useGeoContact } from "@/hooks/use-geo-contact";

const files: FileId[] = [
  "README.md",
  "about.ts",
  "experience.ts",
  "skills.json",
  "architecture.md",
  "achievements.md",
  "contact.tsx",
  "terminal.sh",
];

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen, openFile, toggleTerminal } = useIDE();
  const geo = useGeoContact();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        toggleTerminal();
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, setPaletteOpen, toggleTerminal]);

  const run = (fn: () => void) => {
    fn();
    setPaletteOpen(false);
  };

  return (
    <CommandDialog open={paletteOpen} onOpenChange={setPaletteOpen}>
      <CommandInput placeholder="Type a file, command, or search..." />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Files">
          {files.map((f) => {
            const m = fileMeta[f];
            return (
              <CommandItem key={f} onSelect={() => run(() => openFile(f))}>
                <FileCode2 className="h-4 w-4" />
                <span>{m.shortName}</span>
                <span className="ml-auto text-[11px] text-muted-foreground">{m.path}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Projects">
          {projectsList.map((p) => (
            <CommandItem key={p.id} onSelect={() => run(() => openFile(p.id))}>
              <FileCode2 className="h-4 w-4" />
              <span>{p.name}</span>
              <span className="ml-auto text-[11px] text-muted-foreground">{p.tagline}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => run(() => toggleTerminal())}>
            <TerminalSquare className="h-4 w-4" /> Toggle Terminal
            <span className="ml-auto text-[11px] text-muted-foreground">⌘J</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => openFile("contact.tsx"))}>
            <Mail className="h-4 w-4" /> Contact Me
          </CommandItem>
          {/* <CommandItem onSelect={() => run(() => window.open("https://github.com", "_blank"))}>
            <Github className="h-4 w-4" /> Open GitHub
          </CommandItem> */}
          <CommandItem onSelect={() => run(() => window.open("https://www.linkedin.com/in/rezin-muhammed", "_blank"))}>
            <Linkedin className="h-4 w-4" /> Open LinkedIn
          </CommandItem>
          <CommandItem
            onSelect={() => {
              if (!geo.loading) {
                const a = document.createElement("a");
                a.href = geo.resumeFile;
                a.download = geo.resumeName;
                a.click();
              }
              setPaletteOpen(false);
            }}
          >
            <Download className="h-4 w-4" /> Download Resume
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
