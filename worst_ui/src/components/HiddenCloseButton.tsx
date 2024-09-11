import { useState } from 'react';

export default function HiddenCloseButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button onClick={() => alert('Você saiu!')}>Fechar</button>
    </div>
  );
}
