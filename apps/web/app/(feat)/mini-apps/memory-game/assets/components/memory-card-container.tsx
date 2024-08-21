"use client";

import React, { useEffect, useState } from "react";
import MemoryCardItem from "./memory-card-item";
import { DifficultyLevel } from "./memory-level";
import Button from "@/components/niwi-ui/button/button";

type GameValue = number;

type Card = {
  id: number;
  value: number;
  color: string;
  isMatched: boolean;
  isFlipped: boolean;
};

const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generatePairsWithColors = (numPairs: number, level: DifficultyLevel) => {
  const values: Card[] = [];
  const difficultyColors: Record<DifficultyLevel, string[]> = {
    EASY: ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F3", "#33F3FF"],
    MEDIUM: [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#F3FF33",
      "#FF33F3",
      "#33F3FF",
      "#FF8C00",
      "#8A2BE2",
      "#7FFF00",
      "#D2691E",
      "#DC143C",
      "#FF4500",
    ],
    HARD: [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#F3FF33",
      "#FF33F3",
      "#33F3FF",
      "#FF8C00",
      "#8A2BE2",
      "#7FFF00",
      "#D2691E",
      "#DC143C",
      "#FF4500",
      "#FFD700",
      "#ADFF2F",
      "#FF1493",
      "#C71585",
      "#FF69B4",
      "#FF6347",
      "#FF4500",
      "#2E8B57",
      "#4682B4",
      "#B0C4DE",
    ],
  };

  let colors = difficultyColors[`${level}`];

  for (let i = 1; i <= numPairs; i++) {
    const color = colors[i % colors.length]!;
    values.push({
      id: Math.ceil(Math.random() * 100000) + new Date().getTime() + 1,
      value: i,
      color,
      isFlipped: false,
      isMatched: false,
    });
    values.push({
      id: Math.ceil(Math.random() * 100000) + new Date().getTime() + 2,
      value: i,
      color,
      isFlipped: false,
      isMatched: false,
    });
  }

  return shuffleArray(values);
};

const MemoryCardContainer = ({ level }: { level: DifficultyLevel }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [matchedCards, setMatchedCards] = useState<Set<number>>(new Set());
  const [gameOver, setGameOver] = useState<boolean>(false);

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

  useEffect(() => {
    const pairsArray = generatePairsWithColors(numPairs, level);
    setCards(pairsArray);
  }, [level]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstCard, secondCard] = selectedCards;

      if (firstCard?.value === secondCard?.value) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.value === firstCard?.value
              ? { ...card, matched: true, isFlipped: true }
              : card
          )
        );
        setMatchedCards((prev) => new Set(prev).add(firstCard!.value));
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.isFlipped! && !card.isMatched
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
      }
      setSelectedCards([]);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (matchedCards.size == cards.length) {
      setGameOver(true);
    }
  }, [selectedCards]);

  const handleCardClick = (id: number) => {
    const card = cards.find((c) => c.id === id);
    if (card && !card.isFlipped && selectedCards.length < 2) {
      setCards((prevCards) =>
        prevCards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
      );
      setSelectedCards((prev) => [...prev, card]);
    }
  };

  return (
    <div className="w-full px-10 grid grid-cols-6 gap-10">
      {cards.map((item, index) => {
        console.log(item);
        return (
          <MemoryCardItem
            key={index}
            num={item.value}
            color={item.color}
            isFlipped={item.isFlipped}
            onClick={() => handleCardClick(item.id)}
          />
        );
      })}
      <Button variant={"niwi"}>Change Level</Button>
    </div>
  );
};

export default MemoryCardContainer;
