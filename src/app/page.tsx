"use client";

import { useState, useEffect } from 'react';
import FakeStartButton from '@/components/FakeStartButton';
import Captcha from '@/components/Captcha';
import MotivationalMessage from '@/components/MotivationalMessage';
import FooterWithHiddenStartButton from '@/components/FooterWithHiddenStartButton';
import HiddenCloseButton from '@/components/HiddenCloseButton';
import NameInput from '@/components/NameInput';
import Image from 'next/image';

export default function BestUI() {
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [startProgress, setStartProgress] = useState(false);
  const [showMotivationalMessage, setShowMotivationalMessage] = useState(false);
  const [showNameField, setShowNameField] = useState(false);

  useEffect(() => {
    if (captchaSolved) {
      setShowMotivationalMessage(true);
      const timer = setTimeout(() => {
        setShowMotivationalMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [captchaSolved]);

  const handleNameSubmit = (name: string) => {
    localStorage.setItem('judgeName', name);
    alert(`Nome cadastrado: ${name}`);
    setShowNameField(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground">
      {/* Alteração do título */}
      <h1 className="title-animation text-7xl font-bold mb-10">
        Sistema de Avaliação Olímpica
      </h1>

      <Image 
      src="/images/olimpiadas.svg" 
      width={200} 
      height={150}
      alt='Logo da Olimpíada'
      className="mb-10 w-80 h-auto"
      />

      {!captchaSolved && !startProgress && (
        <FakeStartButton onCaptchaOpen={() => setStartProgress(true)} />
      )}

      {startProgress && !captchaSolved && (
        <Captcha onSolve={() => {
          setCaptchaSolved(true);
          setShowNameField(true);
        }} />
      )}

      {showNameField && (
        <NameInput onSubmit={handleNameSubmit} />
      )}

      {showMotivationalMessage && <MotivationalMessage />}
      <FooterWithHiddenStartButton />
      <HiddenCloseButton />
    </div>
  );
}
