import Button from "@/components/niwi-ui/button/button";
import { HistoryEntry } from "../hooks/useGame";

interface InfoProps {
  history: HistoryEntry[];
  isAscending: boolean;
  toggleSortOrder: () => void;
  restartGame: () => void;
  currentMove: number;
  jumpTo: (nextMove: number) => void;
}

const Info = ({
  history,
  isAscending,
  toggleSortOrder,
  restartGame,
  currentMove,
  jumpTo,
}: InfoProps) => {
  // Map over the history to create a list of moves.
  const moves = history.map((step, move) => {
    // Determine the description for each move. If move is 0, it's the start of the game. If not, include the move number and its location.
    const desc = move
      ? `Go to move #${move} (${step.location?.[0]}, ${step.location?.[1]})`
      : "Go to game start";

    // Return a list item (<li>) for each move.
    return (
      <li key={move}>
        {move === currentMove ? (
          <span className="niwi-logo-text">You are at move #{move}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{desc}</button>
        )}
      </li>
    );
  });

  return (
    <>
      <div className="flex gap-x-5">
        <Button variant={"niwi"} onClick={toggleSortOrder}>
          {isAscending ? "Sort Des" : "Sort Asc"}
        </Button>
        <Button variant={"niwi"} onClick={restartGame} className="restart-button">
          Restart
        </Button>
      </div>
      <ol className="min-h-80 max-sm:min-h-max flex flex-col gap-y-2">
        {isAscending ? moves : moves.reverse()}
      </ol>
    </>
  );
};

export default Info;
