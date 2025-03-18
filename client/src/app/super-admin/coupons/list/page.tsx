"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCouponStore } from "@/store/useCouponStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Trash2, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

function SuperAdminCouponsListingPage() {
  const { isLoading, couponList, fetchCoupons, deleteCoupon } = useCouponStore();
  const router = useRouter();
  const fetchCouponRef = useRef(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!fetchCouponRef.current) {
      fetchCoupons();
      fetchCouponRef.current = true;
    }
  }, [fetchCoupons]);

  const handleDeleteCoupon = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      const result = await deleteCoupon(id);
      if (result) {
        toast({ title: "Coupon deleted successfully" });
        fetchCoupons();
      }
    }
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
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">All Coupons</h1>
        <Button
          onClick={() => router.push("/super-admin/coupons/add")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Coupon
        </Button>
      </header>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center text-gray-600 dark:text-gray-400 py-6">Loading Coupons...</div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Table className="bg-white/50 shadow-md rounded-xl overflow-hidden">
            <TableHeader className="bg-gray-100 dark:bg-gray-800">
              <TableRow>
                <TableHead className="px-4 py-3">Code</TableHead>
                <TableHead className="px-4 py-3">Discount</TableHead>
                <TableHead className="px-4 py-3">Usage</TableHead>
                <TableHead className="px-4 py-3">Start Date</TableHead>
                <TableHead className="px-4 py-3">End Date</TableHead>
                <TableHead className="px-4 py-3">Status</TableHead>
                <TableHead className="px-4 py-3 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {couponList.map((coupon) => (
                <TableRow key={coupon.id} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                  <TableCell className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">{coupon.code}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">{coupon.discountPercent}%</TableCell>
                  <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {coupon.usageCount}/{coupon.usageLimit}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {format(new Date(coupon.startDate), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {format(new Date(coupon.endDate), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge className={`px-3 py-1 rounded-full ${new Date(coupon.endDate) > new Date() ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                      {new Date(coupon.endDate) > new Date() ? "Active" : "Expired"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center">
                    <Button
                      onClick={() => handleDeleteCoupon(coupon.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      )}
    </motion.div>
  );
}

export default SuperAdminCouponsListingPage;
