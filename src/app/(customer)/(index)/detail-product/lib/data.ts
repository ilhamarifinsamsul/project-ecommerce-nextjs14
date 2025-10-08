import { redirect } from "next/navigation";
import prisma from "../../../../../../lib/prisma";
import { getImageUrl } from "@/lib/supabase";

export async function getProductsById(id: number) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        _count: {
          select: {
            orders: true,
          },
        },
        image: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    // mapping data
    if (!product) {
      return redirect("/");
    }

    return {
      ...product,
      image: product.image.map((img) => {
        return getImageUrl(img, "products");
      }),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
