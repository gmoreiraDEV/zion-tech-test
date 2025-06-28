import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export async function uploadFile(file: File, userId: string) {
  const timestamp = Date.now();
  const safeFileName = `${timestamp}-${file.name.replace(/\s+/g, "_")}`;
  const filePath = `${userId}/${safeFileName}`;
  const bucketName = "zion-community";

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  console.log(data);

  if (error) {
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}
