"use client";

import { CustodyHero } from "@/components/common/custody-hero";
import { Icon } from "@/components/common/icon";
import { Input } from "@/components/ui/input";
import { useScoped18n } from "@/lib/next-intl";
import { getWeekType, today, WeekType } from "@/utils";
import { ChangeEvent, useState } from "react";

const gardeConfig = {
  EVEN: { name: "Anthony", variant: "anthony" },
  ODD: { name: "Flora", variant: "flora" },
} as const;

const Page = () => {
  const [weekType, setWeekType] = useState<WeekType>(getWeekType(today));
  const t = useScoped18n("common.week");

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (date) {
      setWeekType(getWeekType(date));
    }
  };

  const garde = gardeConfig[weekType];

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      {/* Date picker card */}
      <div className="glass-dark rounded-2xl p-4">
        <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-medium">
          {t("choose-date")}
        </label>
        <div className="relative">
          <Input
            type="date"
            onChange={handleDateChange}
            className="w-full pr-12"
            defaultValue={today}
          />
          <Icon
            name="calendar"
            size="md"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none"
          />
        </div>
      </div>

      {/* Custody Hero - BIG and visible */}
      <CustodyHero
        name={garde.name}
        weekLabel={t("week-label", { type: t(weekType) })}
        subtitle={t("custody-subtitle")}
        variant={garde.variant}
      />
    </div>
  );
};

export default Page;
