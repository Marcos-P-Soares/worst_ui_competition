"use client";

import { useState, useEffect } from 'react';
import SportScore from '@/components/SportScore';
import ScoreSubmitButton from '@/components/ScoreSubmitButton';
import FinalMessage from '@/components/FinalMessage';
import ScoreDisplay from '@/components/ScoreDisplay';
import SavedScores from '@/components/SavedScores';

export default function JudgeScorePage() {
  const [scores, setScores] = useState<{ [sport: string]: string }>({});
  const [finalMessageVisible, setFinalMessageVisible] = useState(false);
  const [savedScores, setSavedScores] = useState<{ [sport: string]: string }[]>([]); // Lista de pontuações salvas
  const [judgeName, setJudgeName] = useState<string | null>(null); // Estado para o nome do juiz

  useEffect(() => {
    // Buscar o nome do juiz do localStorage no lado do cliente
    if (typeof window !== "undefined") {
      const storedJudgeName = localStorage.getItem('judgeName');
      setJudgeName(storedJudgeName);
    }
  }, []);

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
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-black">
      <h1 className="text-5xl font-bold mb-10">Sistema de Pontuação Olímpico</h1>
      
      {/* Exibir o nome do juiz */}
      {judgeName && <h2 className="text-2xl mb-5 text-gray-700">Bem-vindo, {judgeName}!</h2>}
      
      {/* Grid Layout melhorado */}
      <div className="grid grid-cols-2 gap-10 max-w-4xl mx-auto">
        {/* Componentes de pontuação para cada esporte */}
        <SportScore sport="Atletismo" onScoreSubmit={handleScoreSubmit} />
        <SportScore sport="Natação" onScoreSubmit={handleScoreSubmit} />
        <SportScore sport="Ginástica" onScoreSubmit={handleScoreSubmit} />
        <SportScore sport="Vôlei" onScoreSubmit={handleScoreSubmit} />
        <SportScore sport="Judô" onScoreSubmit={handleScoreSubmit} />
      </div>

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
