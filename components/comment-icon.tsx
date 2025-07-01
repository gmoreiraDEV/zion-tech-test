import { SVGProps } from "react";

export function CommentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 24"
      width={25}
      height={24}
      fill="none"
      {...props}
    >
      <path
       className="group-hover:fill-blue-500 transition-colors"
        fill="#94AEBA"
        d="M5.406 18a3.25 3.25 0 0 1-3.25-3.25v-8.5A3.25 3.25 0 0 1 5.406 3h13.5a3.25 3.25 0 0 1 3.25 3.25v8.5a3.25 3.25 0 0 1-3.25 3.25H13.17l-5.013 3.75a1.25 1.25 0 0 1-1.999-1V18h-.75Zm7.265-1.5h6.236a1.75 1.75 0 0 0 1.75-1.75v-8.5a1.75 1.75 0 0 0-1.75-1.75h-13.5a1.75 1.75 0 0 0-1.75 1.75v8.5c0 .966.783 1.75 1.75 1.75h2.248v3.75l5.016-3.75Z"
      />
    </svg>
  );
}
