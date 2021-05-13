import React from "react";

export const LogoIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg viewBox={`0 0 3 3`} xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="0" y="0" width="0.95" height="0.95" rx="0.2" fill="#ee5" />
      {/*<rect x="1" y="0" width="0.95" height="0.95" rx="0.2" fill="#ee5" />*/}
      <rect x="2" y="0" width="0.95" height="0.95" rx="0.2" fill="#a55" />
      <rect x="0" y="1" width="0.95" height="0.95" rx="0.2" fill="#ee5" />
      <rect x="1" y="1" width="0.95" height="0.95" rx="0.2" fill="#ee5" />
      {/*<rect x="2" y="1" width="0.95" height="0.95" rx="0.2" fill="#993" />*/}
      {/*<rect x="0" y="2" width="0.95" height="0.95" rx="0.2" fill="#993" />*/}
      <rect x="1" y="2" width="0.95" height="0.95" rx="0.2" fill="#ee5" />
      <rect x="2" y="2" width="0.95" height="0.95" rx="0.2" fill="#ee5" />
    </svg>
  );
};
