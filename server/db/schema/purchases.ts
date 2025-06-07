import { integer, numeric, pgTable, varchar } from "drizzle-orm/pg-core";
import { auditColumns, id } from "./columns";
import { products } from "./products";

export const purchases = pgTable("purchases", {
  ...id("pur"),
  productId: varchar("product_id", { length: 64 })
    .references(() => products.id)
    .notNull(),
  quantity: integer("quantity").notNull().default(0),
  unitCost: numeric("unit_cost", { precision: 3 }).notNull(),
  totalcost: numeric("total_cost", { precision: 3 }).notNull(),
  ...auditColumns(),
});
