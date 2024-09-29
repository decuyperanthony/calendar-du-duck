import type { ComponentPropsWithoutRef } from "react";

import {
  Alert as AlertWrapper,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Icon } from "./icon";

export const alertVariant = ["default", "destructive"] as const;

type SimpleAlertProps = ComponentPropsWithoutRef<"div"> & {
  message: string;
  title: string;
  variant?: (typeof alertVariant)[number];
};

export const SimpleAlert = ({
  message,
  title,
  variant = "default",
  ...props
}: SimpleAlertProps) => {
  return (
    <AlertWrapper {...props} variant={variant}>
      <Icon name="alert-circle" size="sm" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </AlertWrapper>
  );
};
