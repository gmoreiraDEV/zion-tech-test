import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export async function uploadFile(file: File, userId: string) {
  const timestamp = Date.now();
  const safeFileName = `${timestamp}-${file.name.replace(/\s+/g, "_")}`;
  const filePath = `${userId}/${safeFileName}`;
  const bucketName = "zion";

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data: signedUrl } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return signedUrl.publicUrl;
}
