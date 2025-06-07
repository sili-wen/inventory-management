import { integer, numeric, pgTable, varchar } from "drizzle-orm/pg-core";
import { auditColumns, id } from "./columns";

export const products = pgTable("products", {
  ...id("prd"),
  name: varchar("name", { length: 64 }).notNull(),
  price: integer("price").notNull(),
  rating: numeric("rating", { precision: 3 }).notNull(),
  quantity: integer("quantity").notNull().default(0),
  ...auditColumns(),
});
