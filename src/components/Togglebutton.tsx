interface ToggleButtonProps {
    onClick: () => void;
    isLoading: boolean;
    currentBio: 'A' | 'B';
  }
  
  export default function ToggleButton({ onClick, isLoading, currentBio }: ToggleButtonProps) {
    return (
      <button
        onClick={onClick}
        disabled={isLoading}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                   disabled:bg-gray-400 transition-colors w-64 text-lg"
        aria-label={`Basculer vers la Bio ${currentBio === 'A' ? 'B' : 'A'}`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            Chargement...
          </span>
        ) : (
          `Activer Bio ${currentBio === 'A' ? 'B' : 'A'}`
        )}
      </button>
    );
  }