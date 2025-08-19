import React, { useEffect, useRef } from 'react';
import { useMobile } from '@/hooks/use-mobile';

interface MobilePerformanceProps {
  children: React.ReactNode;
}

const MobilePerformance: React.FC<MobilePerformanceProps> = ({ children }) => {
  const { isMobile, isSmallMobile } = useMobile();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (isMobile) {
      // Optimize images with lazy loading
      const images = document.querySelectorAll('img:not([data-lazy-loaded])');
      images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
        img.setAttribute('data-lazy-loaded', 'true');
      });

      // Optimize videos
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        video.setAttribute('preload', 'none');
        video.setAttribute('playsinline', 'true');
      });

      // Reduce motion for better performance on small devices
      if (isSmallMobile) {
        const style = document.createElement('style');
        style.textContent = `
          * {
            animation-duration: 0.1s !important;
            transition-duration: 0.1s !important;
          }
        `;
        document.head.appendChild(style);
      }

      // Optimize scrolling performance
      const optimizeScroll = () => {
        const scrollElements = document.querySelectorAll('.scroll-container');
        scrollElements.forEach(element => {
          element.style.webkitOverflowScrolling = 'touch';
          element.style.overflowScrolling = 'touch';
        });
      };

      // Debounced scroll optimization
      let scrollTimeout: NodeJS.Timeout;
      const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(optimizeScroll, 100);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      optimizeScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      };
    }
  }, [isMobile, isSmallMobile]);

  // Intersection Observer for performance
  useEffect(() => {
    if (isMobile && 'IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              target.classList.add('mobile-visible');
              
              // Load images when they come into view
              const images = target.querySelectorAll('img[data-src]');
              images.forEach(img => {
                const dataSrc = img.getAttribute('data-src');
                if (dataSrc) {
                  img.setAttribute('src', dataSrc);
                  img.removeAttribute('data-src');
                }
              });
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '50px 0px',
        }
      );

      // Observe elements with data-observe attribute
      const elementsToObserve = document.querySelectorAll('[data-observe]');
      elementsToObserve.forEach(element => {
        observerRef.current?.observe(element);
      });

      return () => {
        observerRef.current?.disconnect();
      };
    }
  }, [isMobile]);

  // Memory optimization for mobile
  useEffect(() => {
    if (isMobile) {
      // Clean up event listeners on page unload
      const cleanup = () => {
        // Remove any global event listeners that might cause memory leaks
        const elements = document.querySelectorAll('[data-mobile-cleanup]');
        elements.forEach(element => {
          // Safe removal of event listeners
          try {
            element.removeEventListener('touchstart', () => {});
            element.removeEventListener('touchmove', () => {});
            element.removeEventListener('touchend', () => {});
          } catch (error) {
            // Ignore errors if listeners don't exist
          }
        });
      };

      window.addEventListener('beforeunload', cleanup);
      return () => {
        window.removeEventListener('beforeunload', cleanup);
        cleanup();
      };
    }
  }, [isMobile]);

  return <>{children}</>;
};

export default MobilePerformance;
