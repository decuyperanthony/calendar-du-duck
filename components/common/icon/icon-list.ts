import { AlertCircle, Calendar, Clipboard, Trophy, Repeat } from "lucide-react";

export const ICONS = {
  "alert-circle": AlertCircle,
  calendar: Calendar,
  clipboard: Clipboard,
  trophy: Trophy,
  repeat: Repeat,
} as const;

export type IconName = keyof typeof ICONS;
