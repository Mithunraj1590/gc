import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

const baseClasses =
  "font-home-banner-heading inline-flex cursor-pointer items-center justify-center font-semibold uppercase transition-all duration-[250ms] ease-[cubic-bezier(0.23_1_0.32_1)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45";

const variants = {
  /** Solid: white bg, black text; hover → transparent bg, white label */
  primary:
    "border border-white bg-white text-black hover:bg-transparent hover:text-white active:bg-transparent active:opacity-80",
  /** Bordered white; hover → white fill, black label */
  secondary:
    "border border-white bg-transparent text-white hover:bg-white hover:text-black active:bg-neutral-200",
  /** Strong border; hover matches bordered style */
  outline:
    "border-2 border-white bg-transparent text-white hover:bg-white hover:text-black active:bg-neutral-200",
  /** Text-only with subtle hover surface */
  ghost:
    "border border-transparent bg-transparent text-white hover:bg-white/5 active:bg-white/10",
  /** Solid orange with soft shadow (used for CTAs) */
  accent:
    "bg-[#FF5033] text-white shadow-[0_0_20px_rgba(255,80,51,0.2)] hover:bg-[#ff7a59] rounded-xl",
  /** Solid white with soft shadow */
  accentWhite:
    "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-neutral-100 rounded-xl",
  /** Solid black with white text; hover -> transparent with black text */
  dark:
    "border border-black bg-black text-white hover:bg-transparent hover:text-black active:bg-black/5 ",
} as const;

const sizes = {
  sm: "gap-1.5 px-4 py-2 text-[0.65rem] tracking-[0.1em]",
  md: "gap-2 px-8 py-[0.85rem] text-[0.72rem] tracking-[0.12em]",
  lg: "gap-2 px-10 py-3 text-sm tracking-[0.1em]",
  icon: "w-14 h-14 p-0 shrink-0",
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
