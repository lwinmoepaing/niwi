import { Share } from "lucide-react";
import Image from "next/image";

type NiwiBlogShareIconProps = {
  onClick: () => void;
};

function NiwiBlogShareIcon({ onClick }: NiwiBlogShareIconProps) {
  return (
    <button className="message" onClick={onClick} type="button">
      <Share size={16} className="fill-stroke" />
      <Image
        src="/images/icons/shining-star.gif"
        width={15}
        height={15}
        alt="Shining Star"
        className="animated-star"
      />
    </button>
  );
}
export default NiwiBlogShareIcon;
