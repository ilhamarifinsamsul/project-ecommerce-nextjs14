import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

const supabase = createClient(supabaseUrl, supabaseKey);

export const getImageUrl = (
  name: string,
  path: "brands" | "products" = "brands"
) => {
  const { data } = supabase.storage
    .from("belanja")
    .getPublicUrl(`public/${path}/${name}`);

  return data.publicUrl;
};

export const uploadFile = async (
  file: File,
  path: "brands" | "products" = "brands"
) => {
  const fileType = file.type.split("/")[1];
  const fileName = `${path}-${Date.now()}.${fileType}`;

  const { error } = await supabase.storage
    .from("belanja")
    .upload(`public/${path}/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }

  return fileName;
};

// delete file
export const deleteFile = async (
  fileName: string,
  path: "brands" | "products" = "brands"
) => {
  const { error } = await supabase.storage
    .from("belanja")
    .remove([`public/${path}/${fileName}`]);

  if (error) {
    throw new Error(`Failed to delete file: ${error.message}`);
  }
};
