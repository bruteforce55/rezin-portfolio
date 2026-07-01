import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type FileId =
  | "README.md"
  | "about.ts"
  | "experience.ts"
  | "skills.json"
  | "architecture.md"
  | "achievements.md"
  | "contact.tsx"
  | "terminal.sh"
  | "projects/HumanFollowingTrolley.md"
  | "projects/SPACE.md"
  | "projects/EnterpriseLMS.md"
  | "projects/MediaLibrary.md"
  | "projects/LiveKitSDK.md"
  | "projects/SocketFramework.md"
  | "projects/AngryBirdsClone.md";

export type ActivityView =
  | "explorer"
  | "search"
  | "git"
  | "projects"
  | "terminal"
  | "contact"
  | "settings";

interface IDEContextValue {
  openTabs: FileId[];
  activeTab: FileId;
  activity: ActivityView;
  paletteOpen: boolean;
  terminalOpen: boolean;
  openFile: (f: FileId) => void;
  closeTab: (f: FileId) => void;
  setActiveTab: (f: FileId) => void;
  setActivity: (a: ActivityView) => void;
  setPaletteOpen: (b: boolean) => void;
  toggleTerminal: () => void;
}

const IDEContext = createContext<IDEContextValue | null>(null);

export function IDEProvider({ children }: { children: ReactNode }) {
  const [openTabs, setOpenTabs] = useState<FileId[]>(["README.md", "about.ts"]);
  const [activeTab, setActiveTab] = useState<FileId>("README.md");
  const [activity, setActivity] = useState<ActivityView>("explorer");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const openFile = useCallback((f: FileId) => {
    setOpenTabs((tabs) => (tabs.includes(f) ? tabs : [...tabs, f]));
    setActiveTab(f);
  }, []);

  const closeTab = useCallback((f: FileId) => {
    setOpenTabs((tabs) => {
      const remaining = tabs.filter((t) => t !== f);
      if (remaining.length === 0) {
        setActiveTab("README.md");
        return ["README.md"];
      }
      setActiveTab((current) => {
        if (current !== f) return current;
        const idx = tabs.indexOf(f);
        return remaining[Math.max(0, idx - 1)] ?? remaining[0];
      });
      return remaining;
    });
  }, []);

  const toggleTerminal = useCallback(() => setTerminalOpen((b) => !b), []);

  return (
    <IDEContext.Provider
      value={{
        openTabs,
        activeTab,
        activity,
        paletteOpen,
        terminalOpen,
        openFile,
        closeTab,
        setActiveTab,
        setActivity,
        setPaletteOpen,
        toggleTerminal,
      }}
    >
      {children}
    </IDEContext.Provider>
  );
}

export function useIDE() {
  const ctx = useContext(IDEContext);
  if (!ctx) throw new Error("useIDE must be used inside IDEProvider");
  return ctx;
}
