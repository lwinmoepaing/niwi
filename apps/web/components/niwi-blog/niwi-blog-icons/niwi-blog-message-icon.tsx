import Image from "next/image";

type NiwiBlogMessageIconProps = {
  onClick: () => void;
};

function NiwiBlogMessageIcon({ onClick }: NiwiBlogMessageIconProps) {
  return (
    <button className="message" onClick={onClick} type="button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path
          d="M15.5 11.5H15.51M11.5 11.5H11.51M7.5 11.5H7.51M15.3 19.1L21 21L19.1 15.3C19.1 15.3 20 14 20 11.5C20 6.80558 16.1944 3 11.5 3C6.80558 3 3 6.80558 3 11.5C3 16.1944 6.80558 20 11.5 20C14.0847 20 15.3 19.1 15.3 19.1Z"
          className="fill-stroke"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Image
        src="/images/icons/shining-star.gif"
        width={15}
        height={15}
        alt="Shining Star"
        className="animated-star"
        unoptimized
      />
    </button>
  );
}
export default NiwiBlogMessageIcon;
