'use client';
import Square from "@/components/square";
import WinnerModal from "@/components/winner-model";
import DrawModal from "@/components/draw-modal";
import { useState } from "react";

export default function Home() {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(""));
  const [currentMove, setCurrentMove] = useState(0);
  const [isDraw, setIsDraw] = useState(false);
  const [winner, setWinner] = useState<"X" | "O" | null>(null);
  const xIsNext = currentMove % 2 === 0;

  type SquareValue = "X" | "O" | "";

  // Add new game function
  const handleNewGame = () => {
    setSquares(Array(9).fill(""));
    setCurrentMove(0);
    setWinner(null);
    setIsDraw(false);
  }

  const handleSquareClick = (index: number) => {
    // Is the game a draw?
    if (squares[index] || winner !== null || isDraw) return; // Do nothing.

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

    // Then check for draw (if no winner and board is full)
    if (!winner && newSquares.every(square => square !== "")) {
      setIsDraw(true);
    }

    // Update the current move.
    setCurrentMove(currentMove + 1);

    // Update the state
    setSquares(newSquares);
  }

  const calculateWinner = (squares: SquareValue[]) => {
    const winningLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a]);
        return squares[a];
      }
    }
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-500 to-blue-500 py-4 sm:py-8 md:py-12">
      {/* Popup modals for winner and draw. */}
      {winner && <WinnerModal winner={winner} onNewGame={handleNewGame} />}
      {isDraw && <DrawModal onNewGame={handleNewGame} />}

      <div className="container mx-auto px-3 sm:px-4">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
            Tic Tac Toe
          </h1>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mx-auto w-full max-w-xs sm:max-w-sm md:w-80 mb-8 sm:mb-12 md:mb-16">
          {squares.map((value, index) => (
            <Square key={index} value={value} handleButton={() => handleSquareClick(index)} />
          ))}
        </div>

        {/* Information */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 w-full max-w-md mx-auto px-4">
          <div className="bg-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center w-full sm:w-40 md:w-48 lg:w-64">
            <div className="text-white/80 text-xs sm:text-sm">Current Move</div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{currentMove}</div>
          </div>
          <div className="bg-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center w-full sm:w-40 md:w-48 lg:w-64">
            <div className="text-white/80 text-xs sm:text-sm">Current Turn</div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{xIsNext ? 'X' : 'O'}</div>
          </div>
        </div>
      </div>
    </main>
  );
}