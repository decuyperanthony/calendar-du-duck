import { Checkbox } from "../ui/checkbox";

type CustomCheckboxProps = {
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
}: CustomCheckboxProps) => {
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
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};
