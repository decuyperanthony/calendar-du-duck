"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icon";

const navItems = [
  { label: "Semaines", path: "/semaines", icon: "calendar" },
  { label: "Activites", path: "/activites", icon: "trophy" },
  { label: "Passation", path: "/passation", icon: "repeat" },
  { label: "Arrivee", path: "/heure-arrivee", icon: "timer" },
  { label: "Plannings", path: "/planning", icon: "clipboard" },
] as const;

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe md:hidden">
      <div className="px-3 pb-2">
        <nav className="liquid-glass flex items-center justify-around rounded-2xl px-2 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-300",
                  isActive
                    ? "text-primary"
                    : "text-white/50 hover:text-white/80"
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-white/10" />
                )}
                <Icon
                  name={item.icon}
                  size="md"
                  weight={isActive ? "fill" : "regular"}
                  className={cn(
                    "relative z-10 transition-all duration-300",
                    isActive && "scale-110 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]"
                  )}
                />
                <span className={cn(
                  "relative z-10 text-[10px] font-medium transition-all duration-300",
                  isActive && "font-semibold"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
