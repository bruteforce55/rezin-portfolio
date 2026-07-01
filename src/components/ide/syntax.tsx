import type { ReactNode } from "react";

/* Syntax-highlighted token primitives — used to compose code blocks */
export const K = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--color-syntax-keyword)]">{children}</span>
);
export const S = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--color-syntax-string)]">{children}</span>
);
export const F = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--color-syntax-function)]">{children}</span>
);
export const V = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--color-syntax-variable)]">{children}</span>
);
export const C = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--color-syntax-comment)] italic">{children}</span>
);
export const N = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--color-syntax-number)]">{children}</span>
);
export const T = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--color-syntax-type)]">{children}</span>
);
export const P = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--color-syntax-property)]">{children}</span>
);
export const O = ({ children }: { children: ReactNode }) => (
  <span className="text-[var(--color-syntax-operator)]">{children}</span>
);

export function CodeBlock({ children }: { children: ReactNode }) {
  // Wrap children which is an array of lines (strings or JSX)
  const lines = Array.isArray(children) ? children : [children];
  return (
    <pre className="font-mono text-[13.5px] leading-[1.7] overflow-x-auto scrollbar-ide">
      <code className="grid grid-cols-[auto_1fr] gap-x-5">
        {lines.map((line, i) => (
          <div key={i} className="contents">
            <span className="text-right text-[var(--color-line-number)] select-none pr-2 tabular-nums">
              {i + 1}
            </span>
            <span className="whitespace-pre">{line}</span>
          </div>
        ))}
      </code>
    </pre>
  );
}
