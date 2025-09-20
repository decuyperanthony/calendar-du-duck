import { GenericTabs } from "@/components/common/generic-tabs";
import TodoList from "@/components/common/todo-list";
import { useScoped18n } from "@/lib/next-intl";

const Page = () => {
  const t = useScoped18n("passation");

  const leonardItems = [
    // todo refactor into common
    t("leonard.eastpak"),
    // todo refactor into common
    t("leonard.class-items"),
    // t("leonard.tennis-racket"),
    t("leonard.pingpong-racket"),
    // todo refactor into common
    t("leonard.basket"),
    t("leonard.germen-pull"),
    // todo refactor into common
    // t("leonard.phone-charger"),
  ];

  const lucasItems = [
    t("lucas.eastpak"),
    t("lucas.class-items"),
    t("lucas.football-gear"),
    // t("lucas.swimming-gear"),
    t("lucas.basket"),
    // t("lucas.phone-charger"),
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
