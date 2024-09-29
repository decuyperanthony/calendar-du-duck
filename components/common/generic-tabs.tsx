import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type TabItem = {
  label: string;
  value: string;
  content: ReactNode;
};

type GenericTabsProps = {
  tabs: TabItem[];
  defaultTab?: string;
};

export const GenericTabs = ({ tabs, defaultTab }: GenericTabsProps) => {
  return (
    <Tabs defaultValue={defaultTab ?? tabs[0]?.value} className="w-full">
      <TabsList className="flex justify-center">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="mt-4">
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};
