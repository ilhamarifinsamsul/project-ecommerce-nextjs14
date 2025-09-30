// use server
"use server";

import { schemaProduct, schemaProductEdit } from "@/lib/schema";
import { uploadFile, deleteFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import prisma from "../../../../../../../lib/prisma";
import { ProductStock } from "@prisma/client";

export async function storeProduct(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaProduct.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    image: formData.getAll("image"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  //   upload image
  const uploadedImage = validate.data.image as File[];
  const fileNames = [];

  //   perulangan for
  for (const image of uploadedImage) {
    const fileName = await uploadFile(image, "products");
    fileNames.push(fileName);
  }

  //   masukkan ke database
  try {
    await prisma.product.create({
      data: {
        name: validate.data.name,
        description: validate.data.description,
        price: Number.parseInt(validate.data.price),
        stock: validate.data.stock as ProductStock,
        brand_id: Number.parseInt(validate.data.brand_id),
        category_id: Number.parseInt(validate.data.category_id),

        location_id: Number.parseInt(validate.data.location_id),
        image: fileNames,
      },
    });
    return {
      error: "",
      success: "Product created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create product",
    };
  }
}

// update product
export async function updateProduct(
  _: unknown,
  id: number,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaProductEdit.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    id: id,
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  //   ambil data product in database
  const product = await prisma.product.findFirst({
    where: {
      id: id,
    },
  });

  if (!product) {
    return {
      error: "Product not found",
    };
  }

  //   upload image
  const uploadedImage = formData.getAll("image") as File[];
  let fileNames = [];

  if (uploadedImage.length === 3) {
    // parse image
    const parseImage = schemaProduct
      .pick({
        image: true,
      })
      .safeParse({
        image: uploadedImage,
      });

    if (!parseImage.success) {
      return {
        error: parseImage.error.issues[0].message,
      };
    }
    // perulangan for
    for (const image of uploadedImage) {
      const fileName = await uploadFile(image, "products");
      fileNames.push(fileName);
    }
  } else {
    fileNames = product.image;
  }

  //   trycatch
  try {
    await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: validate.data.name,
        description: validate.data.description,
        price: Number.parseInt(validate.data.price),
        stock: validate.data.stock as ProductStock,
        brand_id: Number.parseInt(validate.data.brand_id),
        category_id: Number.parseInt(validate.data.category_id),
        location_id: Number.parseInt(validate.data.location_id),
        image: fileNames,
      },
    });
    return {
      error: "",
      success: "Product updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update product",
    };
  }
}

// delete product
export async function deleteProduct(
  _: unknown,
  id: number,
  formData: FormData
): Promise<ActionResult> {
  if (!id) {
    return {
      error: "Product not found",
    };
  }

  const product = await prisma.product.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      image: true,
    },
  });

  if (!product) {
    return {
      error: "Product not found",
    };
  }

  //   delete image yang ada di supabase
  if (Array.isArray(product.image)) {
    for (const image of product.image) {
      await deleteFile(image, "products");
    }
  } else if (typeof product.image === "string") {
    await deleteFile(product.image, "products");
  }

  try {
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return {
      error: "",
      success: "Product deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete product",
    };
  }
}
