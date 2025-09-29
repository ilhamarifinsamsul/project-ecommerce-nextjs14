"use server";

import prisma from "../../../../../../../lib/prisma";
import { ActionResult } from "@/types";
import { schemaLocation } from "@/lib/schema";

// function post Location
export async function postLocation(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaLocation.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  try {
    await prisma.location.create({
      data: {
        name: validate.data.name,
      },
    });
    return {
      error: "",
      success: "Location created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create location",
    };
  }
}

// update Location
export async function updateLocation(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> {
  const validate = schemaLocation.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  if (!id === undefined) {
    return {
      error: "Location not found",
    };
  }

  try {
    await prisma.location.update({
      where: {
        id: id,
      },
      data: {
        name: validate.data.name,
      },
    });
    return {
      error: "",
      success: "Location updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update location",
    };
  }
}

// delete Location
export async function deleteLocation(
  _: unknown,
  id: number | undefined,
  formData: FormData
) {
  if (!id === undefined) {
    return {
      error: "Location not found",
    };
  }

  try {
    await prisma.location.delete({
      where: {
        id: id,
      },
    });
    return {
      error: "",
      success: "Location deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete location",
    };
  }
}
