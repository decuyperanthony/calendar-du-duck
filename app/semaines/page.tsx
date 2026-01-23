"use client";

import { CustodyHero } from "@/components/common/custody-hero";
import { DatePickerButton } from "@/components/ui/date-picker-button";
import { useScoped18n } from "@/lib/next-intl";
import { getWeekType, today, WeekType } from "@/utils";
import { useState } from "react";

const gardeConfig = {
  EVEN: { variant: "anthony", role: "papa" },
  ODD: { variant: "flora", role: "maman" },
} as const;

const Page = () => {
  const [selectedDate, setSelectedDate] = useState(today);
  const [weekType, setWeekType] = useState<WeekType>(getWeekType(today));
  const t = useScoped18n("common.week");

  const handleDateChange = (date: string) => {
    if (date) {
      setSelectedDate(date);
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
        <DatePickerButton
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      {/* Custody Hero - BIG and visible */}
      <CustodyHero
        role={t(garde.role)}
        weekLabel={t("week-label", { type: t(weekType) })}
        weekDetail={t(`${weekType}-detail`)}
        subtitle={t("custody-subtitle")}
        variant={garde.variant}
      />
    </div>
  );
};

export default Page;
