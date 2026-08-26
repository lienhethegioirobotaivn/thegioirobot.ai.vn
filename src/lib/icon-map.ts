import {
  Brain,
  Building2,
  Eye,
  GraduationCap,
  HandHeart,
  Heart,
  Languages,
  type LucideIcon,
  MessageCircle,
  Navigation,
  TrendingUp,
  Users,
  Warehouse,
} from "lucide-react";

export const iconMap = {
  Heart,
  TrendingUp,
  MessageCircle,
  Users,
  HandHeart,
  GraduationCap,
  Warehouse,
  Building2,
  Languages,
  Eye,
  Brain,
  Navigation,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export const iconOptions = Object.keys(iconMap) as IconName[];

export function getIcon(name: string): LucideIcon {
  return iconMap[name as IconName] ?? Heart;
}
