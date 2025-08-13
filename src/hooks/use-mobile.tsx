import { useState, useEffect } from 'react';

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Check if mobile (width <= 768px)
      setIsMobile(width <= 768);
      
      // Check if tablet (width <= 1024px and > 768px)
      setIsTablet(width > 768 && width <= 1024);
      
      // Check if small mobile (width <= 480px)
      setIsSmallMobile(width <= 480);
      
      // Check if landscape on mobile
      setIsLandscape(width > height && width <= 768);
    };

    // Initial check
    checkDevice();

    // Add event listeners
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isSmallMobile,
    isLandscape,
    isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  };
};

export default useMobile;
