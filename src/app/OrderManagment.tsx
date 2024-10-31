"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { type selectAllOrders } from "~/lib/selectAllOrders";
import { type UnwrapPromise } from "next/dist/lib/coalesced-function";
import { deleteOrder } from "~/lib/deleteOrder";

import { updateOrder } from "~/lib/updateOrder";
import { addNewOrder } from "~/lib/addNewOrder";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Separator } from "@radix-ui/react-separator";

type OrdersType = UnwrapPromise<ReturnType<typeof selectAllOrders>>;
export function OrderManagement({ orders }: { orders: OrdersType }) {
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrdersType[0] | null>(
    null,
  );
  const [formData, setFormData] = useState({
    order_id: 0,
    client_id: 0,
    waiter_id: 0,
    location_id: 0,
    clientFirstName: "",
    clientLastName: "",
    waiterFirstName: "",
    waiterLastName: "",
    details: "",
    price: "",
    address: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto py-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              ☁️ CI/CD Laboratory work #3
            </h1>
            <p className="text-lg text-gray-600">
              Skuratovets Polina KN-222b.e
            </p>
          </div>
          <Separator className="my-4" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-10">
            <CardTitle className="text-3xl font-bold">
              Orders Management System
            </CardTitle>
            <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 text-xl">
                  <PlusCircle className="h-4 w-4" />
                  Add New Order
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Order</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new order
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientFirstName">Client First Name</Label>
                      <Input
                        id="clientFirstName"
                        name="clientFirstName"
                        value={formData.clientFirstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientLastName">Client Last Name</Label>
                      <Input
                        id="clientLastName"
                        name="clientLastName"
                        value={formData.clientLastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="waiterFirstName">Waiter First Name</Label>
                      <Input
                        id="waiterFirstName"
                        name="waiterFirstName"
                        value={formData.waiterFirstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="waiterLastName">Waiter Last Name</Label>
                      <Input
                        id="waiterLastName"
                        name="waiterLastName"
                        value={formData.waiterLastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="details">Order Details</Label>
                    <Input
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsNewDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={async () => {
                      await addNewOrder({ order: formData });
                      setIsNewDialogOpen(false);
                      setFormData({
                        order_id: 0,
                        client_id: 0,
                        waiter_id: 0,
                        location_id: 0,
                        clientFirstName: "",
                        clientLastName: "",
                        waiterFirstName: "",
                        waiterLastName: "",
                        details: "",
                        price: "",
                        address: "",
                      });
                    }}
                  >
                    Add Order
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table className="text-base">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Client</TableHead>
                    <TableHead className="font-semibold">Waiter</TableHead>
                    <TableHead className="font-semibold">Details</TableHead>
                    <TableHead className="font-semibold">Price</TableHead>
                    <TableHead className="font-semibold">Address</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {order.client?.firstName} {order.client?.lastName}
                      </TableCell>
                      <TableCell>
                        {order.waiter?.firstName} {order.waiter?.lastName}
                      </TableCell>
                      <TableCell>{order?.order?.details}</TableCell>
                      <TableCell>${order.order?.price}</TableCell>
                      <TableCell>{order.location?.address}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setSelectedOrder(order);
                              setFormData({
                                order_id: order?.order?.id ?? 0,
                                client_id: order?.client?.id ?? 0,
                                waiter_id: order?.waiter?.id ?? 0,
                                location_id: order?.location?.id ?? 0,
                                clientFirstName: order?.client?.firstName ?? "",
                                clientLastName: order?.client?.lastName ?? "",
                                waiterFirstName: order?.waiter?.firstName ?? "",
                                waiterLastName: order?.waiter?.lastName ?? "",
                                details: order?.order?.details ?? "",
                                price: order?.order?.price.toString() ?? "",
                                address: order?.location?.address ?? "",
                              });
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Order</DialogTitle>
            <DialogDescription>
              Make changes to the order details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editClientFirstName">Client First Name</Label>
                <Input
                  id="editClientFirstName"
                  name="clientFirstName"
                  value={formData.clientFirstName}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="editClientLastName">Client Last Name</Label>
                <Input
                  id="editClientLastName"
                  name="clientLastName"
                  value={formData.clientLastName}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editWaiterFirstName">Waiter First Name</Label>
                <Input
                  id="editWaiterFirstName"
                  name="waiterFirstName"
                  value={formData.waiterFirstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="editWaiterLastName">Waiter Last Name</Label>
                <Input
                  id="editWaiterLastName"
                  name="waiterLastName"
                  value={formData.waiterLastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="editDetails">Order Details</Label>
              <Input
                id="editDetails"
                name="details"
                value={formData.details}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="editPrice">Price</Label>
              <Input
                id="editPrice"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="editAddress">Delivery Address</Label>
              <Input
                id="editAddress"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await updateOrder({ order: formData });
                setIsEditDialogOpen(false);
                setFormData({
                  order_id: 0,
                  client_id: 0,
                  waiter_id: 0,
                  location_id: 0,
                  clientFirstName: "",
                  clientLastName: "",
                  waiterFirstName: "",
                  waiterLastName: "",
                  details: "",
                  price: "",
                  address: "",
                });
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this order? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                await deleteOrder({ id: selectedOrder?.order?.id ?? 0 });
                setIsDeleteDialogOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
