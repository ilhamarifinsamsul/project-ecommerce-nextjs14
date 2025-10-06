"use client";

import { useFilter } from "@/hooks/useFilter";
import { ProductStock } from "@prisma/client";
import React, { ChangeEvent } from "react";

// buat interface untuk filter checkbox pada category/brand/stock/location
interface FilterCheckboxItemProps {
  id: string;
  value: string;
  type?: "category" | "brand" | "stock" | "location";
}
export default function FilterCheckboxItem({
  id,
  value,
  type,
}: FilterCheckboxItemProps) {
  const { filter, setFilter } = useFilter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case "stock":
        if (e.target.checked) {
          setFilter({
            stock: [...(filter?.stock ?? []), e.target.value as ProductStock],
          });
        } else {
          setFilter({
            stock: filter?.stock?.filter(
              (stock) => stock !== (e.target.value as ProductStock)
            ),
          });
        }
        break;
      case "brand": {
        if (e.target.checked) {
          setFilter({
            brands: [
              ...(filter?.brands ?? []),
              Number.parseInt(e.target.value),
            ],
          });
        } else {
          setFilter({
            brands: filter?.brands?.filter(
              (brand) => brand !== Number.parseInt(e.target.value)
            ),
          });
        }
      }
      case "category": {
        if (e.target.checked) {
          setFilter({
            categories: [
              ...(filter?.categories ?? []),
              Number.parseInt(e.target.value),
            ],
          });
        } else {
          setFilter({
            categories: filter?.categories?.filter(
              (category) => category !== Number.parseInt(e.target.value)
            ),
          });
        }
      }
      case "location": {
        if (e.target.checked) {
          setFilter({
            locations: [
              ...(filter?.locations ?? []),
              Number.parseInt(e.target.value),
            ],
          });
        } else {
          setFilter({
            locations: filter?.locations?.filter(
              (location) => location !== Number.parseInt(e.target.value)
            ),
          });
        }
      }

      default:
        break;
    }
  };
  return (
    <label
      className="font-semibold flex items-center gap-3"
      htmlFor={id + value}
    >
      <input
        type="checkbox"
        id={id + value}
        value={id}
        onChange={handleChange}
        className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
      />
      <span>{value}</span>
    </label>
  );
}
