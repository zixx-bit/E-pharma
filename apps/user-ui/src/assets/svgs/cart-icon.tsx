import * as React from "react";

export const CartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Handle + basket */}
    <path
      d="
        M2.5 3
        H4.5
        L6.5 15.5
        H17.5
        C18.3 15.5 19 15 19.2 14.3
        L21 7
        H6
      "
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Wheels */}
    <circle
      cx={9}
      cy={19}
      r={1.3}
      stroke="currentColor"
      strokeWidth={1.5}
    />
    <circle
      cx={17}
      cy={19}
      r={1.3}
      stroke="currentColor"
      strokeWidth={1.5}
    />
  </svg>
);
