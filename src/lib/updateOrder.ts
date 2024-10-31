"use server"; // don't forget to add this!

import { db } from "~/server/db";

import { clients, locations, waiters, orders } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// This schema is used to validate input from client.
type OrdersType = {
  order_id: number;
  client_id: number;
  waiter_id: number;
  location_id: number;
  clientFirstName: string;
  clientLastName: string;
  waiterFirstName: string;
  waiterLastName: string;
  details: string;
  price: string;
  address: string;
};
export async function updateOrder({ order }: { order: OrdersType }) {
  console.log("or", order);
  await db
    .update(clients)
    .set({
      firstName: order?.clientFirstName,
      lastName: order?.clientLastName,
    })
    .where(eq(clients.id, order?.client_id ?? 0));

  await db
    .update(locations)
    .set({
      address: order?.address,
      details: order?.details,
    })
    .where(eq(locations.id, order?.location_id ?? 0));

  await db
    .update(waiters)
    .set({
      firstName: order?.waiterFirstName,
      lastName: order?.waiterLastName,
    })
    .where(eq(waiters.id, order?.waiter_id ?? 0));

  await db
    .update(orders)
    .set({
      details: order.details,
      price: parseInt(order?.price),
    })
    .where(eq(orders.id, order.order_id ?? 0));

  revalidatePath("/");
}
