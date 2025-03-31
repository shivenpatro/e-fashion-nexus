
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const ProductCardSkeleton = () => {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-sm p-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden rounded-md bg-gray-100 aspect-[3/4]">
        <Skeleton className="w-full h-full" />
      </div>
      <Skeleton className="h-5 w-3/4 mt-3 mb-2" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-1/3" />
        <div className="flex space-x-1">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardSkeleton;
