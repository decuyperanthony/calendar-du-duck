import { GenericTabs } from "@/components/common/generic-tabs";
import TodoList from "@/components/common/todo-list";

const leonardItems = [
  "Affaire athlétisme",
  "Affaires classe",
  "Raquette tennis",
  "Raquette ping pong",
];

const lucasItems = [
  "Affaire foot",
  "Tel + chargeur",
  "Affaire classe",
  "Chaussure danse",
];

const tabs = [
  {
    label: "Léonard",
    value: "leonard",
    content: (
      <TodoList
        items={leonardItems.map((label) => ({ label, checked: false }))}
      />
    ),
  },
  {
    label: "Lucas",
    value: "lucas",
    content: (
      <TodoList
        items={lucasItems.map((label) => ({ label, checked: false }))}
      />
    ),
  },
];

const Page = () => <GenericTabs tabs={tabs} defaultTab="leonard" />;

export default Page;
