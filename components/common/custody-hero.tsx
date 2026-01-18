"use client";

import { images } from "@/assets/image";
import { cn } from "@/lib/utils";
import Image from "next/image";

type CustodyHeroProps = {
  name: string;
  weekLabel: string;
  subtitle: string;
  variant: "anthony" | "flora";
};

export const CustodyHero = ({ name, weekLabel, subtitle, variant }: CustodyHeroProps) => {
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
        {/* Avatar */}
        <div
          className={cn(
            "relative h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden",
            "ring-4 shadow-xl",
            isAnthony
              ? "ring-primary/50 shadow-primary/20"
              : "ring-accent/50 shadow-accent/20"
          )}
        >
          <Image
            src={images[variant]}
            alt={name}
            fill
            className="object-cover"
            priority
          />
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
          {subtitle}
        </p>
      </div>
    </div>
  );
};
