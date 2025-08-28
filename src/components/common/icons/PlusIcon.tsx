import React from "react";

interface PlusIconProps {
  size?: string;
  className?: string;
}

export default function PlusIcon({ size = "1em", className }: PlusIconProps) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      fontSize="inherit"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
    </svg>
  );
}
