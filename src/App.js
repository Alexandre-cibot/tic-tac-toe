import React, { useState } from "react";
import "./styles.css";

function hasAWinner(arr, caseNb) {
  // Check row
  if (arr.some(row => row.every(e => !!e && e === row[0]))) {
    return true;
  }
  // check column
  if (arr.every(row => row[caseNb] === arr[0][caseNb])) {
    return true;
  }
  // check diagonals
  let diagonal1 = [];
  let diagonal2 = [];
  for (let i = 0; i < arr.length; i++) {
    diagonal1.push(arr[i][i]);
    diagonal2.push(arr[i][arr.length - 1 - i]);
  }

  return (
    diagonal1.every(e => !!e && e === diagonal1[0]) ||
    diagonal2.every(e => !!e && e === diagonal2[0])
  );
}

function Grid({ n }) {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [play, setPlay] = useState(true);
  const [message, setMessage] = useState("");
  const [grid, setGrid] = useState(
    new Array(n).fill(1).map(e => new Array(n).fill(null))
  );

  function draw(event, rowNb, caseNb, sign) {
    if (play && !event.target.textContent) {
      const newGrid = [...grid];
      newGrid[rowNb][caseNb] = sign;
      setGrid(newGrid);
      if (hasAWinner(grid, caseNb)) {
        setMessage(`Player ${currentPlayer} wins`);
        setPlay(false);
      }
      const nextPlayer = currentPlayer === "X" ? "O" : "X";
      setCurrentPlayer(nextPlayer);
    }
  }

  function restart() {
    setPlay(true);
    setGrid(new Array(n).fill(1).map(e => new Array(n).fill(null)));
    setMessage("");
  }

  return (
    <>
      <table>
        <tbody>
          {grid.map((row, i) => (
            <tr key={`row_${i}`}>
              {row.map((sign, j) => {
                return (
                  <td
                    key={`cell_${j}`}
                    onClick={event => draw(event, i, j, currentPlayer)}
                  >
                    {sign}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p>{message}</p>
      {!play && <button onClick={restart}>Restart</button>}
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <Grid n={3} />
    </div>
  );
}
