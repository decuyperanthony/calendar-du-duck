import { Badge, type BadgeProps } from "../ui/badge";
import { Card } from "../ui/card";
import { Icon } from "./icon";
import type { IconName } from "./icon/icon-list";

type ActivityCardProps = {
  activity: string;
  date: string;
};

type ActivityConfig = {
  variant: BadgeProps["variant"];
  icon: IconName;
  iconBg: string;
  cardGlow: string;
};

const getActivityConfig = (activity: string): ActivityConfig => {
  const lowerActivity = activity.toLowerCase();

  if (lowerActivity.includes("match")) {
    return {
      variant: "match",
      icon: "trophy",
      iconBg: "bg-gradient-to-br from-match/30 to-match/10 text-match shadow-lg shadow-match/20",
      cardGlow: "hover:shadow-match/10",
    };
  }

  if (lowerActivity.includes("foot")) {
    return {
      variant: "sport",
      icon: "football",
      iconBg: "bg-gradient-to-br from-sport/30 to-sport/10 text-sport shadow-lg shadow-sport/20",
      cardGlow: "hover:shadow-sport/10",
    };
  }

  if (lowerActivity.includes("ping pong")) {
    return {
      variant: "accent",
      icon: "ping-pong",
      iconBg: "bg-gradient-to-br from-accent/30 to-accent/10 text-accent shadow-lg shadow-accent/20",
      cardGlow: "hover:shadow-accent/10",
    };
  }

  return {
    variant: "secondary",
    icon: "calendar",
    iconBg: "bg-gradient-to-br from-white/20 to-white/5 text-white/80",
    cardGlow: "",
  };
};

export const ActivityCard = ({ activity, date }: ActivityCardProps) => {
  const config = getActivityConfig(activity);

  return (
    <Card
      className={`group overflow-hidden border-0 bg-white/5 hover:bg-white/8 transition-all duration-300 hover:shadow-xl ${config.cardGlow}`}
    >
      <div className="flex items-center gap-4 p-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${config.iconBg}`}
        >
          <Icon name={config.icon} size="lg" weight="duotone" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate text-base">
            {activity}
          </h3>
          <div className="mt-2">
            <Badge variant={config.variant} className="text-xs font-medium">
              <Icon name="clock" size="sm" weight="bold" className="mr-1.5" />
              {date}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
