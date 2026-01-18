import {
  WarningCircle,
  CalendarBlank,
  CalendarCheck,
  CheckCircle,
  ClipboardText,
  Info,
  ArrowsClockwise,
  Timer,
  Trophy,
  SoccerBall,
  PingPong,
  Clock,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";

export const ICONS = {
  "alert-circle": WarningCircle,
  calendar: CalendarBlank,
  "calendar-check": CalendarCheck,
  "check-circle": CheckCircle,
  clipboard: ClipboardText,
  info: Info,
  repeat: ArrowsClockwise,
  timer: Timer,
  trophy: Trophy,
  football: SoccerBall,
  "ping-pong": PingPong,
  clock: Clock,
  location: MapPin,
} as const;

export type IconName = keyof typeof ICONS;
