import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export function Button({ className = "", variant = "default", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2";
  const styles =
    variant === "outline"
      ? "border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--fg))] hover:bg-[rgb(var(--bg))] hover:border-[rgb(var(--muted))]"
      : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}



