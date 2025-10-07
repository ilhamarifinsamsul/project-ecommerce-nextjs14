"use client";

import React from "react";
import CardProduct from "../../_components/card-product";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../lib/data";
import { useFilter } from "@/hooks/useFilter";

export default function ProductListing() {
  // filter
  const { filter } = useFilter();

  const { data, isLoading } = useQuery({
    queryKey: ["product-listing", filter],
    queryFn: () => fetchProduct(filter),
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="ml-3 text-sm text-muted-foreground">Loading...</span>
      </div>
    );

  return (
    <div className="grid grid-cols-3 gap-[30px]">
      {/* mapping */}
      {data?.map((product) => (
        <CardProduct key={product.id + product.name} product={product} />
      ))}
    </div>
  );
}
