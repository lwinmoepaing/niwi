import React from "react";
type IconProps = {
  className?: string;
};

function UnsplashLogo({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M15 4.5H9V8.5H15V4.5Z" fillRule="evenodd" />
      <path d="M4 10.5H9V14.5H15V10.5H20V19.5H4V10.5Z" fillRule="evenodd" />
    </svg>
  );
}
export default UnsplashLogo;
