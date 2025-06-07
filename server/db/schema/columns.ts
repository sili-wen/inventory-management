import { AnyColumn, sql } from "drizzle-orm";
import { timestamp, varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulid";

const SEPARATOR = "_";

const entityId = (prefix: string) => `${prefix}${SEPARATOR}${ulid()}`;

export const id = (prefix: string) => ({
  id: varchar("id", { length: 64 })
    .primaryKey()
    .$defaultFn(() => entityId(prefix)),
});

export const auditColumns = () => ({
  createdAt: timestamp("created_at", { precision: 3, withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  terminatedAt: timestamp("terminated_at", {
    precision: 3,
    withTimezone: true,
  }),
});

export const increment = (column: AnyColumn, value = 1) => {
  return sql`${column} + ${value}`;
};
