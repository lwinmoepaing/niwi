type IconProps = {
  className?: string;
};
function ImageFullScreenIcon({ className }: IconProps) {
  return (
    <svg className={className} width="25" height="25">
      <path
        d="M4.027 17.24V5.492c0-.117.046-.216.14-.3a.453.453 0 01.313-.123h17.007c.117 0 .22.04.313.12.093.08.14.18.14.3v11.74c0 .11-.046.21-.14.3a.469.469 0 01-.313.12H4.48a.432.432 0 01-.314-.13.41.41 0 01-.14-.3zm2.943 3.407v-.833a.45.45 0 01.122-.322.387.387 0 01.276-.132H18.61a.35.35 0 01.27.132.472.472 0 01.116.322v.833c0 .117-.04.216-.116.3a.361.361 0 01-.27.123H7.368a.374.374 0 01-.276-.124.405.405 0 01-.122-.3z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
}
export default ImageFullScreenIcon;
