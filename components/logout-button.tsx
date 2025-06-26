"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { supabase } from '@/lib/supabase/client';


export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <Button className="bg-primary rounded-full" onClick={logout}>
      Logout
    </Button>
  );
}
