import { type ComponentPropsWithoutRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

type SimpleCardProps = ComponentPropsWithoutRef<"div"> & {
  title?: string;
};

export const SimpleCard = ({ children, title, className, ...props }: SimpleCardProps) => (
  <Card className={cn("animate-in", className)} {...props}>
    {title && (
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    )}
    <CardContent className={cn({ "pt-5": !title })}>{children}</CardContent>
  </Card>
);

SimpleCard.displayName = "SimpleCard";
