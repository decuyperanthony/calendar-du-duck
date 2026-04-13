"use client";

import {
  useCallback,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";

import { CustomCheckbox } from "@/components/common/custom-checkbox";
import { GenericTabs } from "@/components/common/generic-tabs";
import { Icon } from "@/components/common/icon";
import { SimpleCard } from "@/components/common/simple-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { familyConfig } from "@/lib/family-config";
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
  const [newLabel, setNewLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [, startTransition] = useTransition();

  const [optimisticItems, applyOptimisticCheck] = useOptimistic(
    items,
    (current, patch: { id: number; isChecked: boolean }) =>
      current.map((i) =>
        i.id === patch.id ? { ...i, isChecked: patch.isChecked } : i,
      ),
  );

  const toggleCheck = (item: PassationItem) => {
    const newChecked = !item.isChecked;
    startTransition(async () => {
      applyOptimisticCheck({ id: item.id, isChecked: newChecked });
      await fetch(`/api/passation/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isChecked: newChecked }),
      });
      onRefresh();
    });
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

  const startEdit = (item: PassationItem) => {
    setEditingId(item.id);
    setEditLabel(item.label);
  };

  const saveEdit = async (id: number) => {
    const trimmed = editLabel.trim();
    if (!trimmed) return;

    await fetch(`/api/passation/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: trimmed }),
    });
    setEditingId(null);
    setEditLabel("");
    onRefresh();
  };

  const deleteItem = async (id: number) => {
    await fetch(`/api/passation/${id}`, { method: "DELETE" });
    onRefresh();
  };

  return (
    <SimpleCard>
      <ul className="space-y-4">
        {optimisticItems.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-2">
            {editingId === item.id ? (
              <form
                className="flex flex-1 gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  saveEdit(item.id);
                }}
              >
                <Input
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  autoFocus
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!editLabel.trim()}
                  className="shrink-0"
                >
                  <Icon name="check-circle" size="sm" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-white/40"
                  onClick={() => setEditingId(null)}
                >
                  <Icon name="alert-circle" size="sm" />
                </Button>
              </form>
            ) : (
              <>
                <CustomCheckbox
                  id={`passation__${item.id}`}
                  checked={item.isChecked}
                  onCheckedChange={() => toggleCheck(item)}
                  label={item.label}
                />
                <div className="flex shrink-0 gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white/40 hover:text-white"
                    onClick={() => startEdit(item)}
                  >
                    <Icon name="pencil" size="sm" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white/40 hover:text-red-400"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Icon name="trash" size="sm" />
                  </Button>
                </div>
              </>
            )}
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
      label: familyConfig.childA,
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
      label: familyConfig.childB,
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
