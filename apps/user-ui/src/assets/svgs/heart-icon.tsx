import * as React from "react";

export const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="
        M12 21
        C12 21 3 14.5 3 8.5
        C3 5.5 5.5 3.5 8.5 3.5
        C10.4 3.5 11.9 4.6 12 6
        C12.1 4.6 13.6 3.5 15.5 3.5
        C18.5 3.5 21 5.5 21 8.5
        C21 14.5 12 21 12 21
      "
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
