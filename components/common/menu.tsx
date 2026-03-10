"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { usePathname } from "next/navigation";
import { Icon } from "./icon";
import { GlassBar } from "../ui/glass-bar";

export const menuItems = [
  { label: "Semaines", path: "/semaines", icon: "calendar" },
  { label: "Sobriété", path: "/sobriete", icon: "heart" },
  { label: "Activites", path: "/activites", icon: "trophy" },
  { label: "Passation", path: "/passation", icon: "repeat" },
  { label: "Heure d'arrivee", path: "/heure-arrivee", icon: "timer" },
  { label: "Plannings", path: "/planning", icon: "clipboard" },
] as const;

export const Menu = () => {
  const pathname = usePathname();

  return (
    <GlassBar position="top" className="hidden md:block">
      <div className="px-4 py-3">
        <NavigationMenu className="mx-auto max-w-4xl">
          <NavigationMenuList className="gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <NavigationMenuItem key={item.path}>
                  <Link
                    href={item.path}
                    className={cn(
                      "group relative flex flex-col items-center gap-1.5 rounded-xl px-3 py-2.5 md:px-5 text-sm font-medium transition-all duration-300",
                      isActive
                        ? "text-primary bg-white/10"
                        : "text-white hover:bg-white/5"
                    )}
                    aria-selected={isActive}
                  >
                    <Icon
                      name={item.icon}
                      size="md"
                      weight={isActive ? "fill" : "regular"}
                      className={cn(
                        "transition-all duration-300",
                        isActive
                          ? "text-primary scale-110"
                          : "text-white group-hover:scale-105"
                      )}
                    />
                    <span
                      className={cn(
                        "hidden md:block text-[10px] uppercase tracking-widest font-semibold transition-all duration-300",
                        isActive ? "text-primary" : "text-white"
                      )}
                    >
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full transition-all duration-300",
                        isActive
                          ? "w-8 opacity-100 bg-primary"
                          : "w-4 opacity-60 bg-white group-hover:opacity-100"
                      )}
                    />
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </GlassBar>
  );
};
