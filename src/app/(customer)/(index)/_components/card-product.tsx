import React from "react";
import Link from "next/link";
import { rupiah } from "@/lib/utils";

// add tyoe product
type TProduct = {
  id: number;
  name: string;
  image_url: string;
  price: number;
  category_name: string;
};

// interface untuk card product
interface CardProductProps {
  product: TProduct;
}

export default function CardProduct({ product }: CardProductProps) {
  return (
    <Link href={"#"} className="product-card" key={product.name + product.id}>
      <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full text-gray-700">
        <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-1">
            <p className="font-semibold leading-[22px] text-gray-700">
              {product.category_name}
            </p>
            <p className="text-sm text-gray-600">{product.name}</p>
          </div>
          <p className="font-semibold text-[#0D5CD7] leading-[22px]">
            {rupiah(Number(product.price))}
          </p>
        </div>
      </div>
    </Link>
  );
}
