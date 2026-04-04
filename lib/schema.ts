import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const passationItems = pgTable("passation_items", {
  id: serial("id").primaryKey(),
  child: text("child").notNull(), // "child-a" | "child-b"
  label: text("label").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  child: text("child").notNull(), // "child-a" | "child-b"
  activity: text("activity").notNull(), // e.g. "Foot - Entrainement"
  schedule: text("schedule").notNull(), // e.g. "mardi 19H à 20H30"
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type PassationItem = typeof passationItems.$inferSelect;
export type NewPassationItem = typeof passationItems.$inferInsert;
export type Activity = typeof activities.$inferSelect;
export type NewActivity = typeof activities.$inferInsert;
