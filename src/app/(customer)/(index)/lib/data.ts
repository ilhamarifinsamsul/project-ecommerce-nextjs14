import { getImageUrl } from "@/lib/supabase";
import prisma from "../../../../../lib/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      select: {
        image: true,
        id: true,
        name: true,
        category: {
          select: {
            name: true,
          },
        },
        price: true,
      },
    });
    // mapping data
    const mappedProduct = products.map((item) => {
      return {
        ...item,
        image_url: getImageUrl(item.image[0], "products"),
      };
    });

    return mappedProduct;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// getBrands
export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      select: {
        name: true,
        logo: true,
      },
    });
    //  mapping data
    return brands.map((item) => ({
      ...item,
      image_url: getImageUrl(item.logo, "brands"),
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

// most picked product
export async function getMostPickedProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 4,
      orderBy: {
        orders: { _count: "desc" }, // urutkan paling banyak dibeli
      },
      include: {
        category: { select: { name: true } },
        _count: { select: { orders: true } },
      },
    });
    // mapping data
    return products.map((item) => ({
      ...item,
      ordersCount: item._count.orders,
      image_url: getImageUrl(item.image[0], "products"),
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

// new realese product
export async function getNewReleaseProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { name: true } },
      },
    });
    // mapping data
    return products.map((item) => ({
      ...item,
      image_url: getImageUrl(item.image[0], "products"),
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}
