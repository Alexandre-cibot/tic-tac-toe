import React, { useState } from "react";
import "./styles.css";

function getWinnerMatrix(arr, caseNb) {
  // Check row
  const indexOfWinningRow = arr.findIndex(row =>
    row.every(e => !!e && e === row[0])
  );
  if (indexOfWinningRow > -1) {
    return arr.map((row, i) => [indexOfWinningRow, i]);
  }

  // check column
  if (arr.every(row => row[caseNb] === arr[0][caseNb])) {
    return arr.map((row, i) => [i, caseNb]);
  }

  // check diagonals
  let diagonal1 = [];
  let diagonal2 = [];
  for (let i = 0; i < arr.length; i++) {
    diagonal1.push(arr[i][i]);
    diagonal2.push(arr[i][arr.length - 1 - i]);
  }

  if (diagonal1.every(e => !!e && e === diagonal1[0])) {
    return arr.map((row, i) => [i, i]);
  }

  if (diagonal2.every(e => !!e && e === diagonal2[0])) {
    return arr.map((row, i) => [i, arr.length - 1 - i]);
  }

  return [];
}

function Grid({ n }) {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [play, setPlay] = useState(true);
  const [message, setMessage] = useState("");
  const [winnerMatrix, setWinnerMatrix] = useState([]);
  const [grid, setGrid] = useState(
    new Array(n).fill(1).map(e => new Array(n).fill(null))
  );

  function draw(event, rowNb, caseNb, sign) {
    if (play && !event.target.textContent) {
      const newGrid = [...grid];
      newGrid[rowNb][caseNb] = sign;
      let winner = getWinnerMatrix(grid, caseNb);
      if (winner instanceof Array && winner.length) {
        setMessage(`Player ${currentPlayer} wins`);
        setPlay(false);
        setWinnerMatrix(winner);
      }
      const nextPlayer = currentPlayer === "X" ? "O" : "X";
      setCurrentPlayer(nextPlayer);
    }
  }

  function restart() {
    setPlay(true);
    setGrid(new Array(n).fill(1).map(e => new Array(n).fill(null)));
    setMessage("");
    setWinnerMatrix([]);
  }

  return (
    <>
      <table>
        <tbody>
          {grid.map((row, i) => (
            <tr key={`row_${i}`}>
              {row.map((sign, j) => {
                const isWinnerCell = winnerMatrix.some(
                  cellPosition => cellPosition[0] === i && cellPosition[1] === j
                );
                return (
                  <td
                    key={`cell_${j}`}
                    style={{ background: isWinnerCell && "springgreen" }}
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
