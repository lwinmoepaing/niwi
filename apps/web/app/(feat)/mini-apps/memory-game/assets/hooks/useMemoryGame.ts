import { useEffect, useState } from "react";
import { DifficultyLevel } from "../components/memory-level";

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

export const useMemoryGame = (level: DifficultyLevel, numPairs: number) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [matchCount, setMatchedCount] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const pairsArray = generatePairsWithColors(numPairs, level);
    setCards(pairsArray);
  }, [level, numPairs]);

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
        setMatchedCount((count) => count + 1);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.isFlipped! && !card.isMatched
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setMatchedCount(0);
        }, 1000);
      }
      setSelectedCards([]);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (matchCount > 0) {
      if (matchCount === cards.length / 2) {
        setTimeout(() => setGameOver(true), 500);
      }
    }
  }, [matchCount, cards]);

  const handleCardClick = (id: number) => {
    const card = cards.find((c) => c.id === id);
    if (card && !card.isFlipped && selectedCards.length < 2) {
      setCards((prevCards) =>
        prevCards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
      );
      setSelectedCards((prev) => [...prev, card]);
    }
  };

  return { cards, gameOver, handleCardClick };
};
