"use client";

import { useCallback, useEffect, useState } from "react";

import { ActivityCard } from "@/components/common/actiivity-card";
import { GenericTabs } from "@/components/common/generic-tabs";
import { Icon } from "@/components/common/icon";
import { SimpleCard } from "@/components/common/simple-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { familyConfig } from "@/lib/family-config";
import type { Activity } from "@/lib/schema";

type Child = "child-a" | "child-b";

type GroupedActivities = Record<Child, Activity[]>;

const ActivityForm = ({
  child,
  initial,
  onDone,
}: {
  child: Child;
  initial?: Activity;
  onDone: () => void;
}) => {
  const [activity, setActivity] = useState(initial?.activity ?? "");
  const [schedule, setSchedule] = useState(initial?.schedule ?? "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim() || !schedule.trim()) return;

    setLoading(true);

    if (initial) {
      await fetch(`/api/activities/${initial.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activity: activity.trim(), schedule: schedule.trim() }),
      });
    } else {
      await fetch("/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          child,
          activity: activity.trim(),
          schedule: schedule.trim(),
        }),
      });
    }

    setLoading(false);
    setActivity("");
    setSchedule("");
    onDone();
  };

  return (
    <form className="flex flex-col gap-2 sm:flex-row" onSubmit={handleSubmit}>
      <Input
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        placeholder="Activité (ex: Foot - Entrainement)"
        disabled={loading}
        className="flex-1"
      />
      <Input
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
        placeholder="Horaire (ex: mardi 19H à 20H30)"
        disabled={loading}
        className="flex-1"
      />
      <Button
        type="submit"
        size="icon"
        disabled={loading || !activity.trim() || !schedule.trim()}
        className="shrink-0"
      >
        <Icon name="plus" size="sm" />
      </Button>
    </form>
  );
};

const ActivitiesList = ({
  child,
  items,
  onRefresh,
}: {
  child: Child;
  items: Activity[];
  onRefresh: () => void;
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);

  const deleteActivity = async (id: number) => {
    await fetch(`/api/activities/${id}`, { method: "DELETE" });
    onRefresh();
  };

  return (
    <div className="space-y-3">
      {items.map((item) =>
        editingId === item.id ? (
          <SimpleCard key={item.id}>
            <ActivityForm
              child={child}
              initial={item}
              onDone={() => {
                setEditingId(null);
                onRefresh();
              }}
            />
          </SimpleCard>
        ) : (
          <div key={item.id} className="group/item relative">
            <ActivityCard activity={item.activity} date={item.schedule} />
            <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover/item:opacity-100">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white/40 hover:text-white"
                onClick={() => setEditingId(item.id)}
              >
                <Icon name="pencil" size="sm" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white/40 hover:text-red-400"
                onClick={() => deleteActivity(item.id)}
              >
                <Icon name="trash" size="sm" />
              </Button>
            </div>
          </div>
        )
      )}
      <SimpleCard>
        <ActivityForm child={child} onDone={onRefresh} />
      </SimpleCard>
    </div>
  );
};

const Page = () => {
  const [data, setData] = useState<GroupedActivities | null>(null);

  const fetchActivities = useCallback(async () => {
    const res = await fetch("/api/activities");
    const json = (await res.json()) as GroupedActivities;
    setData(json);
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

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
        <ActivitiesList
          child="child-a"
          items={data["child-a"]}
          onRefresh={fetchActivities}
        />
      ),
    },
    {
      label: familyConfig.childB,
      value: "child-b" as const,
      content: (
        <ActivitiesList
          child="child-b"
          items={data["child-b"]}
          onRefresh={fetchActivities}
        />
      ),
    },
  ];

  return <GenericTabs tabs={tabs} defaultTab="child-a" />;
};

export default Page;
