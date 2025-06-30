/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export async function getUserProfile() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) throw new Error("Usuário não encontrado");

  return {
    id: user.id,
    email: user.email,
    ...user.user_metadata,
  };
}

export const updateUserProfile = async (payload: {
    full_name: string;
    avatar_url?: string;
    bio: string;
}): Promise<any> => {
  const { data, error } = await supabase.auth.updateUser({
    data: { 
      full_name:payload.full_name,
      avatar_url:payload.avatar_url,
      bio: payload.bio,
      profile_completed: true
    }
  })

  if (error) throw new Error(error.message);

  return { user: data };
};
