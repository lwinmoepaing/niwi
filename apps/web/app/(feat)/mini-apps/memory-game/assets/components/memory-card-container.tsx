import React from "react";
import MemoryCardItem from "./memory-card-item";
import { DifficultyLevel } from "./memory-level";
import Button from "@/components/niwi-ui/button/button";
import CongratulationsBox from "./congratulation-box";
import { useMemoryGame } from "../hooks/useMemoryGame";

const MemoryCardContainer = ({
  level,
  setLevel,
}: {
  level: DifficultyLevel;
  setLevel: (value: DifficultyLevel | null) => void;
}) => {
  let numPairs: number;

  switch (level) {
    case "EASY":
      numPairs = 6;
      break;
    case "MEDIUM":
      numPairs = 9;
      break;
    case "HARD":
      numPairs = 12;
      break;
    default:
      numPairs = 6;
      break;
  }

  const { cards, gameOver, handleCardClick } = useMemoryGame(level, numPairs);

  return gameOver ? (
    <CongratulationsBox setLevel={setLevel} />
  ) : (
    <>
      <div className="w-full px-10 grid grid-cols-6 gap-10 my-10">
        {cards.map((item, index) => (
          <MemoryCardItem
            key={index}
            num={item.value}
            color={item.color}
            isFlipped={item.isFlipped}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
      </div>
      <Button
        variant={"niwi"}
        onClick={() => {
          setLevel(null);
        }}
      >
        Change Level
      </Button>
    </>
  );
};

export default MemoryCardContainer;
