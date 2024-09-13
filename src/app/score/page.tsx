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
  const [judgeName, setJudgeName] = useState<string | null>(null); // Armazenar o nome do juiz

  // Recupera o nome do juiz do localStorage ao carregar a página
  useEffect(() => {
    const storedName = localStorage.getItem('judgeName');
    setJudgeName(storedName); // Atualiza o estado com o nome do juiz
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-5xl font-bold mb-10">Sistema de Pontuação Olímpico</h1>

      {/* Mensagem de boas-vindas com o nome do juiz */}
      {judgeName && (
        <h2 className="text-3xl text-yellow-300 mb-5">Bem-vindo, {judgeName}!</h2>
      )}

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
