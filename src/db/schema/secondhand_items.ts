import { pgTable, serial, integer, varchar, text, timestamp, foreignKey, numeric } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const secondhandItems = pgTable("secondhand_items", {
	id: serial().primaryKey().notNull(),
	sellerId: integer("seller_id"),
	title: varchar({ length: 200 }).notNull(),
	description: text(),
	price: numeric({ precision: 10, scale:  2 }).notNull(),
	image: text(),
	status: varchar({ length: 20 }).default('available'),
	reviewStatus: varchar("review_status", { length: 20 }).default('pending'),
	reviewReason: text("review_reason"),
	reviewedAt: timestamp("reviewed_at", { mode: 'string' }),
	reviewerId: integer("reviewer_id"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
]);
