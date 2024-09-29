import { FullScreenImage } from "@/components/common/full-screen-image";
import { GenericTabs } from "@/components/common/generic-tabs";

const tabs = [
  {
    label: "Léonard",
    value: "leonard",
    content: (
      <FullScreenImage imageKey="planning-leonard" alt="Planning de Léonard" />
    ),
  },
  {
    label: "Lucas",
    value: "lucas",
    content: (
      <FullScreenImage imageKey="planning-lucas" alt="Planning de Lucas" />
    ),
  },
];

const Page = () => <GenericTabs tabs={tabs} defaultTab="leonard" />;

export default Page;
