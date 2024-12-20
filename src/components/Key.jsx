import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, bigKey, disabled, correct, almost }) {
  const { onSelectLetter, onDelete, onEnter, gameOver } =
    useContext(AppContext);

  const selectLetter = () => {
    if (gameOver.gameOver) return;
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };
  return (
    <div
      className="key"
      id={
        bigKey
          ? "big"
          : disabled
          ? "disabled"
          : correct
          ? "correct"
          : almost
          ? "almost"
          : ""
      }
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;
