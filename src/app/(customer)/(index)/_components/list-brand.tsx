import React from "react";
import { getBrands } from "../lib/data";
import Link from "next/link";
import Image from "next/image";

export default async function ListBrand() {
  const brands = await getBrands();

  return (
    <div className="flex flex-col gap-[30px] text-gray-700" id="brands">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl leading-[34px]">
          Expolre Our <br /> Popular Brands
        </h2>
        <Link
          href="/"
          className="p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold"
        >
          Explore All
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-[30px]">
        {/* mapping logo/image pada brands */}
        {brands.map((brand) => (
          <Link href={"#"} className="brand-card" key={brand.image_url}>
            <div className="bg-white flex items-center justify-center p-[30px_20px] rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full h-[120px]">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={brand.image_url}
                  alt={brand.name}
                  width={120}
                  height={80}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
