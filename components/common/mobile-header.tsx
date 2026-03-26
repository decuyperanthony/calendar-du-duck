"use client";

import { GlassBar } from "../ui/glass-bar";
import { images } from "@/assets/image";
import Image from "next/image";

export const MobileHeader = () => {
  return (
    <GlassBar position="top" className="md:hidden">
      <div className="flex items-center gap-2 px-4 py-2">
        <Image
          src={images["leo-lucky-logo"]}
          alt="Calendar du Duck"
          width={80}
          height={32}
          className="h-8 w-auto"
        />
        <span className="text-base font-semibold text-white">Calendar du Duck</span>
      </div>
    </GlassBar>
  );
};
