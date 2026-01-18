import { GenericTabs } from "@/components/common/generic-tabs";
import TodoList from "@/components/common/todo-list";
import { useScoped18n } from "@/lib/next-intl";

const toTodoItems = (labels: string[]) =>
  labels.map((label) => ({ label, checked: false }));

const Page = () => {
  const t = useScoped18n("passation");

  const leonardItems = [
    t("items.gel"),
    t("items.class-items"),
    t("items.new-balance"),
  ];

  const lucasItems = [
    t("items.nike-shoes"),
    t("items.class-items"),
  ];

  const tabs = [
    {
      label: t("tabs.leonard"),
      value: "leonard",
      content: <TodoList items={toTodoItems(leonardItems)} />,
    },
    {
      label: t("tabs.lucas"),
      value: "lucas",
      content: <TodoList items={toTodoItems(lucasItems)} />,
    },
  ];

  return <GenericTabs tabs={tabs} defaultTab="leonard" />;
};

export default Page;
