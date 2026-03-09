import type { ButtonHTMLAttributes } from "react";
type Variant = "gold" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const base =
  "inline-flex items-center justify-center font-ui font-semibold tracking-wide transition-all duration-200 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-dark hover:bg-gold-l active:bg-gold-d",
  outline: "border border-gold text-gold hover:bg-gold/10",
  ghost: "text-text2 hover:text-gold hover:bg-dark2",
  danger: "border border-red text-red hover:bg-red/10",
};
const sizes: Record<Size, string> = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-8 py-3",
};
export default function Button({
  variant = "gold",
  size = "md",
  loading,
  children,
  className = "",
  ...props
}: Props) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <span className="animate-spin mr-2">&#9696;</span> : null}
      {children}
    </button>
  );
}
