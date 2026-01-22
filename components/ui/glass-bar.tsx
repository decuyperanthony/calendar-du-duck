import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type GlassBarProps = {
  children: ReactNode;
  position: "top" | "bottom";
  className?: string;
};

export const GlassBar = ({ children, position, className }: GlassBarProps) => {
  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-50 glass-dark",
        position === "top" && "top-0 pt-safe",
        position === "bottom" && "bottom-0 pb-safe",
        className
      )}
    >
      {children}
    </div>
  );
};
