import { Suspense } from "react";
import ProductDetailsSkeleton from "./productSkeleton";
import ProductDetailsContent from "./productDetails";

// Define an async function to get params
async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const resolvedParams = await Promise.resolve(params); // ✅ Ensure params is awaited properly

  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsContent id={resolvedParams.id} />
    </Suspense>
  );
}

export default ProductDetailsPage;
