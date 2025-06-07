import { integer, pgTable, real, varchar } from "drizzle-orm/pg-core";
import { auditColumns, id } from "./columns";
import { products } from "./products";
import { numeric } from "drizzle-orm/pg-core";

export const sales = pgTable("sales", {
  ...id("sal"),
  productId: varchar("product_id", { length: 64 })
    .references(() => products.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  rating: numeric("unit_price", { precision: 3 }).notNull(),
  totalAmount: numeric("total_amount", { precision: 3 }).notNull(),
  ...auditColumns(),
});
