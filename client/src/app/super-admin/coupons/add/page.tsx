"use client";

import { protectCouponFormAction } from "@/actions/coupon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCouponStore } from "@/store/useCouponStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

function SuperAdminManageCouponsPage() {
  const [formData, setFormData] = useState({
    code: "",
    discountPercent: 0,
    startDate: "",
    endDate: "",
    usageLimit: 0,
  });
  const router = useRouter();
  const { toast } = useToast();
  const { createCoupon, isLoading } = useCouponStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateUniqueCoupon = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setFormData((prev) => ({
      ...prev,
      code: result,
    }));
  };

  const handleCouponSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      toast({
        title: "End date must be after start date",
        variant: "destructive",
      });
      return;
    }

    const checkCouponFormvalidation = await protectCouponFormAction();
    if (!checkCouponFormvalidation.success) {
      toast({
        title: checkCouponFormvalidation.error,
        variant: "destructive",
      });
      return;
    }

    const couponData = {
      ...formData,
      discountPercent: parseFloat(formData.discountPercent.toString()),
      usageLimit: parseInt(formData.usageLimit.toString()),
    };

    const result = await createCoupon(couponData);
    if (result) {
      toast({ title: "Coupon added successfully" });
      router.push("/super-admin/coupons/list");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-8 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl border border-white/20"
    >
      {/* Page Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Create New Coupon</h1>
      </header>

      {/* Coupon Form */}
      <motion.form
        onSubmit={handleCouponSubmit}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="space-y-6">
          {/* Start Date */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Label className="text-gray-700 dark:text-gray-300">Start Date</Label>
            <Input
              value={formData.startDate}
              onChange={handleInputChange}
              name="startDate"
              type="date"
              className="mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </motion.div>

          {/* End Date */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Label className="text-gray-700 dark:text-gray-300">End Date</Label>
            <Input
              value={formData.endDate}
              onChange={handleInputChange}
              name="endDate"
              type="date"
              className="mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </motion.div>

          {/* Coupon Code */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Label className="text-gray-700 dark:text-gray-300">Coupon Code</Label>
            <div className="flex gap-2 mt-2">
              <Input
                type="text"
                name="code"
                placeholder="Enter coupon code"
                className="rounded-xl border border-gray-300 flex-1"
                required
                value={formData.code}
                onChange={handleInputChange}
              />
              <Button type="button" onClick={handleCreateUniqueCoupon} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Generate Code
              </Button>
            </div>
          </motion.div>

          {/* Discount Percentage */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Label className="text-gray-700 dark:text-gray-300">Discount Percentage</Label>
            <Input
              type="number"
              name="discountPercent"
              placeholder="Enter discount percentage"
              className="mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              required
              value={formData.discountPercent}
              onChange={handleInputChange}
            />
          </motion.div>

          {/* Usage Limits */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Label className="text-gray-700 dark:text-gray-300">Usage Limits</Label>
            <Input
              type="number"
              name="usageLimit"
              placeholder="Enter usage limits"
              className="mt-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              required
              value={formData.usageLimit}
              onChange={handleInputChange}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button disabled={isLoading} type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-md">
              {isLoading ? "Creating..." : "Create Coupon"}
            </Button>
          </motion.div>
        </div>
      </motion.form>
    </motion.div>
  );
}

export default SuperAdminManageCouponsPage;
