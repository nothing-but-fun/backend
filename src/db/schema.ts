import { pgTable, serial, text, timestamp, integer, varchar } from 'drizzle-orm/pg-core';

// 事件表
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  organizerId: integer('organizer_id'),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description'),
  location: varchar('location', { length: 255 }),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time'),
  image: text('image'),
  capacity: integer('capacity'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}); 