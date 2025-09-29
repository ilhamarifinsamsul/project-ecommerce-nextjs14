"use server";

import { ActionResult } from "@/types";
import prisma from "../../../../../../../lib/prisma";
import { schemaBrand } from "@/lib/schema";
import { deleteFile, uploadFile } from "@/lib/supabase";

export async function postBrand(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaBrand.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  try {
    const fileName = await uploadFile(validate.data.image, "brands");

    await prisma.brand.create({
      data: {
        name: validate.data.name,
        logo: fileName,
      },
    });

    return {
      error: "",
      success: "Brand created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create brand",
    };
  }
}

// update Brand
export async function updateBrand(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> {
  const fileUpload = formData.get("image");
  const validate = schemaBrand.pick({ name: true }).safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  const brand = await prisma.brand.findFirst({
    where: { id },
    select: { logo: true },
  });

  let fileName = brand?.logo;

  if (fileUpload instanceof File && fileUpload.size > 0) {
    fileName = await uploadFile(fileUpload, "brands");
  }

  try {
    await prisma.brand.update({
      where: { id },
      data: {
        name: validate.data.name,
        logo: fileName || undefined,
      },
    });

    return {
      error: "",
      success: "Brand updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update brand",
    };
  }
}

// delete Brand
export async function deleteBrand(
  _: unknown,
  id: number | undefined,
  formData: FormData
): Promise<ActionResult> {
  if (!id === undefined) {
    return {
      error: "Brand not found",
    };
  }

  const brand = await prisma.brand.findFirst({
    where: { id },
    select: { logo: true },
  });
  if (!brand) {
    return {
      error: "Brand not found",
    };
  }

  try {
    deleteFile(brand.logo, "brands");
    await prisma.brand.delete({
      where: { id },
    });
    return {
      error: "",
      success: "Brand deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete brand",
    };
  }
}
