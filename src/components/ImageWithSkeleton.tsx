import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio,
  loading = 'lazy',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-zinc-100/80 ${aspectRatio || ''} ${containerClassName}`}
    >
      {/* Animated Skeleton Shimmer (Jakub Krehel production polish) */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 z-10 bg-gradient-to-r from-zinc-100 via-zinc-200/70 to-zinc-100 bg-[length:200%_100%] animate-shimmer"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Actual Image with smooth cross-fade */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`transition-all duration-500 ease-out ${
          isLoaded && !hasError ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-102 blur-xs'
        } ${className}`}
        {...props}
      />

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 text-zinc-400 text-xs font-light">
          <span>Imagem indisponível</span>
        </div>
      )}
    </div>
  );
};
