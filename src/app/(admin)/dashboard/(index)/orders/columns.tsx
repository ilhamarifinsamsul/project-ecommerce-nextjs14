// use client
"use client";

import { StatusOrder } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { rupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// type TProduct
type TProduct = {
  name: string;
  image: string;
};

// export TColumn

export type TColumn = {
  id: number;
  product: TProduct[];
  customer_name: string;
  price: number;
  status: StatusOrder;
};

export const columns: ColumnDef<TColumn>[] = [
  {
    id: "No",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Products",
    accessorKey: "product",
    cell: ({ row }) => {
      const order = row.original;
      // pastikan order.product itu array
      if (!Array.isArray(order.product)) {
        return null;
      }

      return (
        <div className="flex gap-4 flex-col justify-start">
          {order.product.map((product, index) => (
            <div
              className="flex items-center gap-4"
              key={`${product.name}-${index}`}
            >
              <Image
                src={product.image ? getImageUrl(product.image) : ""}
                alt={product.name}
                width={50}
                height={50}
                className="rounded-md object-cover"
              ></Image>
              <span className="text-sm font-medium">{product.name}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    header: "Customer Name",
    accessorKey: "customer_name",
  },
  {
    header: "Total Price",
    accessorKey: "price",
    cell: ({ row }) => {
      const order = row.original;
      return rupiah(order.price);
    },
  },
  {
    header: "Status Order",
    accessorKey: "status",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <Badge
          variant={order.status === "failed" ? "destructive" : "default"}
          className="capitalize"
        >
          {order.status}
        </Badge>
      );
    },
  },
];
