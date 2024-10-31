"use server"; // don't forget to add this!

import { db } from "~/server/db";

import {
  clients,
  locations,
  orderCards,
  waiters,
  orders,
} from "~/server/db/schema";

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
export async function addNewOrder({ order }: { order: OrdersType }) {
  console.log("or", order);

  const client_id = await db
    .insert(clients)
    .values({
      firstName: order?.clientFirstName,
      lastName: order?.clientLastName,
      phone: "1234567890",
    })
    .returning({ id: clients.id });

  const location_id = await db
    .insert(locations)
    .values({
      address: order?.address,
      details: order?.details,
    })
    .returning({ id: locations.id });

  const waiters_id = await db
    .insert(waiters)
    .values({
      firstName: order?.waiterFirstName,
      lastName: order?.waiterLastName,
    })
    .returning({ id: waiters.id });

  const order_id = await db
    .insert(orders)
    .values({
      details: order.details,
      price: parseInt(order?.price),
    })
    .returning({ id: orders.id });

  await db.insert(orderCards).values({
    clientId: client_id[0]?.id,
    waiterId: waiters_id[0]?.id,
    orderId: order_id[0]?.id,
    locationId: location_id[0]?.id,
  });

  revalidatePath("/");
}
