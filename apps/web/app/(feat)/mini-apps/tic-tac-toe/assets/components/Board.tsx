import { WinnerInfo } from "../hooks/useGame";
import Square from "./Square";

interface BoardProps {
  xIsNext: boolean;
  currentSquares: (string | null)[];
  winnerInfo: WinnerInfo;
  handlePlay: (nextSquares: (string | null)[], index: number) => void;
}

const Board = ({ xIsNext, currentSquares, winnerInfo, handlePlay }: BoardProps) => {
  // Function to handle clicking on squares.
  function handleClick(i: number) {
    // If there is already a winner, prevent clicking furthermore.
    if (winnerInfo.winner || currentSquares[i]) {
      return;
    }

    // Remove already clicked squares from playing.
    const nextSquares = currentSquares.slice();

    // Decide what to write on the square.
    nextSquares[i] = xIsNext ? "X" : "O";
    handlePlay(nextSquares, i);
  }

  let status: string;
  // Get the winnerInfo and update the status.
  if (winnerInfo.winner) {
    status = "Winner: " + winnerInfo.winner;
  } else if (currentSquares.every((square) => square !== null)) {
    // If there is no more squares to move and also no winnerInfo, the result is draw.
    status = "Result: Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const board = [];
  // Outer loop to create 3 rows.
  for (let row = 0; row < 3; row++) {
    const boardRow = [];
    // Inner loop to create 3 squares in the current row.
    for (let col = 0; col < 3; col++) {
      // Calculate the index of the current square based on its row and column position.
      const index = row * 3 + col;
      // Push a Square component into the current row.
      boardRow.push(
        <Square
          key={index}
          value={currentSquares[index] || null}
          onSquareClick={() => handleClick(index)}
          highlight={winnerInfo.line.includes(index)} // To know the current winning squares.
        />
      );
    }
    // Push a row component into the board.
    board.push(
      <div
        key={row}
        className="board-row bg-[linear-gradient(to right, #f43f5e, #7e22ce, #60a5fa)] after:content-[''] after:clear-both after:table"
      >
        {boardRow}
      </div>
    );
  }

  return (
    <>
      <p className="status text-xl">{status}</p>
      <div className="game-board-rows">{board}</div>
    </>
  );
};

export default Board;
