import { cn } from "@/libs/utils";
import { Bookmark } from "lucide-react";
import Image from "next/image";

type NiwiBookmarkIconProps = {
  active: boolean;
  onClick: () => void;
};

function NiwiBookmarkIcon({ onClick, active }: NiwiBookmarkIconProps) {
  return (
    <button className="message" onClick={onClick} type="button">
      <Bookmark size={16} className={cn(active ? "fill" : "fill-stroke")} />
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
export default NiwiBookmarkIcon;
