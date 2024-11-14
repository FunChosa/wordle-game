import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPosition, attemptValue }) {
  const {
    board,
    correctWord,
    currAttempt,
    setDisabledLetters,
    setCorrectLetters,
    setAlmostLetters,
  } = useContext(AppContext);

  const letter = board[attemptValue][letterPosition];

  const correct = correctWord.toUpperCase()[letterPosition] === letter;
  const almost =
    !correct &&
    letter !== "" &&
    correctWord.toUpperCase().includes(letter) &&
    correctWord;
  const letterState =
    (currAttempt.attempt > attemptValue &&
      (correct ? "correct" : almost ? "almost" : "error")) ||
    "";

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
    if (letter !== "" && correct) {
      setCorrectLetters((prev) => [...prev, letter]);
    }
    if (letter !== "" && almost) {
      setAlmostLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
