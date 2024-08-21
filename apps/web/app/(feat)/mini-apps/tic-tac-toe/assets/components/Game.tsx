"use client";
import useGame from "../hooks/useGame";
import Board from "./Board";
import Info from "./Info";

const Game = () => {
  // Custom hook for the game.
  const {
    history,
    isAscending,
    toggleSortOrder,
    restartGame,
    xIsNext,
    currentMove,
    jumpTo,
    currentSquares,
    winnerInfo,
    handlePlay,
  } = useGame();

  return (
    <div className="game flex flex-row max-sm:flex-col max-sm:p-6 max-sm:gap-y-7 h-full min-h-[400px] px-6">
      <div className="game-board basis-1/2 flex flex-col gap-y-5 justify-center items-center">
        <Board
          xIsNext={xIsNext}
          currentSquares={currentSquares}
          winnerInfo={winnerInfo}
          handlePlay={handlePlay}
        />
      </div>
      <div className="game-info basis-1/2 flex flex-col gap-y-5 justify-center items-center">
        <Info
          history={history}
          isAscending={isAscending}
          toggleSortOrder={toggleSortOrder}
          restartGame={restartGame}
          currentMove={currentMove}
          jumpTo={jumpTo}
        />
      </div>
    </div>
  );
};

export default Game;
