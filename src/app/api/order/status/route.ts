import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const code = body.data.reference_id;
    console.log("Received webhook data:", body.data);

    await prisma.order.update({
      where: {
        code: code,
      },
      data: { status: body.data.status === "SUCCEEDED" ? "success" : "failed" },
    });

    // TAMBAHKAN RETURN INI! 👇
    return NextResponse.json({
      status: true,
      message: "Order updated successfully",
    });
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json(
      {
        status: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
