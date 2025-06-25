import { redirect } from "next/navigation";
import Image from "next/image";

import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";

export default async function Feed() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="bg-brand-foreground w-full p-6 flex flex-col rounded-lg">
        <form className="w-full flex flex-col gap-6">
          <textarea
            name="postText"
            id="postText"
            placeholder="Compartilhe o que está pensando..."
            className="w-full p-4 bg-transparent border border-white/20 rounded-lg focus:border-white focus-within:outline-none"
          />
          <div className="w-full flex items-center justify-between">
            <Button className="bg-brand-green-muted rounded-full text-white text-sm font-bold">
              Image/Video
            </Button>
            <Button
              className="bg-brand-primary rounded-full text-white text-sm font-bold"
              type="submit"
            >
              Publicar
            </Button>
          </div>
        </form>
      </div>
      {/* FEED */}
      <div className="bg-brand-foreground w-full p-6 flex flex-col rounded-lg">
        <Card className="gap-2">
          <div className="flex justify-start items-center gap-4">
            <Image
              className="h-8 w-8 rounded-full"
              alt="profile picture"
              width={32}
              height={32}
              src="https://eu.ui-avatars.com/api/?name=Sam+Guy&size=250"
            />
            <div className="flex flex-col justify-start items-start">
              <p className="text-base font-bold">{data.user.email}</p>
              <p className="text-xs">10h atrás</p>
            </div>
          </div>
          <CardDescription className="mt-3">
            <p className="text-brand-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec
              ante libero. Donec est neque, accumsan malesuada ornare aliquam,
              suscipit cursus ante.
            </p>
          </CardDescription>
          <div className="mt-4 py-4">
            <form className="flex justify-between items-center gap-2">
              <Image
                className="h-10 w-10 rounded-full"
                alt="profile picture"
                width={40}
                height={40}
                src="https://eu.ui-avatars.com/api/?name=Guilherme+Moreira&size=250"
              />
              <input
                type="text"
                placeholder="Deixe um comentário"
                className="w-full bg-brand-background-400 rounded-md p-2"
              />
            </form>
          </div>
        </Card>
      </div>
      {/* <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(data.user, null, 2)}
        </pre>
      </div>
      <div>
        <h2 className="font-bold text-2xl mb-4">Next steps</h2>
        <FetchDataSteps />
      </div> */}
    </div>
  );
}
