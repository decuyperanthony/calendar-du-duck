import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { passationItems } from "@/lib/schema";

const createSchema = z.object({
  child: z.enum(["child-a", "child-b"]),
  label: z.string().min(1),
  sortOrder: z.number().int().optional(),
});

export const GET = async () => {
  const items = await db
    .select()
    .from(passationItems)
    .orderBy(passationItems.sortOrder);

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

  const [item] = await db
    .insert(passationItems)
    .values(parsed.data)
    .returning();

  return NextResponse.json(item, { status: 201 });
};
