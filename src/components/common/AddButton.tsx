import React from "react";

interface AddButtonProps {
  className?: string;
}

const AddButton: React.FC<AddButtonProps> = ({ className }) => (
  <svg
    height="30%"
    width="30%"
    viewBox="0 0 70 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g filter="url(#filter0_i)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.5758 67C27.5758 68.6569 28.9189 70 30.5758 70H41.5455C43.2023 70 44.5455 68.6569 44.5455 67V42.4243H67C68.6569 42.4243 70 41.0812 70 39.4243V28.4546C70 26.7978 68.6569 25.4546 67 25.4546H44.5455V3C44.5455 1.34315 43.2023 0 41.5455 0H30.5758C28.9189 0 27.5758 1.34315 27.5758 3L27.5758 25.4546H3C1.34315 25.4546 0 26.7978 0 28.4546V39.4243C0 41.0812 1.34315 42.4243 3 42.4243H27.5758L27.5758 67Z"
        fill="url(#paint0_linear)"
      />
    </g>
    <defs>
      <filter
        id="filter0_i"
        x="0"
        y="0"
        width="70"
        height="70.5"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="0.5" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
        />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
      </filter>
      <linearGradient
        id="paint0_linear"
        x1="35"
        y1="0"
        x2="35"
        y2="70"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.4375" stopColor="#77C90B" />
        <stop offset="1" stopColor="#2BA95A" />
      </linearGradient>
    </defs>
  </svg>
);

export default AddButton;
