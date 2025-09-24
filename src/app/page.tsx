'use client';
import Square from "@/components/square";
import { useState } from "react";

export default function Home() {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(""));
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;

  type SquareValue = "X" | "O" | "";

  const handleSquareClick = (index: number) => {
    // Has the square already been clicked?
    if (squares[index]) return; // Do nothing.

    // Create a copy of the squares array
    const newSquares = [...squares];

    // Update the clicked square with "X" (or alternate with "O" later)
    if (xIsNext) {
      newSquares[index] = "X";
    } else {
      newSquares[index] = "O";
    }

    // Check if there's a winner.
    calculateWinner(newSquares);

    // Update the current move.
    setCurrentMove(currentMove + 1);

    // Update the state
    setSquares(newSquares);
  }

  const calculateWinner = (squares: SquareValue[]) => {
    console.log("Calculating Winner");
    console.log(squares);
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        console.log("Winner: ", squares[a]);
        return squares[a];
      }
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-500 to-blue-500 py-12">
      <div className="container mx-auto px-4 ">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-200 mb-4">
            Tic Tac Toe
          </h1>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-4 mx-auto w-80 mb-16">
          {squares.map((value, index) => (
            <Square key={index} value={value} handleButton={() => handleSquareClick(index)} />
          ))}
        </div>

        {/* Information */}
        <div className="flex justify-center gap-1">
          <div className="bg-white/20 rounded-2xl p-2 sm:p-4 text-center flex-1">
            <div className="text-white/80 text-xs sm:text-sm">Current Move</div>
            <div className="text-2xl sm:text-3xl font-bold text-white">{currentMove}</div>
          </div>
          <div className="bg-white/20 rounded-2xl p-2 sm:p-4 text-center flex-1">
            <div className="text-white/80 text-xs sm:text-sm">Current Turn</div>
            <div className="text-2xl sm:text-3xl font-bold text-white">{xIsNext ? 'X' : 'O'}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
