import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "mt-1 flex w-full rounded-lg border border-[#DCD8D0] bg-white px-3 py-2 text-sm text-[#10233D]",
        "placeholder:text-[#A8A398]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8863B] focus-visible:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
