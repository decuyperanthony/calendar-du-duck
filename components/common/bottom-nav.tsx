"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icon";
import { GlassBar } from "../ui/glass-bar";

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
    <GlassBar position="bottom" className="md:hidden">
      <nav className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-300",
                isActive
                  ? "text-primary"
                  : "text-white/60 hover:text-white"
              )}
            >
              <Icon
                name={item.icon}
                size="md"
                weight={isActive ? "fill" : "regular"}
                className={cn(
                  "transition-transform duration-300",
                  isActive && "scale-110"
                )}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </GlassBar>
  );
};
