import { SVGProps } from "react";

export function EmojiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      fill="none"
      {...props}
    >
      <path
        fill="#919EAB"
        d="M14 6.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15ZM14 8a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm3.75 6.75a3.75 3.75 0 0 1-7.5 0h7.5Z"
      />
    </svg>
  );
}
