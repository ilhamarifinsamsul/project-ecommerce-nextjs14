// use server
"use server";

import { redirect } from "next/navigation";
import { ActionResult } from "@/types";
import { signInSchema } from "@/lib/schema";
import prisma from "../../../../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function SignIn(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  // validasi input pakai zod
  const validate = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    // ✅ FIXED - Return user-friendly error message
    const firstError = validate.error.issues[0];
    return {
      error: firstError.message,
    };
  }

  try {
    //   cari user di database
    const existingUser = await prisma.user.findFirst({
      where: {
        email: validate.data.email,
        role: "superadmin",
      },
    });

    if (!existingUser) {
      return {
        error: "Invalid email or password", // ✅ More secure error message
      };
    }

    //   bandingkan password
    const passwordMatch = await bcrypt.compare(
      validate.data.password,
      existingUser.password
    );

    if (!passwordMatch) {
      return {
        error: "Invalid email or password", // ✅ More secure error message
      };
    }

    //   buat session pakai lucia
    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    // redirect ke dashboard
    return redirect("/dashboard/");
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
