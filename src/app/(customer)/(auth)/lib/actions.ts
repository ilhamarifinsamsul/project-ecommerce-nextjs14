// use server
"use server";

import { redirect } from "next/navigation";
import { ActionResult } from "@/types";
import prisma from "../../../../../lib/prisma";
import { schemaSignUp, signInSchema } from "@/lib/schema";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function SignIn(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  // validasi
  const validate = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  //   cari user di database
  const existingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
      role: "customer",
    },
  });

  if (!existingUser) {
    return {
      error: "User not found",
    };
  }
  //   cek/bandingkan password
  const isPasswordValid = await bcrypt.compare(
    validate.data.password,
    existingUser.password
  );

  if (!isPasswordValid) {
    return {
      error: "Invalid password",
    };
  }

  //   Buat session pakai lucia
  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  //   redirect jika sukses
  redirect("/");
}

// function untuk sign-up
export async function SignUp(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  // validasi
  const validate = schemaSignUp.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  //   hash password
  const hashedPassword = await bcrypt.hashSync(validate.data.password, 10);

  //   buat user di database
  try {
    await prisma.user.create({
      data: {
        name: validate.data.name,
        email: validate.data.email,
        password: hashedPassword,
        role: "customer",
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create user",
    };
  }
  return redirect(
    "/sign-in?success=Account created successfully, please login"
  );
}
