
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="group p-3">
      <div className="relative overflow-hidden rounded-md mb-3 bg-gray-100 aspect-[3/4]">
        <Skeleton className="w-full h-full" />
      </div>
      <Skeleton className="h-5 w-3/4 mb-2" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/5" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
