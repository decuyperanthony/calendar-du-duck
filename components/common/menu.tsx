"use client";

import { cn } from "@/lib/utils";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { usePathname } from "next/navigation";

export const menuItems = [
  { label: "Semaines", path: "/semaines" },
  { label: "Emplois du temps", path: "/planning" },
  { label: "Activités", path: "/activites" },
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
                    "text-white hover:text-gray-300 p-2 rounded",
                    pathname === item.path ? "bg-gray-700" : ""
                  )}
                >
                  {item.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};
