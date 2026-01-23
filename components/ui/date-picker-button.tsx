"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/common/icon";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

type DatePickerButtonProps = {
  value: string;
  onChange: (date: string) => void;
  className?: string;
};

const DatePickerButton = ({ value, onChange, className }: DatePickerButtonProps) => {
  const [open, setOpen] = useState(false);
  const formattedDate = dayjs(value).format("D MMMM YYYY");
  const selectedDate = dayjs(value).toDate();

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange(dayjs(date).format("YYYY-MM-DD"));
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center justify-between w-full h-12 rounded-xl",
            "border border-white/10 bg-white/5 px-4",
            "text-sm text-white transition-all duration-200",
            "hover:bg-white/10 hover:border-white/20",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
            "active:scale-[0.98]",
            className
          )}
        >
          <span className="font-medium capitalize">{formattedDate}</span>
          <Icon
            name="calendar"
            size="md"
            className="text-primary flex-shrink-0"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          defaultMonth={selectedDate}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePickerButton };
