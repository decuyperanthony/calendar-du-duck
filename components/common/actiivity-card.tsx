import { Badge, type BadgeProps } from "../ui/badge";
import { SimpleCard } from "./simple-card";

type ActivityCardProps = {
  activity: string;
  date: string;
};

const getActivityVariant = (activity: string): BadgeProps["variant"] => {
  const lowerActivity = activity.toLowerCase();

  if (lowerActivity.includes("match")) {
    return "match";
  }

  if (
    lowerActivity.includes("entrainement") ||
    lowerActivity.includes("foot") ||
    lowerActivity.includes("ping pong")
  ) {
    return "sport";
  }

  return "accent";
};

export const ActivityCard = ({ activity, date }: ActivityCardProps) => {
  const variant = getActivityVariant(activity);

  return (
    <SimpleCard title={activity}>
      <Badge variant={variant}>{date}</Badge>
    </SimpleCard>
  );
};
