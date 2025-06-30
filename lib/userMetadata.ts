export function getUserMetadata(user: any) {
  const metadata = user?.user_metadata ?? {};

  return {
    id: user?.id,
    name: metadata.full_name ?? "Usuário",
    avatar: metadata.avatar_url ??
      `https://ui-avatars.com/api/?name=${encodeURIComponent(metadata.full_name ?? "Usuário")}`,
    bio: metadata.bio ?? "Sem biografia",
    email: metadata.email,
  };
}