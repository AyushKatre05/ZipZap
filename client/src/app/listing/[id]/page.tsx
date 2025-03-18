import { Suspense } from "react";
import ProductDetailsSkeleton from "./productSkeleton";
import ProductDetailsContent from "./productDetails";

// ✅ Correctly define the props type
interface ProductDetailsPageProps {
  params: { id: string };
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsContent id={params.id} />
    </Suspense>
  );
}
