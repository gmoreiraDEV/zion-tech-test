import { HeaderZion } from "@/components/header-zion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-no-repeat bg-backSize bg-top-center bg-back md:bg-backPosition">
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <Card className="bg-brand-foreground w-full md:p-[40px]">
              <CardHeader className="max-w-[400px] m-auto">
                <CardTitle>
                  <HeaderZion />
                </CardTitle>
              </CardHeader>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  Obrigado por se cadastrar!
                </CardTitle>
                <CardDescription className="text-center">
                  Verifique seu email para confirmar
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Você se cadastrou com sucesso. Por favor verifique seu email
                  antes de continuar para sua conta.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
