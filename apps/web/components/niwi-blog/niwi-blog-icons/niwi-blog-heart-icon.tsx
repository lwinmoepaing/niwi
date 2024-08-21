import Image from "next/image";

type NiwiBlogHeartIconProps = {
  isActive: boolean;
  onClick: () => void;
};

function NiwiBlogHeartIcon({ isActive, onClick }: NiwiBlogHeartIconProps) {
  return (
    <button className="heart" onClick={onClick} type="button">
      {isActive ? (
        <Image
          width={20}
          height={20}
          src="/images/icons/heart-animated.gif"
          alt="favorite"
        />
      ) : (
        <svg
          viewBox="0 0 43 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
        >
          <path
            d="M12.5 2.5C18.1 2.1 20.5 8 21.5 10C22.8333 8 24.5 2.5 31 2.5C36.0249 2.5 41.5 9 40.5 16C39.3686 23.9196 28.3333 31.5 21.5 34C16.1667 32 4.99999 26.1 2.99999 18.5C0.499994 9 5.49999 3 12.5 2.5Z"
            className="fill-stroke"
            strokeWidth="3"
          />
        </svg>
      )}
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
export default NiwiBlogHeartIcon;
