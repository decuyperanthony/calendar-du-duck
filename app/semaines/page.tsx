"use client";

import { SimpleAlert } from "@/components/common/simple-alert";
import { SimpleCard } from "@/components/common/simple-card";
import { Input } from "@/components/ui/input";
import { useScoped18n } from "@/lib/next-intl";
import { getWeekType, today, WeekType } from "@/utils";
import { ChangeEvent, useState } from "react";

const gardeMapping = {
  EVEN: "Anthony",
  ODD: "Flora",
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

  return (
    <SimpleCard title={t("custody-title")} className="w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <Input
          type="date"
          onChange={handleDateChange}
          className="w-full"
          placeholder={t("choose-date")}
          defaultValue={today}
        />

        {weekType && (
          <SimpleAlert
            title={t("week-label", { type: t(weekType) })}
            message={t("custody-message", { name: gardeMapping[weekType] })}
          />
        )}
      </div>
    </SimpleCard>
  );
};

export default Page;
