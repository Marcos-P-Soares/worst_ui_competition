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
  "prossegui",
  "aqui."
];

export default function FooterWithHiddenStartButton() {
  const [buttonIndex, setButtonIndex] = useState<number>(0);

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

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-1 text-center">
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
                // O botão real parece texto comum
                <button
                  onClick={() => alert('Agora você achou o botão certo!')}
                  className="text-white underline-none" // Sem aparência de link
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
