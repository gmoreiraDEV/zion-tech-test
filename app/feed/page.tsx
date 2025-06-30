import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getIsProfileCompleted } from "@/data-access-layer/profile.dal";
import { FeedWrapper } from "@/components/feed-wrapper";

export default async function Feed() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  const profile = await getIsProfileCompleted(data.user.id);

  return <FeedWrapper userId={data.user.id} showProfileModal={!profile} />;
}
