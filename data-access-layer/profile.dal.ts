import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export async function getIsProfileCompleted(userId: string) {
  const { data, error } = await supabase
    .from("User")
    .select("*")
    .eq("authUserId", userId)
    .limit(1)

  if (error) throw new Error(error.message);
  return data[0]?.profileCompleted;
}
