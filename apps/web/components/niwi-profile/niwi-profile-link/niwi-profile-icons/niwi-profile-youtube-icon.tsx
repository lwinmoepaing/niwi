import React from "react";

function NiwiProfileYoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      className={className}
      viewBox="0 0 40 40"
    >
      <rect width="40" height="40" fill="red" rx="10"></rect>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M29.377 12.502a3.006 3.006 0 012.122 2.121C32 16.495 32 20.4 32 20.4s0 3.905-.502 5.777a3.006 3.006 0 01-2.122 2.122C27.506 28.8 20 28.8 20 28.8s-7.505 0-9.377-.501a3.006 3.006 0 01-2.122-2.122C8 24.305 8 20.4 8 20.4s0-3.905.501-5.777a3.005 3.005 0 012.122-2.121C12.495 12 20 12 20 12s7.505 0 9.377.502zm-4.934 8.191L17.6 24.586V16.8l6.843 3.893z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default NiwiProfileYoutubeIcon;
