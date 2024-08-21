import { useCallback, useMemo, useState } from "react";
import useCalculateWinner from "./useCalculateWinner";

export interface WinnerInfo {
  winner: string | null;
  line: number[];
}

export interface HistoryEntry {
  squares: (string | null)[];
  location: [number, number] | null;
}

interface useGameReturns {
  history: HistoryEntry[];
  currentMove: number;
  xIsNext: boolean;
  currentSquares: (string | null)[];
  winnerInfo: WinnerInfo;
  isAscending: boolean;
  handlePlay: (nextSquares: (string | null)[], index: number) => void;
  jumpTo: (nextMove: number) => void;
  toggleSortOrder: () => void;
  restartGame: () => void;
}

export default function useGame(): useGameReturns {
  // State to keep track of the game's history of moves. Initially, it's empty.
  const [history, setHistory] = useState<HistoryEntry[]>([
    { squares: Array(9).fill(null), location: null },
  ]);

  // State to keep track of the current move index in the history.
  const [currentMove, setCurrentMove] = useState(0);

  // State to toggle the order of move history (ascending or descending).
  const [isAscending, setIsAscending] = useState(true);

  // Value to determine whose turn it is. If currentMove is even, X plays; otherwise, O plays.
  const xIsNext = useMemo(() => currentMove % 2 === 0, [currentMove]);

  // Value to get the squares of the current move from the history.
  const currentSquares = useMemo(
    () => history[currentMove]?.squares || [null],
    [history, currentMove]
  );

  // Calculate the winner using the current squares state.
  const winnerInfo = useCalculateWinner(currentSquares);

  // Function to handle when a player makes a move.
  const handlePlay = useCallback(
    (nextSquares: (string | null)[], index: number) => {
      // Calculate the square location based on the index of the move.
      const location: [number, number] = [Math.floor(index / 3), index % 3];

      // Create a new history that includes the current move and cuts off any future history (if the player has gone back in time).
      const nextHistory = [
        ...history.slice(0, currentMove + 1),
        { squares: nextSquares, location },
      ];

      // Prevent adding a duplicate history entry when clicking the same square.
      if (history.length === nextHistory.length) return;

      // Update the history and set the current move to the last move.
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    },
    [history, currentMove]
  );

  // Function to jump to a specific move in the history.
  const jumpTo = useCallback((nextMove: number) => {
    setCurrentMove(nextMove);
  }, []);

  // Function to toggle the order of the move history.
  const toggleSortOrder = useCallback(() => {
    setIsAscending((prevIsAscending) => !prevIsAscending);
  }, []);

  // Function to restart the game by resetting the history and current move.
  const restartGame = useCallback(() => {
    // Reset history to the initial empty state.
    setHistory([{ squares: Array(9).fill(null), location: null }]);
    setCurrentMove(0); // Reset current move to 0.
  }, []);

  return {
    history,
    currentMove,
    xIsNext,
    currentSquares,
    winnerInfo,
    isAscending,
    handlePlay,
    jumpTo,
    toggleSortOrder,
    restartGame,
  };
}
