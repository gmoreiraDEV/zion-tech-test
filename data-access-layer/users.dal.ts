import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserId = async (id: string): Promise<any> => {
  const { data, error } = await supabase
    .from("User")
    .select()
    .limit(1)
    .eq("authUserId", id);
  if (error) return error;
  return data[0];
};
