// use server
"use server";

import { redirect } from "next/navigation";
import { ActionResult } from "@/types";
import prisma from "../../../../../lib/prisma";
import { schemaSignUp, signInSchema } from "@/lib/schema";
import bcrypt from "bcryptjs";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export async function SignIn(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  try {
    // Cari user di database
    const existingUser = await prisma.user.findFirst({
      where: {
        email: validate.data.email,
        role: "customer",
      },
    });

    if (!existingUser) {
      return {
        error: "Invalid email or password", // Lebih secure
      };
    }

    // Cek password
    const isPasswordValid = await bcrypt.compare(
      validate.data.password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return {
        error: "Invalid email or password",
      };
    }

    // Buat session
    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/");
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
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
  const hashedPassword = await bcrypt.hash(validate.data.password, 10);

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

// function untuk logout
export async function Logout() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value;

  if (!sessionId) {
    return redirect("/");
  }

  await lucia.invalidateSession(sessionId);
  cookieStore.delete(lucia.sessionCookieName);
  return redirect("/");
}
