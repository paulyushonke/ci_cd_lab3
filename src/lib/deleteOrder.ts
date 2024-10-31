"use server"; // don't forget to add this!

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "~/server/db";
import { orderCards } from "~/server/db/schema";

// This schema is used to validate input from client.

export async function deleteOrder({ id }: { id: number }) {
  await db.delete(orderCards).where(eq(orderCards.id, id));
  revalidatePath("/");
}
