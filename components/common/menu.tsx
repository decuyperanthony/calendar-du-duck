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
    <header className="gradient-primary text-white">
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
                      "relative flex flex-col items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                      "hover:bg-white/15",
                      isActive && "bg-white/20 shadow-lg"
                    )}
                    aria-selected={isActive}
                  >
                    <Icon
                      name={item.icon}
                      className={cn(
                        "h-5 w-5 md:hidden transition-transform duration-200",
                        isActive && "scale-110"
                      )}
                    />
                    <span className="hidden md:inline">{item.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-white/80 md:block hidden" />
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
