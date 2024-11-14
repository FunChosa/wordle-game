import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const { gameOver, currAttempt, correctWord, reset } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord
          ? "✨ Congratulations! You guessed the correct word! ✨"
          : "😵 Oops! U lose 😵"}
      </h3>
      <h1 className="correct-word">Correct word: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>You guessed in {currAttempt.attempt} attempts</h3>
      )}
      <button className="playAgain" onClick={reset}>
        Play Again
      </button>
    </div>
  );
}

export default GameOver;
