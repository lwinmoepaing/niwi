interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  highlight: boolean;
}

const Square = ({ value, onSquareClick, highlight }: SquareProps) => {
  return (
    <button
      className={`square relative  text-center border-2 border-solid text-black float-left text-2xl h-[60px] w-[60px] font-bold leading-8 rounded-2xl m-1 ${highlight ? "bg-[#E5E7EB] dark:bg-white" : "bg-white dark:bg-[#111216]"}`}
      onClick={onSquareClick}
      disabled={value !== null}
    >
      <span className="niwi-logo-text">{value}</span>
    </button>
  );
};

export default Square;
