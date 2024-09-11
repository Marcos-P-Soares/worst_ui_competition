interface CaptchaProps {
    onSolve: () => void;
  }
  
  export default function Captcha({ onSolve }: CaptchaProps) {
    const handleCaptchaSolve = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const input = e.currentTarget.captchaInput.value; // Acesso ao valor do input
      if (input === 'X8zY#2G!') {
        onSolve();
      } else {
        alert('Erro no Captcha. Tente novamente.');
      }
    };
  
    return (
      <form onSubmit={handleCaptchaSolve}>
        <p>Digite os seguintes caracteres: X8zY#2G!</p>
        <input type="text" name="captchaInput" required />
        <button type="submit">Verificar Captcha</button>
      </form>
    );
  }
  