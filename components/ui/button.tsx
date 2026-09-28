import * as React from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8863B] focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && "bg-[#10233D] text-white hover:bg-[#1C3A5E]",
          variant === "outline" && "border border-[#DCD8D0] bg-white text-[#10233D] hover:border-[#B8A488]",
          variant === "ghost" && "text-[#5B6472] hover:bg-[#F1EFEA] hover:text-[#10233D]",
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-8 px-3 text-xs",
          size === "lg" && "h-11 px-6",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
