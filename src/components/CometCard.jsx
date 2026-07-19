import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function CometCard({ children, className = '', ...props }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;
    const context = gsap.context(() => {
      const reset = () => {
        gsap.to(card, {
          '--comet-rotate-x': '0deg',
          '--comet-rotate-y': '0deg',
          '--comet-lift': '0px',
          duration: .34,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      };
      const handlePointerMove = event => {
        if (event.pointerType === 'touch') return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        gsap.to(card, {
          '--comet-rotate-y': `${(x - 0.5) * 12}deg`,
          '--comet-rotate-x': `${(0.5 - y) * 12}deg`,
          '--comet-lift': '-4px',
          duration: .22,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      };
      const handlePointerDown = () => {
        gsap.to(card, { '--comet-press-scale': .985, duration: .1, ease: 'power2.out', overwrite: 'auto' });
      };
      const handlePointerUp = () => {
        gsap.to(card, { '--comet-press-scale': 1, duration: .24, ease: 'back.out(2)', overwrite: 'auto' });
      };

      card.addEventListener('pointermove', handlePointerMove);
      card.addEventListener('pointerleave', reset);
      card.addEventListener('pointerdown', handlePointerDown);
      card.addEventListener('pointerup', handlePointerUp);
      card.addEventListener('pointercancel', handlePointerUp);

      return () => {
        card.removeEventListener('pointermove', handlePointerMove);
        card.removeEventListener('pointerleave', reset);
        card.removeEventListener('pointerdown', handlePointerDown);
        card.removeEventListener('pointerup', handlePointerUp);
        card.removeEventListener('pointercancel', handlePointerUp);
      };
    }, card);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`comet-card ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
