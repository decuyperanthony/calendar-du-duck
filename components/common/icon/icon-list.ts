import {
  AlertCircle,
  Calendar,
  CalendarCheck,
  CheckCircle,
  Clipboard,
  Info,
  Repeat,
  TimerIcon,
  Trophy,
  Dribbble,
  CircleDot,
  Clock,
  MapPin,
} from "lucide-react";

export const ICONS = {
  "alert-circle": AlertCircle,
  calendar: Calendar,
  "calendar-check": CalendarCheck,
  "check-circle": CheckCircle,
  clipboard: Clipboard,
  info: Info,
  repeat: Repeat,
  timer: TimerIcon,
  trophy: Trophy,
  football: Dribbble,
  "ping-pong": CircleDot,
  clock: Clock,
  location: MapPin,
} as const;

export type IconName = keyof typeof ICONS;
