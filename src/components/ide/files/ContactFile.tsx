import { useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Check, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { CodeBlock, K, S, C, P, V, O, F } from "../syntax";
import { useGeoContact } from "@/hooks/use-geo-contact";

export function ContactFile() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const geo = useGeoContact();

  return (
    <div className="px-8 py-8 max-w-5xl mx-auto">
      <CodeBlock>
        {[
          <><C>{`// contact.tsx — say hello`}</C></>,
          <><K>import</K> {"{"} <V>Contact</V> {"}"} <K>from</K> <S>"@/portfolio"</S>;</>,
          <></>,
          <><K>export default function</K> <F>Page</F>() {"{"}</>,
          <>{"  "}<K>return</K> <O>&lt;</O><V>Contact</V> <P>email</P><O>=</O><S>"rezin555@gmail.com"</S> <O>/&gt;</O>;</>,
          <>{"}"}</>,
        ]}
      </CodeBlock>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold tracking-tight mb-3">Contact info</h2>
          {[
            { icon: Mail, label: "Email", value: "rezin555@gmail.com", href: "mailto:rezin555@gmail.com" },
            { icon: Phone, label: "Phone", value: geo.loading ? "…" : geo.phone, href: geo.loading ? "#" : geo.phoneHref },
            { icon: Linkedin, label: "LinkedIn", value: "/in/rezin-muhammed", href: "https://www.linkedin.com/in/rezin-muhammed" },
            // { icon: Github, label: "GitHub", value: "@rezinmuhammed", href: "https://github.com" },
            { icon: MapPin, label: "Location", value: geo.loading ? "…" : geo.location, href: "#" },
          ].map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg border border-border bg-[var(--color-editor)] p-3 hover:border-[var(--color-primary)]/40 transition-colors"
            >
              <div className="grid place-items-center h-9 w-9 rounded-md bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
                <div className="text-[13.5px] font-mono">{value}</div>
              </div>
            </a>
          ))}
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setSending(true);
            setError(null);
            setSent(false);

            try {
              const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  service_id: "service_zywxx69",
                  template_id: "template_thdyz66",
                  user_id: "rs6inG-PmtsOP9evc",
                  template_params: {
                    name: form.name,
                    email: form.email,
                    message: form.message,
                  },
                }),
              });

              if (response.ok) {
                setSent(true);
                setForm({ name: "", email: "", message: "" });
                setTimeout(() => setSent(false), 5000);
              } else {
                const errText = await response.text();
                setError(errText || "Failed to send message. Please try again.");
              }
            } catch (err: any) {
              setError(err.message || "An unexpected error occurred.");
            } finally {
              setSending(false);
            }
          }}
          className="rounded-xl border border-border bg-[var(--color-editor)] p-5"
        >
          <h2 className="text-lg font-semibold tracking-tight">Send a message</h2>
          <p className="text-[12.5px] text-muted-foreground mt-1">
            This form sends a message directly to my inbox via EmailJS.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Jane Doe" />
            <Field label="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="jane@company.com" type="email" />
          </div>
          <div className="mt-3">
            <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-mono mb-1">
              message
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              required
              placeholder="Tell me about the role or the problem you're solving..."
              className="w-full rounded-md bg-[var(--color-tab-inactive)] border border-border px-3 py-2 text-[13px] font-mono outline-none focus:border-[var(--color-primary)] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="mt-4 inline-flex items-center gap-2 h-10 px-4 rounded-md bg-[var(--color-primary)] text-primary-foreground text-[13px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending...
              </>
            ) : sent ? (
              <>
                <Check className="h-4 w-4" /> Sent
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Send message
              </>
            )}
          </button>
          {sent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-[12px] text-[var(--color-accent-green)] font-mono"
            >
              ✓ Thanks — I'll get back to you as soon as possible.
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-[12px] text-[var(--color-accent-pink)] font-mono"
            >
              ✗ Error: {error}
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-mono mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        required
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md bg-[var(--color-tab-inactive)] border border-border px-3 py-2 text-[13px] font-mono outline-none focus:border-[var(--color-primary)]"
      />
    </div>
  );
}
