"use client";

import { useCallback, useEffect, useState } from "react";

import { CustomCheckbox } from "@/components/common/custom-checkbox";
import { GenericTabs } from "@/components/common/generic-tabs";
import { Icon } from "@/components/common/icon";
import { SimpleCard } from "@/components/common/simple-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScoped18n } from "@/lib/next-intl";
import type { PassationItem } from "@/lib/schema";

type Child = "child-a" | "child-b";

type GroupedItems = Record<Child, PassationItem[]>;

const PassationList = ({
  child,
  items,
  onRefresh,
}: {
  child: Child;
  items: PassationItem[];
  onRefresh: () => void;
}) => {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [newLabel, setNewLabel] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleCheck = (id: number) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addItem = async () => {
    const trimmed = newLabel.trim();
    if (!trimmed) return;

    setLoading(true);
    await fetch("/api/passation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        child,
        label: trimmed,
        sortOrder: items.length,
      }),
    });
    setNewLabel("");
    setLoading(false);
    onRefresh();
  };

  const deleteItem = async (id: number) => {
    await fetch(`/api/passation/${id}`, { method: "DELETE" });
    onRefresh();
  };

  return (
    <SimpleCard>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-2">
            <CustomCheckbox
              id={`passation__${item.id}`}
              checked={checked[item.id] ?? false}
              onCheckedChange={() => toggleCheck(item.id)}
              label={item.label}
            />
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-white/40 hover:text-red-400"
              onClick={() => deleteItem(item.id)}
            >
              <Icon name="trash" size="sm" />
            </Button>
          </li>
        ))}
      </ul>
      <form
        className="mt-6 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          addItem();
        }}
      >
        <Input
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Ajouter un élément..."
          disabled={loading}
        />
        <Button type="submit" size="icon" disabled={loading || !newLabel.trim()}>
          <Icon name="plus" size="sm" />
        </Button>
      </form>
    </SimpleCard>
  );
};

const Page = () => {
  const t = useScoped18n("passation");
  const [data, setData] = useState<GroupedItems | null>(null);

  const fetchItems = useCallback(async () => {
    const res = await fetch("/api/passation");
    const json = (await res.json()) as GroupedItems;
    setData(json);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  if (!data) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const tabs = [
    {
      label: t("tabs.child-a"),
      value: "child-a" as const,
      content: (
        <PassationList
          child="child-a"
          items={data["child-a"]}
          onRefresh={fetchItems}
        />
      ),
    },
    {
      label: t("tabs.child-b"),
      value: "child-b" as const,
      content: (
        <PassationList
          child="child-b"
          items={data["child-b"]}
          onRefresh={fetchItems}
        />
      ),
    },
  ];

  return <GenericTabs tabs={tabs} defaultTab="child-a" />;
};

export default Page;
