import React from "react";

function NiwiProfileFacebookIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 40 40"
      className={className}
    >
      <rect width="40" height="40" fill="#1877F2" rx="10"></rect>
      <g clipPath="url(#clip0_3062_7327)">
        <path
          fill="#fff"
          d="M32 20.073C32 13.405 26.627 8 20 8S8 13.405 8 20.073C8 26.1 12.388 31.094 18.125 32v-8.437h-3.047v-3.49h3.047v-2.66c0-3.026 1.791-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971H23.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V32C27.612 31.094 32 26.1 32 20.073z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_3062_7327">
          <path fill="#fff" d="M0 0H24V24H0z" transform="translate(8 8)"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default NiwiProfileFacebookIcon;
