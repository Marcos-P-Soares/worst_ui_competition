"use client";

import { useState, useEffect } from 'react';
import FakeStartButton from '@/components/FakeStartButton';
import Captcha from '@/components/Captcha';
import MotivationalMessage from '@/components/MotivationalMessage';
import FooterWithHiddenStartButton from '@/components/FooterWithHiddenStartButton';
import CountdownTimer from '@/components/CountdownTimer';
import HiddenCloseButton from '@/components/HiddenCloseButton';



export default function BestUI() {
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [startProgress, setStartProgress] = useState(false);
  const [showMotivationalMessage, setShowMotivationalMessage] = useState(false);
  const [messageRemoved, setMessageRemoved] = useState(false); // Controle da remoção da mensagem

  // Quando o captcha é resolvido, mostramos a mensagem motivacional
  useEffect(() => {
    if (captchaSolved) {
      setShowMotivationalMessage(true);
      // Remover a mensagem após 5 segundos e permitir a interação com o botão novamente
      const timer = setTimeout(() => {
        setShowMotivationalMessage(false);
        setMessageRemoved(true); // Permitir a interação novamente
      }, 5000); // Duração de 5 segundos

      return () => clearTimeout(timer); // Limpar o timeout quando o componente for desmontado
    }
  }, [captchaSolved]);

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
        <Captcha onSolve={() => setCaptchaSolved(true)} />
      )}

      {/* Mensagem motivacional só aparece após o captcha ser resolvido */}
      {showMotivationalMessage && <MotivationalMessage />}

      {/* Contagem regressiva */}
      {captchaSolved && messageRemoved && <CountdownTimer />} 

      {/* Footer */}
      <FooterWithHiddenStartButton />
      <HiddenCloseButton />
    </div>
  );
}
