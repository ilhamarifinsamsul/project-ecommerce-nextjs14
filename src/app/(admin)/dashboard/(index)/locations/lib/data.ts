import prisma from "../../../../../../../lib/prisma";

// Ambil semua data location
export async function getLocations() {
  try {
    const location = await prisma.location.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return location;
  } catch (error) {
    console.log("Error fetching locations:", error);
    return [];
  }
}

// Ambil data location berdasarkan id
export async function getLocationById(id: string) {
  try {
    const location = await prisma.location.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });
    return location;
  } catch (error) {
    console.log("Error fetching location:", error);
    return null;
  }
}
