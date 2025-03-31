
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="group">
      <div className="relative overflow-hidden mb-3">
        <Skeleton className="w-full h-[300px]" />
      </div>
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
};

export default ProductCardSkeleton;
