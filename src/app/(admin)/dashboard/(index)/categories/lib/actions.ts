"use server";

import prisma from "../../../../../../../lib/prisma";
import { ActionResult } from "@/types";
import { schemaCategory } from "@/lib/schema";

export async function postCategory(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaCategory.safeParse({
    name: formData.get("name"),
  });
  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  try {
    await prisma.category.create({
      data: {
        name: validate.data.name,
      },
    });
    return {
      error: "",
      success: "Category created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create category",
    };
  }
}

// update Category
export async function updateCategory(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {
  const validate = schemaCategory.safeParse({
    name: formData.get("name"),
  });
  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  if (!id === undefined) {
    return {
      error: "Category not found",
    };
  }

  try {
    await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: validate.data.name,
      },
    });
    return {
      error: "",
      success: "Category updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update category",
    };
  }
}

// delete Category
export async function deleteCategory(
  _: unknown,
  id: number | undefined,
  _formData: FormData
): Promise<ActionResult> {
  if (!id === undefined) {
    return {
      error: "Category not found",
    };
  }

  try {
    await prisma.category.delete({
      where: {
        id: id,
      },
    });
    return {
      error: "",
      success: "Category deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete category",
    };
  }
}
