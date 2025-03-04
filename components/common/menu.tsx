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

type Props = {
  passationEnabled: boolean;
};

export const Menu = ({ passationEnabled }: Props) => {
  const pathname = usePathname();

  const menuItems = [
    { label: "Semaines", path: "/semaines", icon: "calendar", enabled: true },
    { label: "Plannings", path: "/planning", icon: "clipboard", enabled: true },
    { label: "Activités", path: "/activites", icon: "trophy", enabled: true },
    {
      label: "Passation",
      path: "/passation",
      icon: "repeat",
      enabled: passationEnabled,
    },
    {
      label: "Heure d'arrivée",
      path: "/heure-arrivee",
      icon: "timer",
      enabled: true,
    },
  ] as const;

  return (
    <div className="bg-gray-800 text-white p-4">
      <NavigationMenu className="m-auto">
        <NavigationMenuList className="gap-2">
          {menuItems
            .filter((item) => item.enabled)
            .map((item) => (
              <NavigationMenuItem key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "text-white hover:text-gray-300 py-2 rounded flex flex-col items-center px-4",
                    pathname === item.path ? "bg-gray-700" : ""
                  )}
                  aria-selected={pathname === item.path}
                >
                  <Icon name={item.icon} className="w-6 h-6 md:hidden" />

                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              </NavigationMenuItem>
            ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
