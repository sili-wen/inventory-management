import { numeric, pgTable } from "drizzle-orm/pg-core";
import { auditColumns, id } from "./columns";

export const expenseSummary = pgTable("expense_summary", {
  ...id("exp_sum"),
  totalExpenses: numeric("total_expense", { precision: 3 })
    .notNull()
    .default("0"),
  ...auditColumns(),
});
