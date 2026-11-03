import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const waitlistSubscribers = pgTable(
  "willscent_waitlist_subscribers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    fullName: varchar("full_name", { length: 150 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    fragranceInterests: text("fragrance_interests").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("waitlist_subscriber_email_unique").on(table.email),
    index("waitlist_subscriber_created_at_index").on(table.createdAt),
  ],
);
