import { FullScreenImage } from "@/components/common/full-screen-image";
import { GenericTabs } from "@/components/common/generic-tabs";
import { familyConfig } from "@/lib/family-config";

const tabs = [
  {
    label: familyConfig.childA,
    value: "child-a",
    content: (
      <FullScreenImage image="planning-child-a" alt={`Planning ${familyConfig.childA}`} />
    ),
  },
  {
    label: familyConfig.childB,
    value: "child-b",
    content: <FullScreenImage image="planning-child-b" alt={`Planning ${familyConfig.childB}`} />,
  },
];

const Page = () => <GenericTabs tabs={tabs} defaultTab="child-a" />;

export default Page;
