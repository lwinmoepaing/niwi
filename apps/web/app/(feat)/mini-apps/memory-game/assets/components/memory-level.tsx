"use client";
import Button from "@/components/niwi-ui/button/button";
import React, { useState } from "react";
import MemoryCardContainer from "./memory-card-container";

export type DifficultyLevel = "EASY" | "MEDIUM" | "HARD";

const MemoryLevel: React.FC = () => {
  const [level, setLevel] = useState<DifficultyLevel | undefined>(undefined);

  const handleLevelSelect = (difficulty: DifficultyLevel) => {
    setLevel(difficulty);
  };

  return (
    <section>
      {!level ? (
        <div className="grid gap-5">
          <h1 className="niwi-logo-text mx-auto">Please Select Difficulty</h1>
          <div className="w-[20rem] px-10 grid place-items-center gap-3 mx-auto">
            <Button
              onClick={() => handleLevelSelect("EASY")}
              variant={"niwi"}
              className="w-full"
            >
              Easy
            </Button>
            <Button
              onClick={() => handleLevelSelect("MEDIUM")}
              variant={"niwi"}
              className="w-full"
            >
              Medium
            </Button>
            <Button
              onClick={() => handleLevelSelect("HARD")}
              variant={"niwi"}
              className="w-full"
            >
              Hard
            </Button>
          </div>
        </div>
      ) : (
        <MemoryCardContainer level={level} />
      )}
    </section>
  );
};

export default MemoryLevel;
