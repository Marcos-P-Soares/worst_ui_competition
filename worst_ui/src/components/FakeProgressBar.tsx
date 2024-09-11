import { useEffect, useState } from 'react';

export default function FakeProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 0)); // Reinicia ao chegar a 100
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '80%', margin: '1rem auto', border: '1px solid black' }}>
      <div style={{ width: `${progress}%`, backgroundColor: 'green', height: '20px' }}></div>
    </div>
  );
}
