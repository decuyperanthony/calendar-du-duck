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
};

const getActivityConfig = (activity: string): ActivityConfig => {
  const lowerActivity = activity.toLowerCase();

  if (lowerActivity.includes("match")) {
    return {
      variant: "match",
      icon: "trophy",
      iconBg: "bg-match/20 text-match",
    };
  }

  if (lowerActivity.includes("foot")) {
    return {
      variant: "sport",
      icon: "football",
      iconBg: "bg-sport/20 text-sport",
    };
  }

  if (lowerActivity.includes("ping pong")) {
    return {
      variant: "accent",
      icon: "ping-pong",
      iconBg: "bg-accent/20 text-accent",
    };
  }

  return {
    variant: "secondary",
    icon: "calendar",
    iconBg: "bg-white/10 text-white/80",
  };
};

export const ActivityCard = ({ activity, date }: ActivityCardProps) => {
  const config = getActivityConfig(activity);

  return (
    <Card className="overflow-hidden border-0 bg-white/5 hover:bg-white/10">
      <div className="flex items-center gap-4 p-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${config.iconBg}`}>
          <Icon name={config.icon} size="md" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{activity}</h3>
          <div className="mt-2">
            <Badge variant={config.variant} className="text-xs">
              <Icon name="clock" size="sm" className="mr-1.5 h-3 w-3" />
              {date}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
