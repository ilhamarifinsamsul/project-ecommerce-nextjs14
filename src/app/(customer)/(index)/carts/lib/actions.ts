"use server";

import { getUser } from "@/lib/auth";
import { schemaShippingAddress } from "@/lib/schema";
import { ActionResult, TCart } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../lib/prisma";
import { generateRandomString } from "@/lib/utils";
import {
  PaymentRequestParameters,
  PaymentRequest,
} from "xendit-node/payment_request/models";
import xenditClient from "@/lib/xendit";
import { Prisma } from "@prisma/client";

export async function StoreOrder(
  _: unknown,
  formData: FormData,
  total: number,
  products: TCart[]
): Promise<ActionResult> {
  const { session, user } = await getUser();
  if (!session) {
    return {
      error: "You are not logged in",
    };
  }

  //   parse
  const parse = schemaShippingAddress.safeParse({
    name: formData.get("name") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    notes: formData.get("notes") as string,
    phone: formData.get("phone") as string,
  });

  if (!parse.success) {
    return {
      error: parse.error.issues[0].message,
    };
  }

  let redirectPaymentUrl = "/";

  //   trycatch
  try {
    const order = await prisma.order.create({
      data: {
        total: total,
        status: "pending",
        user_id: user.id,
        code: generateRandomString(15),
      },
    });
    const data: PaymentRequestParameters = {
      amount: total,
      paymentMethod: {
        ewallet: {
          channelProperties: {
            successReturnUrl: process.env.NEXT_PUBLIC_REDIRECT_URL,
          },
          channelCode: "SHOPEEPAY",
        },
        reusability: "ONE_TIME_USE",
        type: "EWALLET",
      },
      currency: "IDR",
      referenceId: order.code,
    };
    const response: PaymentRequest =
      await xenditClient.PaymentRequest.createPaymentRequest({
        data: data,
      });
    redirectPaymentUrl =
      response.actions?.find((val) => val.urlType === "DEEPLINK")?.url ?? "/";

    // Data Product yang dibeli dan shipping address
    const queryCreateProductOrder: Prisma.OrderProductCreateManyInput[] = [];
    // looping for
    for (const product of products) {
      queryCreateProductOrder.push({
        order_id: order.id,
        product_id: product.id,
        quantity: product.quantity,
        subtotal: product.price,
      });
    }
    // simpan ke database
    await prisma.orderProduct.createMany({
      data: queryCreateProductOrder,
    });

    // shipping
    await prisma.orderDetail.create({
      data: {
        address: parse.data.address,
        city: parse.data.city,
        name: parse.data.name,
        notes: parse.data.notes,
        order_id: order.id,
        phone: parse.data.phone,
        postal_code: parse.data.postal_code,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }

  return redirect(redirectPaymentUrl);
}
