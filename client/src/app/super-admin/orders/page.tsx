"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { AdminOrder, useOrderStore } from "@/store/useOrderStore";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED";

function SuperAdminManageOrdersPage() {
  const { getAllOrders, adminOrders, updateOrderStatus } = useOrderStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      await getAllOrders();
      setLoading(false);
    }
    fetchOrders();
  }, [getAllOrders]);

  const getStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      PENDING: "bg-blue-500",
      PROCESSING: "bg-yellow-500",
      SHIPPED: "bg-purple-500",
      DELIVERED: "bg-green-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatus(orderId, newStatus);
    toast({ title: "Status updated successfully" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-8 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl border border-white/20"
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          ORDERS LIST
        </h1>
      </header>

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-gray-600 dark:text-gray-400 py-6">
          Loading Orders...
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Table className="bg-white/50 shadow-md rounded-xl overflow-hidden">
            <TableHeader className="bg-gray-100 dark:bg-gray-800">
              <TableRow>
                <TableHead className="px-4 py-3">Order ID</TableHead>
                <TableHead className="px-4 py-3">Created At</TableHead>
                <TableHead className="px-4 py-3">Customer</TableHead>
                <TableHead className="px-4 py-3">Total</TableHead>
                <TableHead className="px-4 py-3">Payment Status</TableHead>
                <TableHead className="px-4 py-3">Items</TableHead>
                <TableHead className="px-4 py-3">Order Status</TableHead>
                <TableHead className="px-4 py-3 text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-700 dark:text-gray-300 py-4">
                    No Orders Found
                  </TableCell>
                </TableRow>
              ) : (
                adminOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                    <TableCell className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">
                      {order.id}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {order.user.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      ${order.total.toFixed(2)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {order.paymentStatus}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {order.items.length} {order.items.length > 1 ? "Items" : "Item"}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge className={`${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center">
                      <Select
                        defaultValue={order.status}
                        onValueChange={(value) => handleStatusUpdate(order.id, value as OrderStatus)}
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="PROCESSING">Processing</SelectItem>
                          <SelectItem value="SHIPPED">Shipped</SelectItem>
                          <SelectItem value="DELIVERED">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </motion.div>
      )}
    </motion.div>
  );
}

export default SuperAdminManageOrdersPage;
