import { useRouter } from 'next/navigation'; // Import necessário para navegação
import { useEffect, useState } from 'react';

const FOOTER_TEXT = [
  "©",
  "2024",
  "BEST",
  "UI.",
  "Todos",
  "os",
  "direitos",
  "reservados",
  "para",
  "prosseguir",
  "aqui."
];

export default function FooterWithHiddenStartButton() {
  const [buttonIndex, setButtonIndex] = useState<number>(0);
  const router = useRouter(); // Hook para redirecionar a página

  useEffect(() => {
    const interval = setInterval(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * (FOOTER_TEXT.length - 1));
      } while (newIndex === FOOTER_TEXT.length - 1);
      setButtonIndex(newIndex);
    }, 60000); // Altera a cada 60 segundos

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    const judgeName = localStorage.getItem('judgeName'); // Verifica se o nome foi preenchido
    
    if (judgeName) {
      // Se o nome estiver preenchido, redireciona para a página de score
      router.push('/score');
    } else {
      // Caso contrário, exibe uma mensagem de erro
      alert('Por favor, insira seu nome antes de prosseguir!');
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white text-center py-4">
      <div className="flex justify-center">
        {FOOTER_TEXT.map((word, index) => {
          if (index === FOOTER_TEXT.length - 1) {
            // O "aqui" está sempre com aparência de link
            return (
              <span key={index} className="underline text-blue-500 mx-1 cursor-pointer">
                {word}
              </span>
            );
          }
          return (
            <span key={index} className="mx-1">
              {index === buttonIndex ? (
                
                <button
                  onClick={handleButtonClick}
                  className="text-white underline-none"
                  style={{ cursor: 'default', textDecoration: 'none' }}
                >
                  {word}
                </button>
              ) : (
                word
              )}
            </span>
          );
        })}
      </div>
    </footer>
  );
}
