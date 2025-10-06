import React, { ReactNode } from "react";
import { getMostPickedProducts, getNewReleaseProducts } from "../lib/data";

import CardProduct from "./card-product";

// buat props
interface ListProductProps {
  title: ReactNode;
  type: "most-picked" | "new-release";
}

export default async function ListProduct({ title, type }: ListProductProps) {
  const product =
    type === "most-picked"
      ? await getMostPickedProducts()
      : await getNewReleaseProducts();

  return (
    <div id="picked" className="flex flex-col gap-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl leading-[34px] text-gray-700">
          {title}
        </h2>
        <a
          href="/"
          className="p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold text-gray-700"
        >
          Explore All
        </a>
      </div>
      <div className="grid grid-cols-5 gap-[30px]">
        {product.map((product) => (
          <CardProduct
            key={`${product.name + product.id}`}
            product={{
              category_name: product.category.name,
              id: product.id,
              image_url: product.image_url,
              name: product.name,
              price: Number(product.price),
            }}
          />
        ))}
      </div>
    </div>
  );
}
