'use client'

interface SquareProps {
  value: string;
  handleButton: () => void;
}

export default function Square({ value, handleButton }: SquareProps) {
  return (
    <button
      className="w-full aspect-square bg-white rounded-lg shadow-md flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 hover:bg-gray-300 transition active:bg-gray-400"
      onClick={handleButton}
    >
      {value}
    </button>
  );
}