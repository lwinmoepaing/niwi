"use client";
import Button from "@/components/niwi-ui/button/button";
import React, { useState } from "react";
import MemoryCardContainer from "./memory-card-container";

export type DifficultyLevel = "EASY" | "MEDIUM" | "HARD";

const MemoryLevel: React.FC = () => {
  const [level, setLevel] = useState<DifficultyLevel | null>(null);

  const handleLevelSelect = (difficulty: DifficultyLevel | null) => {
    setLevel(difficulty);
  };

  return (
    <section>
      {!level ? (
        <div className="grid gap-5">
          <h1 className="niwi-logo-text mx-auto">Welcome To Memory Game </h1>
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
          <p className="text-sm mx-auto">
            <span className="text-yellow-500/60 mx-2">Warning-</span>
            <span className="text-gray-500">
              Control your mind and breathe first
            </span>
          </p>
        </div>
      ) : (
        <MemoryCardContainer
          level={level}
          setLevel={(level: DifficultyLevel | null) => handleLevelSelect(level)}
        />
      )}
    </section>
  );
};

export default MemoryLevel;
