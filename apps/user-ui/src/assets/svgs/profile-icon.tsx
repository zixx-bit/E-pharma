import * as React from "react";

export const ProfileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 17 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Head */}
    <circle
      cx={8.5}
      cy={5.5}
      r={4.5}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Body */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="
        M1 19
        C1 15.5 4.5 13.5 8.5 13.5
        C12.5 13.5 16 15.5 16 19
      "
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
