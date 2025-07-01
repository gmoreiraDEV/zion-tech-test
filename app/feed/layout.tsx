"use client";

import { HeaderZion } from "@/components/header-zion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function ProtectedLayout({
  authArea,
  children,
}: {
  authArea: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen flex flex-col items-center bg-brand-background bg-back bg-no-repeat bg-backSize bg-center md:bg-backPosition">
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm">
              {authArea}
            </div>
          </nav>
          <HeaderZion />
          <div className="flex-1 flex flex-col gap-20 w-1/2 p-5">
            {children}
          </div>
        </div>
      </main>
    </QueryClientProvider>
  );
}
