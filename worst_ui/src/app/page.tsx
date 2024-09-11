"use client";

import { useState } from 'react';
import FakeStartButton from '@/components/FakeStartButton';
import Captcha from '@/components/Captcha';
import MotivationalMessage from '@/components/MotivationalMessage';
import FooterWithHiddenStartButton from '@/components/FooterWithHiddenStartButton';
import CountdownTimer from '@/components/CountdownTimer';
import FakeProgressBar from '@/components/FakeProgressBar';
import HiddenCloseButton from '@/components/HiddenCloseButton';

// Importando o arquivo CSS que contém a animação personalizada
import '@/style/BestUI.css';

export default function BestUI() {
  const [captchaSolved, setCaptchaSolved] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      {/* Título com efeito customizado */}
      <h1 className="title-animation text-7xl font-bold mb-10">
        BEST UI
      </h1>

      {!captchaSolved && <FakeStartButton onCaptchaOpen={() => setCaptchaSolved(true)} />}
      {captchaSolved && <Captcha onSolve={() => setCaptchaSolved(true)} />}
      {captchaSolved && <MotivationalMessage />}
      <FakeProgressBar />
      <CountdownTimer />
      <FooterWithHiddenStartButton />
      <HiddenCloseButton />
    </div>
  );
}
