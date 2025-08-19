import React, { useEffect, useState } from 'react';
import { useMobile } from '@/hooks/use-mobile';

interface MobileAccessibilityProps {
  children: React.ReactNode;
}

const MobileAccessibility: React.FC<MobileAccessibilityProps> = ({ children }) => {
  const { isMobile } = useMobile();
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isMobile) {
      // Check for accessibility preferences
      const checkAccessibilityPreferences = () => {
        // High contrast mode
        const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
        setIsHighContrast(highContrastQuery.matches);
        
        // Reduced motion
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setIsReducedMotion(reducedMotionQuery.matches);
        
        // Dark mode
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeQuery.matches);
      };

      // Initial check
      checkAccessibilityPreferences();

      // Listen for changes
      const mediaQueries = [
        window.matchMedia('(prefers-contrast: high)'),
        window.matchMedia('(prefers-reduced-motion: reduce)'),
        window.matchMedia('(prefers-color-scheme: dark)'),
      ];

      const handleChange = () => checkAccessibilityPreferences();
      mediaQueries.forEach(query => query.addEventListener('change', handleChange));

      // Apply accessibility styles
      const applyAccessibilityStyles = () => {
        const style = document.createElement('style');
        style.id = 'mobile-accessibility-styles';
        
        let css = '';

        // High contrast mode
        if (isHighContrast) {
          css += `
            .mobile-btn, .mobile-card, input, select, textarea {
              border: 2px solid #000 !important;
            }
            
            .mobile-btn-primary {
              background-color: #000 !important;
              color: #fff !important;
            }
            
            .mobile-btn-secondary {
              background-color: #fff !important;
              color: #000 !important;
              border: 2px solid #000 !important;
            }
          `;
        }

        // Reduced motion
        if (isReducedMotion) {
          css += `
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
            
            .mobile-spinner {
              animation: none !important;
            }
          `;
        }

        // Dark mode
        if (isDarkMode) {
          css += `
            .mobile-card {
              background-color: #1f2937 !important;
              color: #f9fafb !important;
              border-color: #374151 !important;
            }
            
            .mobile-btn-secondary {
              background-color: #374151 !important;
              color: #f9fafb !important;
            }
            
            input, select, textarea {
              background-color: #374151 !important;
              color: #f9fafb !important;
              border-color: #4b5563 !important;
            }
          `;
        }

        style.textContent = css;
        
        // Remove existing styles and add new ones
        const existingStyle = document.getElementById('mobile-accessibility-styles');
        if (existingStyle) {
          existingStyle.remove();
        }
        document.head.appendChild(style);
      };

      applyAccessibilityStyles();

      return () => {
        mediaQueries.forEach(query => query.removeEventListener('change', handleChange));
        const existingStyle = document.getElementById('mobile-accessibility-styles');
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, [isMobile, isHighContrast, isReducedMotion, isDarkMode]);

  // Focus management for mobile
  useEffect(() => {
    if (isMobile) {
      // Improve focus visibility
      const style = document.createElement('style');
      style.textContent = `
        *:focus {
          outline: 2px solid #3b82f6 !important;
          outline-offset: 2px !important;
        }
        
        .mobile-btn:focus,
        input:focus,
        select:focus,
        textarea:focus {
          outline: 3px solid #3b82f6 !important;
          outline-offset: 2px !important;
        }
      `;
      document.head.appendChild(style);

      // Add skip links for keyboard navigation
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.textContent = 'Saltar al contenido principal';
      skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
      document.body.insertBefore(skipLink, document.body.firstChild);

      return () => {
        style.remove();
        skipLink.remove();
      };
    }
  }, [isMobile]);

  // Screen reader announcements
  useEffect(() => {
    if (isMobile) {
      // Create aria-live region for announcements
      const announcementRegion = document.createElement('div');
      announcementRegion.setAttribute('aria-live', 'polite');
      announcementRegion.setAttribute('aria-atomic', 'true');
      announcementRegion.className = 'sr-only';
      announcementRegion.id = 'mobile-announcements';
      document.body.appendChild(announcementRegion);

      return () => {
        announcementRegion.remove();
      };
    }
  }, [isMobile]);

  // Touch target size validation
  useEffect(() => {
    if (isMobile) {
      const validateTouchTargets = () => {
        const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [role="button"]');
        
        interactiveElements.forEach(element => {
          const rect = element.getBoundingClientRect();
          const minSize = 44; // Minimum touch target size in pixels
          
          if (rect.width < minSize || rect.height < minSize) {
            // Only log in development
            if (process.env.NODE_ENV === 'development') {
              console.warn('Touch target too small:', element);
            }
            element.classList.add('touch-target-warning');
          }
        });
      };

      // Run validation after a delay to ensure DOM is ready
      const timeout = setTimeout(validateTouchTargets, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [isMobile]);

  return <>{children}</>;
};

export default MobileAccessibility;
