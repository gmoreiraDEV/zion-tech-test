"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <Button
      className="bg-brand-primary rounded-full border-none text-brand-text hover:bg-brand-secondary hover:text-brand-foreground"
      onClick={logout}
    >
      Sair
    </Button>
  );
}
