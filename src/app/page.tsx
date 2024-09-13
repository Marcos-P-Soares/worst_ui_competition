"use client";

import { useState, useEffect } from 'react';
import FakeStartButton from '@/components/FakeStartButton';
import Captcha from '@/components/Captcha';
import MotivationalMessage from '@/components/MotivationalMessage';
import FooterWithHiddenStartButton from '@/components/FooterWithHiddenStartButton';
import HiddenCloseButton from '@/components/HiddenCloseButton';
import NameInput from '@/components/NameInput'; // Novo componente

export default function BestUI() {
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [startProgress, setStartProgress] = useState(false);
  const [showMotivationalMessage, setShowMotivationalMessage] = useState(false);
  const [showNameField, setShowNameField] = useState(false); // Controle para mostrar o campo de nome

  // Quando o captcha é resolvido, mostramos a mensagem motivacional
  useEffect(() => {
    if (captchaSolved) {
      setShowMotivationalMessage(true);
      const timer = setTimeout(() => {
        setShowMotivationalMessage(false);
      }, 5000); // Duração de 5 segundos

      return () => clearTimeout(timer); // Limpar o timeout quando o componente for desmontado
    }
  }, [captchaSolved]);

  // Função para receber o nome do juiz
  const handleNameSubmit = (name: string) => {
    localStorage.setItem('judgeName', name); // Salva o nome no localStorage
    alert(`Nome cadastrado: ${name}`);
    setShowNameField(false); // Ocultar o campo de nome após o envio
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      {/* Título com efeito customizado */}
      <h1 className="title-animation text-7xl font-bold mb-10">
        BEST UI
      </h1>

      {/* Botão Iniciar */}
      {!captchaSolved && !startProgress && (
        <FakeStartButton onCaptchaOpen={() => setStartProgress(true)} />
      )}

      {/* Captcha */}
      {startProgress && !captchaSolved && (
        <Captcha onSolve={() => {
          setCaptchaSolved(true);
          setShowNameField(true); // Exibe o campo de nome após o captcha ser resolvido
        }} />
      )}

      {/* Componente de input para nome */}
      {showNameField && (
        <NameInput onSubmit={handleNameSubmit} />
      )}

      {/* Mensagem motivacional só aparece após o captcha ser resolvido */}
      {showMotivationalMessage && <MotivationalMessage />}

      {/* Footer sempre visível */}
      <FooterWithHiddenStartButton />
      
      <HiddenCloseButton />
    </div>
  );
}
