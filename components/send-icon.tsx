import { SVGProps } from "react";

export function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5 group-hover:text-brand-green-muted transition-colors mt-1 mb-1"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 10.5l16.5-6.5-6.5 16.5-2-7-7-3z"
      />
    </svg>
  );
}
