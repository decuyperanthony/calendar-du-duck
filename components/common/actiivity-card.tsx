import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";

type ActivityCardProps = {
  activity: string;
  date: string;
};

export const ActivityCard = ({ activity, date }: ActivityCardProps) => {
  return (
    <Card className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex justify-between items-center">
        <p className="text-gray-600 text-md font-semibold">{date}</p>
      </CardHeader>
      <CardContent>
        <Badge className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm">
          {activity}
        </Badge>
      </CardContent>
    </Card>
  );
};
