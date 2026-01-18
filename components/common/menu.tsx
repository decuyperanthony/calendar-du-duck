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

export const menuItems = [
  { label: "Semaines", path: "/semaines", icon: "calendar" },
  { label: "Plannings", path: "/planning", icon: "clipboard" },
  { label: "Activités", path: "/activites", icon: "trophy" },
  { label: "Passation", path: "/passation", icon: "repeat" },
  { label: "Heure d'arrivée", path: "/heure-arrivee", icon: "timer" },
] as const;

export const Menu = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 glass-dark">
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
                      "relative flex flex-col items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300",
                      "text-white/70 hover:text-white hover:bg-white/10",
                      isActive && "text-primary bg-white/10"
                    )}
                    aria-selected={isActive}
                  >
                    <Icon
                      name={item.icon}
                      className={cn(
                        "h-5 w-5 md:hidden transition-all duration-300",
                        isActive && "text-primary scale-110"
                      )}
                    />
                    <span className="hidden md:inline uppercase tracking-wider text-xs font-semibold">
                      {item.label}
                    </span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary hidden md:block" />
                    )}
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};
