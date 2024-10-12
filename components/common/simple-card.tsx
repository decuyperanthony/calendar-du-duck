import { type ComponentPropsWithoutRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

type SimpleCardProps = ComponentPropsWithoutRef<"div"> & {
  title?: string;
};

export const SimpleCard = ({ children, title, ...props }: SimpleCardProps) => (
  <Card {...props}>
    {!!title && (
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    )}

    <CardContent className={cn({ "mt-6": !title })}>{children}</CardContent>
  </Card>
);

SimpleCard.displayName = "SimpleCard";
