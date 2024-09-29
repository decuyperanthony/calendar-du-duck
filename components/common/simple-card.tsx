import { type ComponentPropsWithoutRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type SimpleCardProps = ComponentPropsWithoutRef<"div"> & {
  title?: string;
};

export const SimpleCard = ({ children, title, ...props }: SimpleCardProps) => (
  <Card {...props}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>

    <CardContent>{children}</CardContent>
  </Card>
);

SimpleCard.displayName = "SimpleCard";
