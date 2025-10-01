import prisma from "../../../../../../../lib/prisma";
import { TColumn } from "../columns";
import { getImageUrl } from "@/lib/supabase";

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        products: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // mapping data
    const mappedOrders: TColumn[] = orders.map((order) => {
      return {
        id: order.id,
        product: order.products.map((item) => {
          return {
            name: item.product.name,
            image: getImageUrl(item.product.image[0]),
          };
        }),
        customer_name: order.user.name,
        price: Number(order.total),
        status: order.status,
      };
    });

    return mappedOrders;
  } catch (error) {
    console.log(error);
    return [];
  }
}
