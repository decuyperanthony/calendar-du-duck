import { FullScreenImage } from "@/components/common/full-screen-image";
import { GenericTabs } from "@/components/common/generic-tabs";

const tabs = [
  {
    label: "Enfant 1",
    value: "child-a",
    content: (
      <FullScreenImage image="planning-child-a" alt="Planning Enfant 1" />
    ),
  },
  {
    label: "Enfant 2",
    value: "child-b",
    content: <FullScreenImage image="planning-child-b" alt="Planning Enfant 2" />,
  },
];

const Page = () => <GenericTabs tabs={tabs} defaultTab="child-a" />;

export default Page;
