import { WinnerInfo } from "./useGame";
import { useMemo } from "react";

type lineType = [number, number, number];

export default function useCalculateWinner(squares: (string | null)[]): WinnerInfo {
  // the winning lines
  const lines: lineType[] = useMemo(
    () => [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal (top-left to bottom-right)
      [2, 4, 6], // Diagonal (top-right to bottom-left)
    ],
    []
  );

  // Iterating through all the winning lines to check for a winner.
  for (let i = 0; i < lines.length; i++) {
    // Destructuring the current line (three positions on the board).
    const [a, b, c] = <lineType>lines[i];

    // Checking if all three positions have the same non-null value ( X or O).
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // If a winner is found, return the winner and the winning line.
      return { winner: squares[a], line: <lineType>lines[i] };
    }
  }

  // If no winner is found, return null for the winner and an empty array for the line.
  return { winner: null, line: [] };
}
