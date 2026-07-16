import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Lanyard from './Lanyard/Lanyard.jsx';
import frontImage from '../assets/badge/badge-front-black-card.jpg';
import backImage from '../assets/badge/badge-back-black-card.jpg';
import './BadgeLanyardModal.css';

export default function BadgeLanyardModal({ open, closing, onClose, position }) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = event => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  return createPortal(
    <div
      className={`lanyard-experience${closing ? ' is-retracting' : ''}`}
      style={{
        '--lanyard-left': `${position?.stage?.left ?? window.innerWidth / 2}px`,
        '--lanyard-top': `${position?.stage?.top ?? 0}px`
      }}
      role="region"
      aria-label="可拖拽的我的工牌，按 Escape 收起"
    >
      <div className="lanyard-stage">
        <Lanyard
          position={position?.camera || [0, 0, 20]}
          anchor={position?.anchor || [0, 0, 0]}
          gravity={[0, -40, 0]}
          frontImage={frontImage}
          backImage={backImage}
          imageFit="contain"
          lanyardWidth={1}
        />
      </div>
    </div>,
    document.body
  );
}
