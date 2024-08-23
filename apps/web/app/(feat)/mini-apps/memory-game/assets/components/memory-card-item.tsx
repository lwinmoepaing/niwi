type MemoryCardItemProps = {
  num: number;
  color: string;
  isFlipped: boolean;
  onClick: () => void;
};

const MemoryCardItem = ({
  num,
  color,
  isFlipped,
  onClick,
}: MemoryCardItemProps) => {
  return (
    <div className="relative w-24 h-24 perspective-1000" onClick={onClick}>
      <div
        className={`relative w-full h-full transition-transform duration-1000 transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* Front side */}
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-slate-800 flex items-center justify-center text-white text-2xl font-bold backface-hidden"></div>

        {/* Back side */}
        <div
          className="absolute top-0 bottom-0 right-0 left-0 bg-pink-600 flex items-center justify-center text-black text-2xl font-bold backface-hidden rotate-y-180"
          style={{ backgroundColor: color }}
        >
          {num}
        </div>
      </div>
    </div>
  );
};

export default MemoryCardItem;
