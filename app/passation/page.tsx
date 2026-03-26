import { GenericTabs } from "@/components/common/generic-tabs";
import TodoList from "@/components/common/todo-list";
import { useScoped18n } from "@/lib/next-intl";

const toTodoItems = (labels: string[]) =>
  labels.map((label) => ({ label, checked: false }));

const Page = () => {
  const t = useScoped18n("passation");

  const childAItems = [
    t("items.class-items"),
    t("items.sneakers"),
  ];

  const childBItems = [
    t("items.sport-shoes"),
    t("items.sport-jacket"),
    t("items.class-items"),
  ];

  const tabs = [
    {
      label: t("tabs.child-a"),
      value: "child-a",
      content: <TodoList items={toTodoItems(childAItems)} />,
    },
    {
      label: t("tabs.child-b"),
      value: "child-b",
      content: <TodoList items={toTodoItems(childBItems)} />,
    },
  ];

  return <GenericTabs tabs={tabs} defaultTab="child-a" />;
};

export default Page;
