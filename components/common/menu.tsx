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
] as const;

export const Menu = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto p-4">
        <NavigationMenu>
          <NavigationMenuList className="flex justify-center space-x-6">
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "text-white hover:text-gray-300 p-2 rounded flex flex-col items-center",
                    pathname === item.path ? "bg-gray-700" : ""
                  )}
                >
                  <Icon name={item.icon} className="w-6 h-6 md:hidden" />

                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};
