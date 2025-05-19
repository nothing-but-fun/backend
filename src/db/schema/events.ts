import { pgTable, serial, integer, varchar, text, timestamp, foreignKey } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const events = pgTable("events", {
	id: serial().primaryKey().notNull(),
	organizerId: integer("organizer_id"),
	title: varchar({ length: 200 }).notNull(),
	description: text(),
	location: varchar({ length: 255 }),
	startTime: timestamp("start_time", { mode: 'string' }).notNull(),
	endTime: timestamp("end_time", { mode: 'string' }),
	image: text(),
	capacity: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
]);