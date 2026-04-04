import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { activities } from "@/lib/schema";

const updateSchema = z.object({
  activity: z.string().min(1).optional(),
  schedule: z.string().min(1).optional(),
  sortOrder: z.number().int().optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

export const PUT = async (request: Request, { params }: RouteParams) => {
  const { id } = await params;
  const body = await request.json();
  const parsed = updateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const [updated] = await db
    .update(activities)
    .set(parsed.data)
    .where(eq(activities.id, Number(id)))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
};

export const DELETE = async (_request: Request, { params }: RouteParams) => {
  const { id } = await params;

  const [deleted] = await db
    .delete(activities)
    .where(eq(activities.id, Number(id)))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
};
