import { useState } from 'react';

interface SportScoreProps {
  sport: string;
  onScoreSubmit: (sport: string, score: string) => void;
}

export default function SportScore({ sport, onScoreSubmit }: SportScoreProps) {
  const [score, setScore] = useState('');

  const handleScoreSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (score === '') {
      alert('Por favor, escolha uma pontuação!');
    } else {
      onScoreSubmit(sport, score); // Passa o esporte e a pontuação para a página principal
      setScore(''); // Reseta a pontuação
    }
  };

  return (
    <form onSubmit={handleScoreSubmit} className="flex flex-col items-center mt-4">
      <label htmlFor={`${sport}-score`} className="text-yellow-300 text-xl mb-2">
        Pontue {sport}:
      </label>
      <select
        id={`${sport}-score`}
        value={score}
        onChange={(e) => setScore(e.target.value)}
        className="border-2 border-gray-500 p-2 bg-transparent text-white w-full"
      >
        <option value="">Selecione sua nota</option>
        <option value="Triângulo">Nota: Triângulo</option>
        <option value="Explosão">Pontuar: Explosão</option>
        <option value="Caos">Nota: Caos</option>
        <option value="Infinito">Pontuar: Infinito</option>
      </select>
      <button type="submit" className="bg-red-600 text-white p-2 mt-4">
        Enviar (ou não)
      </button>
    </form>
  );
}
