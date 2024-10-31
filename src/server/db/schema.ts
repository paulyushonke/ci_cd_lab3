// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  pgTableCreator,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `ci_cd_lab3_${name}`);

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
});

export const waiters = pgTable("waiters", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  details: text("details").notNull(),
  price: integer("price").notNull(),
});

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  address: text("address").notNull(),
  details: text("details"),
});

export const orderCards = pgTable("order_cards", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id"),
  waiterId: integer("waiter_id"),
  orderId: integer("order_id"),
  locationId: integer("location_id"),
});

export const ocRelations = relations(orderCards, ({ one }) => ({
  client: one(clients, {
    fields: [orderCards.clientId],
    references: [clients.id],
  }),
  waiter: one(waiters, {
    fields: [orderCards.waiterId],
    references: [waiters.id],
  }),
  order: one(orders, {
    fields: [orderCards.orderId],
    references: [orders.id],
  }),
  location: one(locations, {
    fields: [orderCards.locationId],
    references: [locations.id],
  }),
}));
export const clientRelations = relations(clients, ({ many }) => ({
  orderCardInfo: many(orderCards),
}));

export const waiterRelations = relations(waiters, ({ many }) => ({
  orderCardInfo: many(orderCards),
}));

export const orderRelations = relations(orders, ({ many }) => ({
  orderCardInfo: many(orderCards),
}));

export const locationRelations = relations(locations, ({ many }) => ({
  orderCardInfo: many(orderCards),
}));
