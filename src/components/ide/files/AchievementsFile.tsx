import { Trophy, ExternalLink, Download } from "lucide-react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const items = [
  { 
    emoji: "🏆", 
    title: "Rising Star Award", 
    body: "Recognized at iLearningEngines for exceptional delivery and ownership.",
    hasCertificate: true
  },
  { emoji: "🚀", title: "50+ REST APIs", body: "Designed and shipped, powering enterprise learning workflows." },
  { emoji: "📦", title: "18+ Enterprise Features", body: "Delivered end-to-end across multiple product surfaces." },
  { emoji: "⚡", title: "99% → 65% RDS CPU", body: "Database optimization that reduced cost and improved tail latency." },
  { emoji: "🐛", title: "60+ Bugs Resolved", body: "Root-caused and fixed across legacy and greenfield modules." },
  { emoji: "🎥", title: "Reusable Video SDK", body: "LiveKit-based Video-as-a-Service shipped across product lines." },
  { emoji: "📡", title: "Real-time Streaming Platform", body: "Socket.IO exam streaming used in production at scale." },
];

export function AchievementsFile() {
  return (
    <div className="px-8 py-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 text-[var(--color-syntax-keyword)] font-mono text-[13px]">
        <Trophy className="h-4 w-4 text-[var(--color-accent-amber)]" /> # achievements.md
      </div>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Highlights from the field</h1>

      <div className="mt-7 grid sm:grid-cols-2 gap-3">
        {items.map((a, i) => {
          const cardContent = (
            <div className="flex items-start gap-3 w-full text-left">
              <div className="text-2xl leading-none">{a.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-semibold text-[14px] truncate">{a.title}</div>
                  {a.hasCertificate && (
                    <span className="text-[11px] text-[var(--color-primary)] flex items-center gap-1 shrink-0 font-mono hover:underline">
                      view <ExternalLink className="h-3 w-3" />
                    </span>
                  )}
                </div>
                <div className="text-[12.5px] text-muted-foreground mt-1">{a.body}</div>
              </div>
            </div>
          );

          const cardWrapper = (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`rounded-lg border border-border bg-[var(--color-editor)] p-4 hover:border-[var(--color-primary)]/40 transition-colors w-full ${
                a.hasCertificate ? "cursor-pointer hover:bg-[var(--color-tab-inactive)]/50" : ""
              }`}
            >
              {cardContent}
            </motion.div>
          );

          if (a.hasCertificate) {
            return (
              <Dialog key={a.title}>
                <DialogTrigger asChild>
                  {cardWrapper}
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-[var(--color-editor)] border border-border text-foreground">
                  <DialogHeader className="flex flex-row items-center justify-between pr-6">
                    <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-[var(--color-accent-amber)]" />
                      Rising Star Award Certificate
                    </DialogTitle>
                    <a
                      href="/iLE_Certificate.jpeg"
                      download="iLE_Certificate.jpeg"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-[var(--color-primary)] text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      <Download className="h-3.5 w-3.5" /> Download
                    </a>
                  </DialogHeader>
                  <div className="mt-2 rounded-lg overflow-hidden border border-border bg-black/40 flex items-center justify-center p-2">
                    <img
                      src="/iLE_Certificate.jpeg"
                      alt="iLearningEngines Rising Star Award Certificate"
                      className="max-h-[60vh] w-auto object-contain rounded-md"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            );
          }

          return cardWrapper;
        })}
      </div>
    </div>
  );
}

