import { createFileRoute } from "@tanstack/react-router";
import { IDEProvider } from "@/lib/ide-store";
import { TitleBar } from "@/components/ide/TitleBar";
import { ActivityBar } from "@/components/ide/ActivityBar";
import { SidebarPanel } from "@/components/ide/SidebarPanel";
import { TabBar } from "@/components/ide/TabBar";
import { Editor } from "@/components/ide/Editor";
import { StatusBar } from "@/components/ide/StatusBar";
import { TerminalPanel } from "@/components/ide/TerminalPanel";
import { CommandPalette } from "@/components/ide/CommandPalette";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rezin Muhammed — Full Stack Engineer · Portfolio" },
      {
        name: "description",
        content:
          "Full Stack Engineer with 4+ years building scalable enterprise systems with React, Node.js, TypeScript, Redis, PostgreSQL, and AWS. Explore projects, experience, and a working terminal — inside an IDE.",
      },
      { property: "og:title", content: "Rezin Muhammed — Full Stack Engineer" },
      { property: "og:description", content: "A portfolio built as a working IDE — projects, experience, skills, terminal." },
    ],
  }),
  component: IDEPage,
});

function IDEPage() {
  return (
    <IDEProvider>
      <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden dark">
        <TitleBar />
        <div className="flex-1 min-h-0 flex">
          <ActivityBar />
          <SidebarPanel />
          <div className="flex-1 min-w-0 flex flex-col">
            <TabBar />
            <Editor />
            <TerminalPanel />
          </div>
        </div>
        <StatusBar />
        <CommandPalette />
      </div>
    </IDEProvider>
  );
}
