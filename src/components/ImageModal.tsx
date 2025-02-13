import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export default function ImageModal({ isOpen, onClose, imageUrl, title }: ImageModalProps) {
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      // Carregar a imagem para obter suas dimensões reais
      const img: HTMLImageElement = new window.Image();
      img.src = imageUrl;
      img.onload = () => {
        // Calcular as dimensões mantendo a proporção
        const maxWidth = window.innerWidth * 0.85;
        const maxHeight = window.innerHeight * 0.85;
        
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (maxWidth * height) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (maxHeight * width) / height;
          height = maxHeight;
        }
        
        setImageDimensions({ width, height });
      };
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, imageUrl]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 ease-in-out"
      onClick={onClose}
      style={{
        animation: 'fadeIn 0.3s ease-in-out forwards'
      }}
    >
      <div
        className="relative transform scale-95 opacity-0 rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'zoomIn 0.3s ease-in-out forwards',
          width: imageDimensions.width,
          height: imageDimensions.height + 60 // Adiciona espaço para o título
        }}
      >
        <button
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors"
          onClick={onClose}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="w-full h-full flex flex-col">
          <div className="relative flex-grow" style={{ height: imageDimensions.height }}>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain"
              sizes={`${imageDimensions.width}px`}
              priority
            />
          </div>
          
          <div className="bg-black/80 p-3">
            <h3 className="text-white text-lg font-bold text-center">{title}</h3>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            background-color: rgba(0, 0, 0, 0);
          }
          to {
            background-color: rgba(0, 0, 0, 0.75);
          }
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
} 