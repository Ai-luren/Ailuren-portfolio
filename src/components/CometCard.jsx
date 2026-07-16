import { useRef } from 'react';

export default function CometCard({ children, className = '', ...props }) {
  const cardRef = useRef(null);

  const reset = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--comet-rotate-x', '0deg');
    card.style.setProperty('--comet-rotate-y', '0deg');
    card.style.setProperty('--comet-glow-x', '50%');
    card.style.setProperty('--comet-glow-y', '50%');
  };

  const handlePointerMove = event => {
    if (event.pointerType === 'touch') return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty('--comet-rotate-y', `${(x - 0.5) * 10}deg`);
    card.style.setProperty('--comet-rotate-x', `${(0.5 - y) * 10}deg`);
    card.style.setProperty('--comet-glow-x', `${x * 100}%`);
    card.style.setProperty('--comet-glow-y', `${y * 100}%`);
  };

  return (
    <div
      ref={cardRef}
      className={`comet-card ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      {...props}
    >
      {children}
    </div>
  );
}
