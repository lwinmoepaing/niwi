import React from "react";

function NiwiProfileTwitterIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      className={className}
      viewBox="0 0 40 40"
    >
      <rect width="40" height="40" fill="#55ACEE" rx="10"></rect>
      <mask
        id="mask0_920_2751"
        width="24"
        height="20"
        x="8"
        y="10"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "luminance" }}
      >
        <path fill="#fff" d="M31.93 10.233H8V29.68h23.93V10.233z"></path>
      </mask>
      <g mask="url(#mask0_920_2751)">
        <path
          fill="#fff"
          d="M31.93 12.535a9.81 9.81 0 01-2.819.773 4.924 4.924 0 002.159-2.716c-.949.562-2 .97-3.118 1.19a4.91 4.91 0 00-8.366 4.478 13.939 13.939 0 01-10.12-5.129 4.886 4.886 0 00-.665 2.468c0 1.704.867 3.207 2.184 4.087a4.89 4.89 0 01-2.223-.614v.062a4.913 4.913 0 003.938 4.814 4.916 4.916 0 01-2.218.084 4.914 4.914 0 004.587 3.41 9.85 9.85 0 01-6.098 2.101c-.396 0-.787-.023-1.171-.068a13.896 13.896 0 007.526 2.206c9.03 0 13.97-7.482 13.97-13.97 0-.213-.005-.424-.015-.635a9.974 9.974 0 002.45-2.541z"
        ></path>
      </g>
    </svg>
  );
}

export default NiwiProfileTwitterIcon;
