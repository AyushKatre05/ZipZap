"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ListOrdered,
  LogOut,
  Package,
  Printer,
  SendToBack,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const menuItems = [
  { name: "Products", icon: Package, href: "/super-admin/products/list" },
  { name: "Add Product", icon: Printer, href: "/super-admin/products/add" },
  { name: "Orders", icon: SendToBack, href: "/super-admin/orders" },
  { name: "Coupons", icon: FileText, href: "/super-admin/coupons/list" },
  { name: "Create Coupon", icon: ListOrdered, href: "/super-admin/coupons/add" },
  { name: "Settings", icon: Settings, href: "/super-admin/settings" },
  { name: "Logout", icon: LogOut, href: "" },
];

function SuperAdminSidebar({ isOpen, toggle }: SidebarProps) {
  const router = useRouter();
  const { logout } = useAuthStore();

  async function handleLogout() {
    await logout();
    router.push("/auth/login");
  }

  return (
    <motion.div
      initial={{ width: isOpen ? 250 : 80 }}
      animate={{ width: isOpen ? 250 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed left-0 top-0 z-50 h-screen border-r backdrop-blur-lg bg-white/10 dark:bg-black/10 shadow-lg transition-all duration-300",
        "flex flex-col items-center py-6"
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="mb-6 p-2 rounded-full bg-white/20 hover:bg-white/30"
        onClick={toggle}
      >
        {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </Button>

      {/* Sidebar Menu */}
      <div className="flex flex-col space-y-4 w-full">
        {menuItems.map((item) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={item.name}
            onClick={item.name === "Logout" ? handleLogout : () => router.push(item.href)}
            className={cn(
              "group flex items-center w-full p-3 rounded-xl cursor-pointer transition-all",
              "hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white"
            )}
          >
            <item.icon className="h-5 w-5 text-gray-500 group-hover:text-white" />
            {isOpen && <span className="ml-4 text-sm font-medium">{item.name}</span>}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default SuperAdminSidebar;
