"use client";

import { SimpleAlert } from "@/components/common/simple-alert";
import { Input } from "@/components/ui/input";
import { getWeekType, WeekType } from "@/utils/week-utils";
import { ChangeEvent, useState } from "react";

const gardeMapping = {
  EVEN: "Anthony",
  ODD: "Flora",
} as const;

const weekInfoMapping = {
  EVEN: "paire",
  ODD: "impaire",
} as const;

const Page = () => {
  const [weekType, setWeekType] = useState<WeekType>();

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (date) {
      const calculatedWeekType = getWeekType(date);
      setWeekType(calculatedWeekType);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Calcul de Garde</h1>

      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <Input
          type="date"
          onChange={handleDateChange}
          className="w-full"
          placeholder="Choisir une date"
        />

        {weekType && (
          <SimpleAlert
            title={`Semaine ${weekInfoMapping[weekType]}`}
            message={`C'est la semaine de garde de ${gardeMapping[weekType]}.`}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
