"use server"; // don't forget to add this!

import { db } from "~/server/db";

// This schema is used to validate input from client.

export async function selectAllOrders() {
  const orders = await db.query.orderCards.findMany({
    with: {
      client: true,
      waiter: true,
      location: true,
      order: true,
    },
  });

  return orders;
}
