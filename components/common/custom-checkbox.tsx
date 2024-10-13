import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

type Props = {
  id: string;
  checked: boolean;
  onCheckedChange: () => void;
  label: string;
};

export const CustomCheckbox = ({
  id,
  checked,
  onCheckedChange,
  label,
}: Props) => {
  return (
    <div className="flex items-center gap-3">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="size-5"
      />
      <label
        htmlFor={id}
        className={cn(
          "text-sm font-medium leading-none",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        )}
      >
        {label}
      </label>
    </div>
  );
};
