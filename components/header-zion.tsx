import React from "react";
import { ZionLogo } from "./zion-logo";

export function HeaderZion() {
  return (
    <div className="m-auto text-2xl flex items-center justify-center gap-2 w-full">
      <ZionLogo />
      <div className="flex flex-col">
        <p className="inline-block text-transparent text-2xl font-light bg-gradient bg-gradient-to-r bg-clip-text from-brand-secondary to-brand-tertiary">
          Comunidade
        </p>
        <p className="inline-block text-transparent text-[32px] bg-clip-text bg-gradient bg-gradient-to-r from-brand-secondary to-brand-tertiary">
          Zion Global
        </p>
      </div>
    </div>
  );
}
