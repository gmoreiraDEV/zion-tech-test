import { SignUpForm } from "@/components/sign-up-form";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-no-repeat bg-backSize bg-top-center bg-back md:bg-backPosition">
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <SignUpForm />
      </div>
    </main>
  );
}
