import { prisma } from "../lib/utils";
import { createClient } from "../lib/supabase/serverClient";

const supabase = await createClient();

export const getAuthUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  return {
    user: data?.user ?? null,
    error,
  };
};

export const createUser = async (data: { email: string; name?: string }) => {
  return prisma.user.create({ data });
};
