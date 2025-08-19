import React, { useState, useRef, useEffect } from 'react';
import { useMobile } from '@/hooks/use-mobile';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  quality?: number;
  sizes?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04My4zMzMzIDY2LjY2NjdIMTE2LjY2N1YxMDBIODMuMzMzM1Y2Ni42NjY3WiIgZmlsbD0iI0Q1RDVEOCIvPgo8cGF0aCBkPSJNMTAwIDEzMy4zMzNDOTQuNDc3MiAxMzMuMzMzIDkwIDEyOC44NTYgOTAgMTIzLjMzM0M5MCAxMTcuODEgOTQuNDc3MiAxMTMuMzMzIDEwMCAxMTMuMzMzQzEwNS41MjMgMTEzLjMzMyAxMTAgMTE3LjgxIDExMCAxMjMuMzMzQzExMCAxMjguODU2IDEwNS41MjMgMTMzLjMzMyAxMDAgMTMzLjMzM1oiIGZpbGw9IiNENUQ1RDgiLz4KPC9zdmc+',
  quality = 75,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const { isMobile } = useMobile();

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px',
      }
    );

    if (imgRef.current && loading === 'lazy') {
      observer.observe(imgRef.current);
    } else {
      setIsInView(true);
    }

    return () => observer.disconnect();
  }, [loading]);

  // Generate responsive image sources
  const generateSrcSet = (baseSrc: string) => {
    if (baseSrc.includes('/placeholder.svg') || baseSrc.includes('data:')) {
      return baseSrc;
    }

    const sizes = [400, 800, 1200, 1600];
    return sizes
      .map(size => `${baseSrc}?w=${size}&q=${quality} ${size}w`)
      .join(', ');
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Mobile optimized dimensions
  const getOptimizedDimensions = () => {
    if (!width || !height) return {};
    
    if (isMobile) {
      const aspectRatio = height / width;
      const mobileWidth = Math.min(width, 400);
      const mobileHeight = mobileWidth * aspectRatio;
      
      return {
        width: mobileWidth,
        height: mobileHeight,
      };
    }
    
    return { width, height };
  };

  const dimensions = getOptimizedDimensions();

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={dimensions}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={dimensions}
        >
          <img
            src={placeholder}
            alt=""
            className="w-full h-full object-cover opacity-50"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Main Image */}
      {isInView && (
        <img
          src={hasError ? placeholder : src}
          srcSet={hasError ? undefined : generateSrcSet(src)}
          sizes={sizes}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } w-full h-full object-cover`}
          style={dimensions}
          decoding="async"
          fetchPriority={loading === 'eager' ? 'high' : 'low'}
        />
      )}

      {/* Loading indicator */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
