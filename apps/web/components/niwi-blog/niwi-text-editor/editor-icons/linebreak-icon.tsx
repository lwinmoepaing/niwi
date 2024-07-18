type IconProps = {
  className?: string;
};

function LineBreakIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="currentColro" viewBox="0 0 32 32">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 10.5a.5.5 0 01.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5z"
        fill="currentColor"
      ></path>
      <path d="M17 16.5a1 1 0 11-2 0 1 1 0 012 0z" fill="currentColor"></path>
      <path d="M12 16.5a1 1 0 11-2 0 1 1 0 012 0z" fill="currentColor"></path>
      <path d="M22 16.5a1 1 0 11-2 0 1 1 0 012 0z" fill="currentColor"></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 22.5a.5.5 0 01.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5z"
        fill="currentColor"
      ></path>
    </svg>
  );
}
export default LineBreakIcon;
