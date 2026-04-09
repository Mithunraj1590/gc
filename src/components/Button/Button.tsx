import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

const baseClasses =
  "font-home-banner-heading inline-flex cursor-pointer items-center justify-center font-semibold uppercase transition-all duration-[250ms] ease-[cubic-bezier(0.23_1_0.32_1)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45";

const variants = {
  /** Solid: foreground fill; hover → transparent bg, white label */
  primary:
    "border border-white bg-[var(--foreground)] text-[var(--background)] hover:bg-transparent hover:border-white hover:text-white active:bg-transparent active:text-white/90",
  /** Bordered transparent; hover → white fill, black label */
  secondary:
    "border border-white bg-transparent text-[var(--foreground)] hover:border-white hover:bg-white hover:text-black active:bg-neutral-200 active:text-black active:border-white",
  /** Strong border; hover matches bordered style (white fill, black text) */
  outline:
    "border-2 border-white bg-transparent text-[var(--foreground)] hover:border-white hover:bg-white hover:text-black active:bg-neutral-200 active:text-black active:border-white",
  /** Text-only with subtle hover surface */
  ghost:
    "border border-transparent bg-transparent text-[var(--foreground)] hover:bg-[color-mix(in_srgb,var(--foreground)_9%,transparent)] active:bg-[color-mix(in_srgb,var(--foreground)_14%,transparent)]",
} as const;

const sizes = {
  sm: "gap-1.5 px-4 py-2 text-[0.65rem] tracking-[0.1em]",
  md: "gap-2 px-8 py-[0.85rem] text-[0.72rem] tracking-[0.12em]",
  lg: "gap-2 px-10 py-3 text-sm tracking-[0.1em]",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    className = "",
    type = "button",
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
      {...props}
    />
  );
});
