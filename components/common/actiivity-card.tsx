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
  gradient: string;
};

const getActivityConfig = (activity: string): ActivityConfig => {
  const lowerActivity = activity.toLowerCase();

  if (lowerActivity.includes("match")) {
    return {
      variant: "match",
      icon: "trophy",
      gradient: "from-match/10 to-match/5",
    };
  }

  if (lowerActivity.includes("foot")) {
    return {
      variant: "sport",
      icon: "football",
      gradient: "from-sport/10 to-sport/5",
    };
  }

  if (lowerActivity.includes("ping pong")) {
    return {
      variant: "accent",
      icon: "ping-pong",
      gradient: "from-accent/10 to-accent/5",
    };
  }

  return {
    variant: "secondary",
    icon: "calendar",
    gradient: "from-muted to-muted/50",
  };
};

export const ActivityCard = ({ activity, date }: ActivityCardProps) => {
  const config = getActivityConfig(activity);

  return (
    <Card className={`overflow-hidden bg-gradient-to-r ${config.gradient} border-0`}>
      <div className="flex items-center gap-4 p-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background shadow-sm">
          <Icon name={config.icon} size="md" className="text-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{activity}</h3>
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
