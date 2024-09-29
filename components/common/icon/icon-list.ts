import {
  AlertCircle,
  Building2,
  Eye,
  Pencil,
  UserRound,
  Users,
  WalletMinimal,
} from 'lucide-react';

export const ICONS = {
  'alert-circle': AlertCircle,
  'building-2': Building2,
  eye: Eye,
  pencil: Pencil,
  users: Users,
  'user-round': UserRound,
  'wallet-minimal': WalletMinimal,
} as const;

export type IconName = keyof typeof ICONS;
