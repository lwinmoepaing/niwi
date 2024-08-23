import React from "react";
import { DifficultyLevel } from "./memory-level";
import Button from "@/components/niwi-ui/button/button";

const CongratulationsBox = ({
  setLevel,
}: {
  setLevel: (level: DifficultyLevel | null) => void;
}) => {
  return (
    <div className="flex items-center justify-center  flex-col gap-5">
      <div className="text-center grid place-items-center">
        <h1>
          <p className="text-4xl font-bold niwi-logo-text transition-transform transform hover:scale-110">
            Congratulations!
          </p>
          <span className="text-3xl"> 🎉</span>
        </h1>

        <p className="text-lg niwi-logo-text text-gray-700 mt-4">
          You won the game! Great job!
        </p>
      </div>

      <Button
        variant={"outline"}
        onClick={() => {
          setLevel(null);
        }}
      >
        Change Level
      </Button>
    </div>
  );
};

export default CongratulationsBox;
