/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import Image from "next/image";
import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function AuthButton({ user }: { user: any }) {
  const userName = user?.user_metadata?.full_name || "User";
  const fallbackAvatar = `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
    userName
  )}&size=250`;

  return user ? (
    <Popover>
      <PopoverTrigger asChild>
        <Image
          src={user.user_metadata?.avatar_url || fallbackAvatar}
          alt={userName}
          width={32}
          height={32}
          className="rounded-full"
        />
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-brand-foreground border-none mr-4 mt-2">
        <div className="flex items-center justify-between gap-4">
          Hey, {userName}!
          <LogoutButton />
        </div>
      </PopoverContent>
    </Popover>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/">Login</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/cadastro">Cadastrar</Link>
      </Button>
    </div>
  );
}
