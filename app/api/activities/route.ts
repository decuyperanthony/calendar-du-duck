import { NextResponse } from "next/server";
import { z } from "zod";

import { getDb } from "@/lib/db";
import { activities } from "@/lib/schema";

const createSchema = z.object({
  child: z.enum(["child-a", "child-b"]),
  activity: z.string().min(1),
  schedule: z.string().min(1),
  sortOrder: z.number().int().optional(),
});

export const GET = async () => {
  const db = getDb();
  const items = await db
    .select()
    .from(activities)
    .orderBy(activities.sortOrder);

  const grouped = {
    "child-a": items.filter((i) => i.child === "child-a"),
    "child-b": items.filter((i) => i.child === "child-b"),
  };

  return NextResponse.json(grouped);
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const parsed = createSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const db = getDb();
  const [item] = await db
    .insert(activities)
    .values(parsed.data)
    .returning();

  return NextResponse.json(item, { status: 201 });
};
