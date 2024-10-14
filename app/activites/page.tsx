import { ActivityCard } from "@/components/common/actiivity-card";
import { GenericTabs } from "@/components/common/generic-tabs";

import activitiesDate from "@/data/activities.json";

const { lucas, leonard } = activitiesDate;

const tabs = [
  {
    label: "Léonard",
    value: "leonard",
    content: (
      <div className="space-y-2">
        {leonard.map((activity, index) => (
          <ActivityCard
            key={index}
            activity={activity.activity}
            date={activity.date}
          />
        ))}
      </div>
    ),
  },
  {
    label: "Lucas",
    value: "lucas",
    content: (
      <div className="space-y-2">
        {lucas.map((activity, index) => (
          <ActivityCard
            key={index}
            activity={activity.activity}
            date={activity.date}
          />
        ))}
      </div>
    ),
  },
];

const Page = () => <GenericTabs tabs={tabs} defaultTab="leonard" />;

export default Page;
