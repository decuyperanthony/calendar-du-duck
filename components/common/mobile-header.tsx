"use client";

import { GlassBar } from "../ui/glass-bar";

export const MobileHeader = () => {
  return (
    <GlassBar position="top" className="md:hidden">
      <div className="flex items-center px-4 py-3">
        <h1 className="text-lg font-semibold text-white">
          Leo & Lucky
        </h1>
      </div>
    </GlassBar>
  );
};
