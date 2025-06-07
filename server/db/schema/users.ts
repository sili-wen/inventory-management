import { pgTable, varchar } from "drizzle-orm/pg-core";
import { auditColumns, id } from "./columns";

export const users = pgTable("users", {
  ...id("usr"),
  firstName: varchar("first_name", { length: 64 }).notNull(),
  lastName: varchar("last_name", { length: 64 }).notNull(),
  email: varchar("email", { length: 64 }).notNull(),
  ...auditColumns(),
});
