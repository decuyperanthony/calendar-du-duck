"use client";

import { useRef, forwardRef, useImperativeHandle } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/common/icon";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

type DatePickerButtonProps = {
  value: string;
  onChange: (date: string) => void;
  className?: string;
};

const DatePickerButton = forwardRef<HTMLInputElement, DatePickerButtonProps>(
  ({ value, onChange, className }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const formattedDate = dayjs(value).format("D MMMM YYYY");

    const handleClick = () => {
      inputRef.current?.showPicker();
    };

    return (
      <div className={cn("relative", className)}>
        {/* Hidden native date input */}
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
          aria-hidden="true"
        />

        {/* Visible button */}
        <button
          type="button"
          onClick={handleClick}
          className={cn(
            "flex items-center justify-between w-full h-12 rounded-xl",
            "border border-white/10 bg-white/5 px-4",
            "text-sm text-white transition-all duration-200",
            "hover:bg-white/8 hover:border-white/20",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
            "active:scale-[0.98]"
          )}
        >
          <span className="font-medium capitalize">{formattedDate}</span>
          <Icon
            name="calendar"
            size="md"
            className="text-primary flex-shrink-0"
          />
        </button>
      </div>
    );
  }
);

DatePickerButton.displayName = "DatePickerButton";

export { DatePickerButton };
