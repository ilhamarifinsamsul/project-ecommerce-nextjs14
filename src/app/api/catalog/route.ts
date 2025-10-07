import { TFilter } from "@/hooks/useFilter";
import { Prisma } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { TProduct } from "@/types";
import { getImageUrl } from "@/lib/supabase";

// API untuk Catalog
export async function POST(request: Request) {
  try {
    const res = (await request.json()) as TFilter;

    const ORQuery: Prisma.ProductWhereInput[] = [];

    // search
    if (res.search && res.search !== "") {
      ORQuery.push({
        name: {
          contains: res.search,
          mode: "insensitive",
        },
      });
    }

    // minPrice
    if (res.minPrice && res.minPrice > 0) {
      ORQuery.push({
        price: {
          gte: res.minPrice,
        },
      });
    }

    // maxPrice
    if (res.maxPrice && res.maxPrice > 0) {
      ORQuery.push({
        price: {
          lte: res.maxPrice,
        },
      });
    }

    // stock
    if (res.stock && res.stock.length > 0) {
      ORQuery.push({
        stock: {
          in: res.stock,
        },
      });
    }

    // brand
    if (res.brands && res.brands.length > 0) {
      ORQuery.push({
        brand: {
          id: {
            in: res.brands,
          },
        },
      });
    }

    // categories
    if (res.categories && res.categories.length > 0) {
      ORQuery.push({
        category: {
          id: {
            in: res.categories,
          },
        },
      });
    }

    // locations
    if (res.locations && res.locations.length > 0) {
      ORQuery.push({
        location: {
          id: {
            in: res.locations,
          },
        },
      });
    }

    const product = await prisma.product.findMany({
      where: {
        OR: ORQuery.length > 0 ? ORQuery : undefined,
      },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    // mapping data
    const response: TProduct[] = product.map((item) => ({
      id: item.id,
      name: item.name,
      price: Number(item.price),
      image_url: getImageUrl(item.image[0], "products"),
      category_name: item.category.name,
    }));

    return new Response(JSON.stringify(response));
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}
