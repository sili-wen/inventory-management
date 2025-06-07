import { integer, pgTable } from "drizzle-orm/pg-core";
import { auditColumns, id } from "./columns";
import { varchar } from "drizzle-orm/pg-core";

export const expenses = pgTable("expenses", {
  ...id("exp"),
  category: varchar("category", { length: 64 }).notNull().default("unknown"),
  amount: integer("amount").notNull().default(0),
  ...auditColumns(),
});
