import type { ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";

import {
  Alert as AlertWrapper,
  AlertDescription,
  AlertTitle,
  alertVariants,
} from "@/components/ui/alert";
import { Icon } from "./icon";

type AlertVariant = VariantProps<typeof alertVariants>["variant"];

type SimpleAlertProps = ComponentPropsWithoutRef<"div"> & {
  message: string;
  title: string;
  variant?: AlertVariant;
  icon?: "alert-circle" | "calendar-check" | "check-circle" | "info";
};

export const SimpleAlert = ({
  message,
  title,
  variant = "success",
  icon = "calendar-check",
  ...props
}: SimpleAlertProps) => {
  return (
    <AlertWrapper {...props} variant={variant}>
      <Icon name={icon} size="sm" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </AlertWrapper>
  );
};
