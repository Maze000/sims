import React, { useEffect, useState } from 'react';
import { useMobile } from '@/hooks/use-mobile';
import { usePWA } from '@/hooks/usePWA';

interface MobileOptimizerProps {
  children: React.ReactNode;
}

const MobileOptimizer: React.FC<MobileOptimizerProps> = ({ children }) => {
  const { isMobile, isSmallMobile, isLandscape } = useMobile();
  const { isInstallable, installApp, updateAvailable, updateApp } = usePWA();
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  // Mobile-specific optimizations
  useEffect(() => {
    if (isMobile) {
      // Prevent zoom on input focus (iOS)
      const preventZoom = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
          target.style.fontSize = '16px';
        }
      };

      // Add touch-action optimization
      document.body.style.touchAction = 'manipulation';
      
      // Add mobile-specific classes
      document.body.classList.add('mobile-device');
      
      // Optimize viewport for mobile
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        try {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
        } catch (error) {
          // Fallback if viewport manipulation fails
          console.warn('Could not update viewport:', error);
        }
      }

      // Add event listeners
      document.addEventListener('focusin', preventZoom);

      return () => {
        document.body.style.touchAction = '';
        document.body.classList.remove('mobile-device');
        document.removeEventListener('focusin', preventZoom);
      };
    }
  }, [isMobile]);

  // Handle install prompt
  useEffect(() => {
    if (isInstallable && isMobile) {
      setShowInstallPrompt(true);
    }
  }, [isInstallable, isMobile]);

  // Handle update prompt
  useEffect(() => {
    if (updateAvailable) {
      setShowUpdatePrompt(true);
    }
  }, [updateAvailable]);

  // Landscape mode optimization
  useEffect(() => {
    if (isLandscape && isMobile) {
      document.body.classList.add('landscape-mode');
    } else {
      document.body.classList.remove('landscape-mode');
    }
  }, [isLandscape, isMobile]);

  // Performance optimizations for small mobile devices
  useEffect(() => {
    if (isSmallMobile) {
      // Reduce animations for better performance
      document.body.classList.add('small-mobile');
      
      // Optimize images for small screens
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
      });
    }
  }, [isSmallMobile]);

  return (
    <>
      {children}
      
      {/* Install Prompt */}
      {showInstallPrompt && (
        <div className="fixed bottom-20 left-4 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Instalar App</h3>
              <p className="text-sm text-gray-600">Accede más rápido desde tu pantalla de inicio</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700"
              >
                Ahora no
              </button>
              <button
                onClick={() => {
                  installApp();
                  setShowInstallPrompt(false);
                }}
                className="px-4 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700"
              >
                Instalar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Prompt */}
      {showUpdatePrompt && (
        <div className="fixed top-4 left-4 right-4 z-50 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900">Nueva versión disponible</h3>
              <p className="text-sm text-blue-700">Actualiza para obtener las últimas mejoras</p>
            </div>
            <button
              onClick={() => {
                updateApp();
                setShowUpdatePrompt(false);
              }}
              className="px-4 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
            >
              Actualizar
            </button>
          </div>
        </div>
      )}

      {/* Mobile-specific overlay for landscape mode */}
      {isLandscape && isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 mx-4 text-center">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-lg font-semibold mb-2">Gira tu dispositivo</h3>
            <p className="text-gray-600">Para una mejor experiencia, usa el modo vertical</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileOptimizer;
