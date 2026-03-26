"use client";

import { ActivityCard } from "@/components/common/actiivity-card";
import { GenericTabs } from "@/components/common/generic-tabs";
import { useScoped18n } from "@/lib/next-intl";

const Page = () => {
  const t = useScoped18n("activities");

  const childBActivities = [
    { activity: t("child-b.1.activity"), date: t("child-b.1.date") },
    { activity: t("child-b.2.activity"), date: t("child-b.2.date") },
    { activity: t("child-b.3.activity"), date: t("child-b.3.date") },
    { activity: t("child-b.4.activity"), date: t("child-b.4.date") },
  ];

  const childAActivities = [
    { activity: t("child-a.1.activity"), date: t("child-a.1.date") },
  ];

  const tabs = [
    {
      label: t("tabs.child-a"),
      value: "child-a",
      content: (
        <div className="space-y-2">
          {childAActivities.map((item, index) => (
            <ActivityCard key={index} activity={item.activity} date={item.date} />
          ))}
        </div>
      ),
    },
    {
      label: t("tabs.child-b"),
      value: "child-b",
      content: (
        <div className="space-y-2">
          {childBActivities.map((item, index) => (
            <ActivityCard key={index} activity={item.activity} date={item.date} />
          ))}
        </div>
      ),
    },
  ];

  return <GenericTabs tabs={tabs} defaultTab="child-a" />;
};

export default Page;
