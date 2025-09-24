'use client'

interface SquareProps {
  value: string;
  handleButton: () => void;
}

export default function Square({value, handleButton}: SquareProps) {
    return (
        <button
            className="w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center text-3xl font-bold text-gray-800 hover:bg-gray-300 transition"
            onClick={handleButton}>
            { value }
        </button>
    );
}