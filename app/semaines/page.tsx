"use client";

import { SimpleAlert } from "@/components/common/simple-alert";
import { SimpleCard } from "@/components/common/simple-card";
import { Input } from "@/components/ui/input";
import { getWeekType, today, WeekType } from "@/utils";
import { ChangeEvent, useState } from "react";

// TODO use trads

const gardeMapping = {
  EVEN: "Anthony",
  ODD: "Flora",
} as const;

const weekInfoMapping = {
  EVEN: "paire",
  ODD: "impaire",
} as const;

const Page = () => {
  const [weekType, setWeekType] = useState<WeekType>(getWeekType(today));

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (date) {
      const calculatedWeekType = getWeekType(date);
      setWeekType(calculatedWeekType);
    }
  };

  return (
    <SimpleCard title="Calcul de garde" className="w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <Input
          type="date"
          onChange={handleDateChange}
          className="w-full"
          placeholder="Choisir une date"
          defaultValue={today}
        />

        {weekType && (
          <SimpleAlert
            title={`Semaine ${weekInfoMapping[weekType]}`}
            message={`C'est la semaine de garde de ${gardeMapping[weekType]}.`}
          />
        )}
      </div>
    </SimpleCard>
  );
};

export default Page;
