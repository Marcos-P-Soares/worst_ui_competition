"use client";

import { useState } from 'react';
import SportScore from '@/components/SportScore';
import ScoreSubmitButton from '@/components/ScoreSubmitButton';
import FinalMessage from '@/components/FinalMessage';
import ScoreDisplay from '@/components/ScoreDisplay';
import SavedScores from '@/components/SavedScores';

export default function JudgeScorePage() {
  const [scores, setScores] = useState<{ [sport: string]: string }>({});
  const [finalMessageVisible, setFinalMessageVisible] = useState(false);
  const [savedScores, setSavedScores] = useState<{ [sport: string]: string }[]>([]); // Lista de pontuações salvas

  const handleScoreSubmit = (sport: string, score: string) => {
    setScores((prevScores) => ({
      ...prevScores,
      [sport]: score,
    }));
  };

  const handleFinalSubmit = () => {
    setFinalMessageVisible(true);
    setSavedScores((prevSavedScores) => [...prevSavedScores, scores]); // Salva as pontuações
    setScores({}); // Reseta as pontuações atuais após o envio
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-5xl font-bold mb-10">Sistema de Pontuação Olímpico</h1>

      {/* Componentes de pontuação para cada esporte */}
      <SportScore sport="Atletismo" onScoreSubmit={handleScoreSubmit} />
      <SportScore sport="Natação" onScoreSubmit={handleScoreSubmit} />
      <SportScore sport="Ginástica" onScoreSubmit={handleScoreSubmit} />
      <SportScore sport="Vôlei" onScoreSubmit={handleScoreSubmit} />
      <SportScore sport="Judô" onScoreSubmit={handleScoreSubmit} />

      {/* Exibe as pontuações dadas */}
      <ScoreDisplay scores={scores} />

      {/* Botão de envio final */}
      {!finalMessageVisible && (
        <ScoreSubmitButton onSubmit={handleFinalSubmit} />
      )}

      {/* Mensagem final confusa */}
      {finalMessageVisible && <FinalMessage />}

      {/* Segunda seção com pontuações salvas */}
      <SavedScores savedScores={savedScores} />
    </div>
  );
}
