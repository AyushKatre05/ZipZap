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
import { useToast } from "@/hooks/use-toast";
import { useProductStore } from "@/store/useProductStore";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function SuperAdminProductListingPage() {
  const { products, isLoading, fetchAllProductsForAdmin, deleteProduct } =
    useProductStore();
  const { toast } = useToast();
  const router = useRouter();
  const productFetchRef = useRef(false);

  useEffect(() => {
    if (!productFetchRef.current) {
      fetchAllProductsForAdmin();
      productFetchRef.current = true;
    }
  }, [fetchAllProductsForAdmin]);

  async function handleDeleteProduct(getId: string) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const result = await deleteProduct(getId);
      if (result) {
        toast({
          title: "Product deleted successfully",
        });
        fetchAllProductsForAdmin();
      }
    }
  }

  if (isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="flex flex-col gap-6">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <h1 className="text-2xl font-semibold">All Products</h1>
          <Button onClick={() => router.push("/super-admin/products/add")}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition">
            Add New Product
          </Button>
        </motion.header>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg border bg-card shadow-lg p-4"
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 text-gray-700">
                  <TableHead>Product Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="rounded-md bg-gray-100 overflow-hidden">
                          {product.images[0] && (
                            <Image
                              src={product.images[0]}
                              alt="product image"
                              width={60}
                              height={60}
                              className="object-cover w-full h-full rounded-md"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-lg">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Size: {product.sizes.join(", ")}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-lg font-semibold">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-gray-700">{product.stock} left</TableCell>
                    <TableCell className="font-medium uppercase">{product.category}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => router.push(`/super-admin/products/add?id=${product.id}`)}
                          variant="ghost"
                          size="icon"
                          className="hover:bg-gray-200 transition"
                        >
                          <Pencil className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteProduct(product.id)}
                          variant="ghost"
                          size="icon"
                          className="hover:bg-gray-200 transition"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default SuperAdminProductListingPage;