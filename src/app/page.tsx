'use client';

import { useState } from 'react';

export default function Home() {
  const [currentBio, setCurrentBio] = useState<'A' | 'B'>('A');
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/toggle', {
        method: 'POST',
        body: JSON.stringify({ targetBio: currentBio === 'A' ? 'B' : 'A' })
      });

      if (!response.ok) throw new Error('Échec de la mise à jour');

      setCurrentBio(currentBio === 'A' ? 'B' : 'A');
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">BioToggle</h1>
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                   disabled:bg-gray-400 transition-colors w-64 text-lg"
      >
        {isLoading ? 'Chargement...' : `Activer Bio ${currentBio === 'A' ? 'B' : 'A'}`}
      </button>
    </main>
  );
}