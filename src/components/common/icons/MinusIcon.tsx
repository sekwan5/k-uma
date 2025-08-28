interface MinusIconProps {
  size?: string;
  className?: string;
}

export default function MinusIcon({ size = "1em", className }: MinusIconProps) {
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
      <path d="M5 11h14v2H5z"></path>
    </svg>
  );
}
