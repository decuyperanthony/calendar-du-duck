"use client";

import { ActivityCard } from "@/components/common/actiivity-card";
import { GenericTabs } from "@/components/common/generic-tabs";
import { useScoped18n } from "@/lib/next-intl";

const Page = () => {
  const t = useScoped18n("activities");

  const lucasActivities = [
    { activity: t("lucas.1.activity"), date: t("lucas.1.date") },
    { activity: t("lucas.2.activity"), date: t("lucas.2.date") },
    { activity: t("lucas.3.activity"), date: t("lucas.3.date") },
    { activity: t("lucas.4.activity"), date: t("lucas.4.date") },
  ];

  const leonardActivities = [
    { activity: t("leonard.1.activity"), date: t("leonard.1.date") },
  ];

  const tabs = [
    {
      label: t("tabs.leonard"),
      value: "leonard",
      content: (
        <div className="space-y-2">
          {leonardActivities.map((item, index) => (
            <ActivityCard key={index} activity={item.activity} date={item.date} />
          ))}
        </div>
      ),
    },
    {
      label: t("tabs.lucas"),
      value: "lucas",
      content: (
        <div className="space-y-2">
          {lucasActivities.map((item, index) => (
            <ActivityCard key={index} activity={item.activity} date={item.date} />
          ))}
        </div>
      ),
    },
  ];

  return <GenericTabs tabs={tabs} defaultTab="leonard" />;
};

export default Page;
