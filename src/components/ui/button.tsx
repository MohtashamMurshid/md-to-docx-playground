import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export function Button({ className = "", variant = "default", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2";
  const styles =
    variant === "outline"
      ? "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50"
      : "bg-neutral-900 text-white hover:bg-neutral-800";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}



