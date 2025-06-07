import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { auditColumns, id } from "./columns";
import { expenseSummary } from "./expenseSummary";

export const expenseByCategory = pgTable("expense_by_category", {
  ...id("exp_cat"),
  expenseSummaryId: varchar("expense_summary_id", { length: 64 })
    .notNull()
    .references(() => expenseSummary.id),
  category: varchar("category", { length: 64 }).notNull().default("unknown"),
  amount: integer("amount").notNull().default(0),
  ...auditColumns(),
});
