interface FakeStartButtonProps {
    onCaptchaOpen: () => void;
  }
  
  export default function FakeStartButton({ onCaptchaOpen }: FakeStartButtonProps) {
    return (
      <button 
        onClick={onCaptchaOpen} 
        style={{ fontSize: '2rem', padding: '1rem 2rem', margin: '2rem' }}>
        Iniciar
      </button>
    );
  }
  