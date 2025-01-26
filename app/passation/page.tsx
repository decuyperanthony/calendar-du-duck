import { GenericTabs } from "@/components/common/generic-tabs";
import TodoList from "@/components/common/todo-list";
import { useScoped18n } from "@/lib/next-intl";

const Page = () => {
  const t = useScoped18n("passation");

  const leonardItems = [
    // todo refactor into common
    t("lucas.eastpak"),
    t("leonard.class-items"),
    t("leonard.shoes"),
    t("leonard.tennis-racket"),
    t("leonard.pingpong-racket"),
    t("leonard.hair-gel"),
    // todo refactor into common
    t("lucas.phone-charger"),
  ];

  const lucasItems = [
    t("lucas.eastpak"),
    t("lucas.class-items"),
    t("lucas.football-gear"),
    t("lucas.phone-charger"),
    t("lucas.dance-shoes"),
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

  return <GenericTabs tabs={tabs} defaultTab="leonard" />;
};

export default Page;
