import { numeric, pgTable } from "drizzle-orm/pg-core";
import { auditColumns, id } from "./columns";

export const salesSummary = pgTable("sales_summary", {
  ...id("sal_sum"),
  totalValue: numeric("total_value", { precision: 3 }).notNull().default("0"),
  changePercentage: numeric("change_percentage", { precision: 3 })
    .notNull()
    .default("0"),
  ...auditColumns(),
});
