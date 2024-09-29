import { ActivityCard } from "@/components/common/actiivity-card";
import { GenericTabs } from "@/components/common/generic-tabs";

const activitiesLucas = [
  { activity: "Foot - Entrainement", date: "Lundi 17H30 à 19H" },
  { activity: "Basket - Entrainement", date: "Mercredi 13H à 14H30" },
  { activity: "Foot - Match", date: "Samedi" },
  { activity: "Ping pong - Entrainement", date: "Samedi 16H30 à 18H" },
  { activity: "Foot - Entrainement", date: "Dimanche 12H à 13H30" },
];

const activitiesLeonard = [
  { activity: "Tennis - Entrainement", date: "Lundi 18H à 19H" },
  { activity: "Basket - Entrainement", date: "Mercredi 14H30 à 16H" },
  { activity: "Ping pong - Entrainement", date: "Samedi 16H30 à 18H" },
];

const tabs = [
  {
    label: "Léonard",
    value: "leonard",
    content: (
      <div className="space-y-2">
        {activitiesLeonard.map((activity, index) => (
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
        {activitiesLucas.map((activity, index) => (
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
