/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

export const getUserId = async (id: string): Promise<any> => {
  const { data, error } = await supabase
    .from("User")
    .select()
    .limit(1)
    .eq("authUserId", id);

  if (error) throw new Error(error.message);
  return data[0];
};

export const updateUserProfile = async (payload: {
  id: string; // este é o authUserId
  name: string;
  bio: string;
}): Promise<any> => {
  const { id: authUserId, name, bio } = payload;

  // 1. Atualiza nome e profileCompleted
  const { data: updatedUser, error } = await supabase
    .from("User")
    .update({
      name,
      profileCompleted: true,
    })
    .eq("authUserId", authUserId)
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!updatedUser?.id) throw new Error("Usuário não encontrado");

  // 2. Agora usa o id REAL do usuário na Profile
  const { data: profileData, error: profileError } = await supabase
    .from("Profile")
    .insert({
      bio,
      userId: updatedUser.id, // id da tabela User
    });

  if (profileError) throw new Error(profileError.message);

  return { user: updatedUser, profile: profileData };
};
