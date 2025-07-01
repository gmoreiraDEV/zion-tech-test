/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getIsProfileCompleted({
  data,
  error,
}: {
  data: any;
  error: any;
}) {
  if (error) {
    console.error("Erro ao buscar usuário:", error.message);
    return false;
  }

  const user = data?.user;
  if (!user) {
    console.warn("Usuário não encontrado:", data.user.id);
    return false;
  }

  const profileCompleted = user.user_metadata?.profile_completed;
  return !!profileCompleted;
}
