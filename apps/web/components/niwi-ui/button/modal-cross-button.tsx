type ModalCrossIconProps = {
  onClick: () => void;
};

function ModalCrossIcon({ onClick }: ModalCrossIconProps) {
  return (
    <button className="niwi-overlay-cross-icon" onClick={onClick}>
      <div className="niwi-icon-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#gradientStroke)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x"
        >
          <defs>
            <linearGradient
              id="gradientStroke"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#f43f5e", stopOpacity: 1 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "#7e22ce", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#60a5fa", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </div>
    </button>
  );
}

export default ModalCrossIcon;
