type TwitterIconProps = {
  className?: string;
};
function TwitterIcon(props: TwitterIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" {...props}>
      <rect width="1024" height="1024" fill="transparent" />
      <path d="M445 619.5L97 1024H11L405.5 567.5L445 619.5Z" fill="black"
      className="dark:fill-[#b5b9c1]" />
      <path d="M567.5 378L606.5 434L980 0H892L567.5 378Z" fill="black"
      className="dark:fill-[#b5b9c1]" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0.5H309.5L1012.5 1024H715L12 0.5ZM755.271 961H893L265.735 66H131L755.271 961Z"
        fill="black"
        className="dark:fill-[#b5b9c1]"
      />
    </svg>
  );
}
export default TwitterIcon;
