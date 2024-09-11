import { useEffect, useState } from 'react';

export default function CountdownTimer() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 60)); // Reseta ao chegar a 0
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginTop: '2rem' }}>
      <p>Tempo restante: {seconds}s</p>
    </div>
  );
}
