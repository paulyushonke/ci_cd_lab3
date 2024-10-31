import { OrderManagement } from "./OrderManagment";

import { selectAllOrders } from "~/lib/selectAllOrders";

export default async function HomePage() {
  const orders_info = await selectAllOrders();
  console.log(orders_info);
  return <OrderManagement orders={orders_info} />;
}
