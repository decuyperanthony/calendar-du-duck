import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { IconName } from "./icon-list";

import { ICONS } from "./icon-list";

export const iconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
} as const;
export type IconSize = keyof typeof iconSizes;

type IconProps = ComponentPropsWithoutRef<"svg"> & {
  name: IconName;
  size?: IconSize;
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ className, name, size = "sm", ...props }, ref) => {
    const IconComponent = ICONS[name];

    return (
      <IconComponent
        ref={ref}
        aria-hidden
        className={cn("shrink-0", className)}
        focusable={false}
        size={iconSizes[size]}
        {...props}
      />
    );
  }
);
Icon.displayName = "Icon";
