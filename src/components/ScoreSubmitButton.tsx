interface ScoreSubmitButtonProps {
    onSubmit: () => void;
  }
  
  export default function ScoreSubmitButton({ onSubmit }: ScoreSubmitButtonProps) {
    return (
      <button onClick={onSubmit} className="bg-blue-600 text-white p-2 mt-4">
        Enviar Pontuações (se quiser)
      </button>
    );
  }
  