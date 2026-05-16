import type { ButtonHTMLAttributes } from "react";

interface VictoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function VictoButton({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: VictoButtonProps): JSX.Element {
  const baseStyles =
    "font-medium rounded-md transition-colors focus:outline-none";

  const variantStyles: Record<string, string> = {
    primary: "bg-accent hover:bg-accent-dark text-white",
    secondary: "bg-neutral-800 hover:bg-neutral-700 text-white",
    ghost: "text-accent hover:bg-neutral-900",
  };

  const sizeStyles: Record<string, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
