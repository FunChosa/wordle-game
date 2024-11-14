import { useState, createContext, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [alertTitle, setAlertTitle] = useState({
    type: "info",
    title: "You can do it!",
  });
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  const [correctLetters, setCorrectLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todayWord);
    });
  }, []);

  const reset = () => {
    setBoard(boardDefault.map((el) => el.map((el) => "")));
    setCurrAttempt({ attempt: 0, letterPos: 0 });
    setWordSet(new Set());
    setDisabledLetters([]);
    setCorrectWord("");
    setGameOver({ gameOver: false, guessedWord: false });
    setCorrectLetters([]);
    setAlmostLetters([]);
    setAlertTitle({ type: "info", title: "You can do it!" });
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todayWord);
    });
  };

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
      setAlertTitle({
        type: "success",
        title: `Attempts left: ${5 - currAttempt.attempt}`,
      });
    } else {
      setAlertTitle({
        type: "warning",
        title: "Not a valid word",
      });
    }

    if (currWord.toLowerCase() === correctWord) {
      setGameOver({
        gameOver: true,
        guessedWord: true,
      });
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({
        gameOver: true,
        guessedWord: false,
      });
      return;
    }
  };

  return (
    <div className="App">
      <h1>Wordle Game</h1>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
          correctLetters,
          setCorrectLetters,
          almostLetters,
          setAlmostLetters,
          reset,
        }}
      >
        <div className="game">
          <Board />
          <span className={`alert alertTitle-${alertTitle.type}`}>
            {alertTitle.title}
          </span>
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
