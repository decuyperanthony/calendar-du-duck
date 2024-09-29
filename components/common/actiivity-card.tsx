import { Badge } from "../ui/badge";

import { SimpleCard } from "./simple-card";

type ActivityCardProps = {
  activity: string;
  date: string;
};

export const ActivityCard = ({ activity, date }: ActivityCardProps) => {
  return (
    <SimpleCard title={activity}>
      <Badge>{date}</Badge>
    </SimpleCard>
  );
};
