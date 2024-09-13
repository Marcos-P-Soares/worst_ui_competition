import { useState, useEffect } from 'react';

interface CaptchaProps {
  onSolve: () => void;
}

// Função para gerar o captcha original
const generateCaptcha = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let captcha = '';
  for (let i = 0; i < length; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

// Função para converter caracteres em chineses
const toChinese = (str: string) => {
  const chineseCharacters = '你好世界欢迎学习编程'; // Exemplo de caracteres chineses
  return str.split('').map(() => chineseCharacters.charAt(Math.floor(Math.random() * chineseCharacters.length))).join('');
};

export default function Captcha({ onSolve }: CaptchaProps) {
  const [captcha, setCaptcha] = useState('');
  const [inputValue, setInputValue] = useState(''); // Valor real que o usuário digita
  const [displayValue, setDisplayValue] = useState(''); // Valor visual (caracteres chineses)
  const [timeLeft, setTimeLeft] = useState(30); // Temporizador de 30 segundos

  useEffect(() => {
    setCaptcha(generateCaptcha(8)); // Gera um captcha de 8 caracteres
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)); // Reduz o tempo a cada segundo
    }, 1000);

    // Limpar o temporizador quando o componente for desmontado ou quando o tempo acabar
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Quando o tempo acabar, gerar um novo captcha e reiniciar o timer
    if (timeLeft === 0) {
      alert('Tempo esgotado! Gerando um novo captcha.');
      setCaptcha(generateCaptcha(8)); // Gera um novo captcha
      setTimeLeft(30); // Reinicia o tempo
      setInputValue(''); // Limpa o input
      setDisplayValue(''); // Limpa o valor exibido
    }
  }, [timeLeft]);

  // Função para lidar com a digitação do usuário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const realValue = e.target.value; // Valor real digitado pelo usuário
    setInputValue(realValue);
    setDisplayValue(toChinese(realValue)); // Exibe em caracteres chineses
  };

  const handleCaptchaSolve = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === captcha) {
      onSolve();
    } else {
      alert('Captcha incorreto. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleCaptchaSolve} className="relative flex flex-col items-center">
      <p>Digite os seguintes caracteres:</p>
      <p className="font-mono text-2xl bg-gray-700 text-white p-2 inline-block">{captcha}</p>

      {/* Campo de input com texto em chinês sobreposto */}
      <div className="relative w-full mt-2">
        {/* Texto em chinês sobreposto */}
        <p 
          className="absolute top-0 left-0 w-full h-full text-white pointer-events-none font-mono bg-transparent"
          style={{ lineHeight: '2.5rem', height: '2.5rem' }} // Ajuste de altura e espaçamento
        >
          {displayValue} {/* Mostra os caracteres chineses sobre o input */}
        </p>
        
        {/* Campo de input real com texto invisível */}
        <input
          type="text"
          name="captchaInput"
          value={inputValue} // Valor real que será submetido
          onChange={handleInputChange}
          required
          className="border-2 border-gray-500 p-2 bg-transparent text-transparent caret-white w-full"
          placeholder="Digite aqui"
          style={{ position: 'relative', zIndex: 1, lineHeight: '2.5rem', height: '2.5rem' }} // Alinhando com o texto sobreposto
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white p-2 mt-4">
        Verificar Captcha
      </button>

      {/* Temporizador visível */}
      <p className="text-red-500 mt-4">Tempo restante: {timeLeft}s</p>
    </form>
  );
}
