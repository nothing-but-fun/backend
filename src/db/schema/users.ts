import { pgTable, serial, varchar, text, timestamp, unique } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	openid: varchar({ length: 64 }).notNull(),
	username: varchar({ length: 100 }),
	avatar: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	unique("users_openid_key").on(table.openid),
]);