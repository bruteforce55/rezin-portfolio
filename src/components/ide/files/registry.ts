import { FileCode2, FileJson, FileTerminal, FileText } from "lucide-react";
import type { FileId } from "@/lib/ide-store";
import type { ComponentType } from "react";

export interface FileMeta {
  shortName: string;
  path: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  language: string;
}

export const fileMeta: Record<FileId, FileMeta> = {
  "README.md": { shortName: "README.md", path: "portfolio/README.md", icon: FileText, color: "text-[var(--color-accent-blue)]", language: "Markdown" },
  "about.ts": { shortName: "about.ts", path: "portfolio/about.ts", icon: FileCode2, color: "text-[var(--color-accent-amber)]", language: "TypeScript" },
  "experience.ts": { shortName: "experience.ts", path: "portfolio/experience.ts", icon: FileCode2, color: "text-[var(--color-accent-amber)]", language: "TypeScript" },
  "skills.json": { shortName: "skills.json", path: "portfolio/skills.json", icon: FileJson, color: "text-[var(--color-accent-amber)]", language: "JSON" },
  "architecture.md": { shortName: "architecture.md", path: "portfolio/architecture.md", icon: FileText, color: "text-[var(--color-accent-blue)]", language: "Markdown" },
  "achievements.md": { shortName: "achievements.md", path: "portfolio/achievements.md", icon: FileText, color: "text-[var(--color-accent-blue)]", language: "Markdown" },
  "contact.tsx": { shortName: "contact.tsx", path: "portfolio/contact.tsx", icon: FileCode2, color: "text-[var(--color-accent-blue)]", language: "TypeScript JSX" },
  "terminal.sh": { shortName: "terminal.sh", path: "portfolio/terminal.sh", icon: FileTerminal, color: "text-[var(--color-accent-green)]", language: "Shell" },
  "projects/HumanFollowingTrolley.md": { shortName: "HumanFollowingTrolley.md", path: "portfolio/projects/HumanFollowingTrolley.md", icon: FileText, color: "text-[var(--color-accent-blue)]", language: "Markdown" },
  "projects/SPACE.md": { shortName: "SPACE.md", path: "portfolio/projects/SPACE.md", icon: FileText, color: "text-[var(--color-accent-blue)]", language: "Markdown" },
  "projects/EnterpriseLMS.md": { shortName: "EnterpriseLMS.md", path: "portfolio/projects/EnterpriseLMS.md", icon: FileText, color: "text-[var(--color-accent-blue)]", language: "Markdown" },
  "projects/MediaLibrary.md": { shortName: "MediaLibrary.md", path: "portfolio/projects/MediaLibrary.md", icon: FileText, color: "text-[var(--color-accent-blue)]", language: "Markdown" },
  "projects/LiveKitSDK.md": { shortName: "LiveKitSDK.md", path: "portfolio/projects/LiveKitSDK.md", icon: FileText, color: "text-[var(--color-accent-blue)]", language: "Markdown" },
  "projects/SocketFramework.md": { shortName: "SocketFramework.md", path: "portfolio/projects/SocketFramework.md", icon: FileText, color: "text-[var(--color-accent-blue)]", language: "Markdown" },
  "projects/AngryBirdsClone.md": { shortName: "AngryBirdsClone.md", path: "portfolio/projects/AngryBirdsClone.md", icon: FileText, color: "text-[var(--color-accent-blue)]", language: "Markdown" },
};

export const projectsList: { id: FileId; name: string; tagline: string }[] = [
  { id: "projects/HumanFollowingTrolley.md", name: "HumanFollowingTrolley", tagline: "Autonomous IoT companion robot" },
  { id: "projects/SPACE.md", name: "SPACE", tagline: "Real-time exam streaming platform" },
  { id: "projects/EnterpriseLMS.md", name: "EnterpriseLMS", tagline: "Scalable corporate learning system" },
  { id: "projects/MediaLibrary.md", name: "MediaLibrary", tagline: "Asset library with smart processing" },
  { id: "projects/LiveKitSDK.md", name: "LiveKitSDK", tagline: "Reusable Video-as-a-Service SDK" },
  { id: "projects/SocketFramework.md", name: "SocketFramework", tagline: "Distributed Socket.IO framework" },
  { id: "projects/AngryBirdsClone.md", name: "AngryBirdsClone", tagline: "2D physics engine exploration" },
];
