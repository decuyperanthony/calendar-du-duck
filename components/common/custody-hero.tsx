"use client";

import { cn } from "@/lib/utils";
import { Icon } from "./icon";

type CustodyHeroProps = {
  name: string;
  weekLabel: string;
  variant: "anthony" | "flora";
};

export const CustodyHero = ({ name, weekLabel, variant }: CustodyHeroProps) => {
  const isAnthony = variant === "anthony";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl p-6 md:p-8",
        "border transition-all duration-500",
        isAnthony
          ? "bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-primary/30"
          : "bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border-accent/30"
      )}
    >
      {/* Background glow */}
      <div
        className={cn(
          "absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl opacity-30",
          isAnthony ? "bg-primary" : "bg-accent"
        )}
      />

      <div className="relative flex flex-col items-center text-center gap-4">
        {/* Icon */}
        <div
          className={cn(
            "flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl",
            isAnthony
              ? "bg-primary/20 text-primary"
              : "bg-accent/20 text-accent"
          )}
        >
          <Icon name="calendar-check" size="xl" />
        </div>

        {/* Week type */}
        <p className="text-sm uppercase tracking-widest text-white/60 font-medium">
          {weekLabel}
        </p>

        {/* Name - THE HERO */}
        <h1
          className={cn(
            "text-4xl md:text-6xl font-bold tracking-tight",
            isAnthony ? "text-primary" : "text-accent"
          )}
        >
          {name}
        </h1>

        {/* Subtitle */}
        <p className="text-white/50 text-sm">
          a la garde cette semaine
        </p>
      </div>
    </div>
  );
};
