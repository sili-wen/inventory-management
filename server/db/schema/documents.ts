import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { auditColumns, id } from "./columns";

export const fileUploads = pgTable("documents", {
  ...id("doc"),
  name: varchar("name", { length: 256 }).notNull(),
  size: integer("size").notNull(),
  uri: varchar("uri", { length: 2048 }).notNull(),
  ...auditColumns(),
});
