// components/winner-modal.tsx
interface WinnerModalProps {
  winner: "X" | "O"; // Remove the null possibility since we only show when winner exists
  onNewGame: () => void;
}

export default function WinnerModal({ winner, onNewGame }: WinnerModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Game Over!</h2>
        <p className="text-xl text-gray-600 mb-6">
          Player <span className="font-bold">{winner}</span> wins!
        </p>
        <button
          onClick={onNewGame}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}