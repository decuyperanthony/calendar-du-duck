import {
  AlertCircle,
  Calendar,
  Clipboard,
  Trophy,
  Repeat,
  TimerIcon,
} from "lucide-react";

export const ICONS = {
  "alert-circle": AlertCircle,
  calendar: Calendar,
  clipboard: Clipboard,
  trophy: Trophy,
  repeat: Repeat,
  timer: TimerIcon,
} as const;

export type IconName = keyof typeof ICONS;
