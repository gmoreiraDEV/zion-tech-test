import { LoginForm } from "@/components/login-form";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-no-repeat bg-backSize bg-top-center bg-back md:bg-backPosition">
      <LoginForm />
    </main>
  );
}
