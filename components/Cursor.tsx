'use client';

import { useEffect, useState, useRef } from 'react';

export function Cursor() {
  // All hooks must be declared first, before any conditional returns
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [pulseOpacity, setPulseOpacity] = useState(0.3);
  const [isTouch, setIsTouch] = useState(true); // Start as true to avoid flash
  const [isDark, setIsDark] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const isReducedMotion = useRef(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion.current = mediaQuery.matches;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const updateCursor = () => {
      if (isReducedMotion.current) {
        // No lag for reduced motion
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
        }
      } else {
        // Smooth interpolation with lag
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check for interactive elements
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('highlight-hover') ||
        target.closest('.highlight-hover') ||
        target.onclick !== null ||
        target.getAttribute('role') === 'button';

      setIsHovering(!!isInteractive);

      // Check if over text for reading mode (only if not interactive)
      if (!isInteractive) {
        const computedStyle = window.getComputedStyle(target);
        const isTextElement =
          target.tagName === 'P' ||
          target.tagName === 'SPAN' ||
          target.tagName === 'H1' ||
          target.tagName === 'H2' ||
          target.tagName === 'H3' ||
          target.tagName === 'H4' ||
          target.tagName === 'H5' ||
          target.tagName === 'H6' ||
          target.tagName === 'LI' ||
          target.tagName === 'DIV' ||
          computedStyle.cursor === 'text' ||
          computedStyle.userSelect === 'text';

        setIsReading(isTextElement);
      } else {
        setIsReading(false);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsReading(false);
    };

    // Start animation loop
    rafRef.current = requestAnimationFrame(updateCursor);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Opacity pulse animation (only when not hovering or reading)
  useEffect(() => {
    if (isHovering || isReading) {
      setPulseOpacity(1);
      return;
    }

    const interval = setInterval(() => {
      setPulseOpacity((prev) => (prev === 0.3 ? 0.25 : 0.3));
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovering, isReading]);

  // Don't show cursor on touch devices
  useEffect(() => {
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(touchDevice);
    
    // Add class to body to enable cursor hiding
    if (!touchDevice) {
      document.body.classList.add('custom-cursor-active');
    }
    
    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  // Get theme-aware colors
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  // Early return after all hooks are declared
  if (isTouch) return null;

  const defaultColor = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)';
  const hoverColor = 'rgba(150, 180, 220, 0.15)'; // Light greyish blue
  const hoverRingColor = 'rgba(150, 180, 220, 0.4)'; // Light greyish blue
  const hoverGlowColor = 'rgba(150, 180, 220, 0.2)'; // Light greyish blue
  const readingColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          willChange: 'transform',
        }}
      >
        {/* Main cursor */}
        <div
          className="absolute top-0 left-0"
          style={{
            transform: 'translate(-50%, -50%)',
            width: isReading
              ? '2px'
              : isClicking
              ? '8px'
              : isHovering
              ? '32px'
              : '10px',
            height: isReading
              ? '24px'
              : isClicking
              ? '8px'
              : isHovering
              ? '32px'
              : '10px',
            borderRadius: isReading ? '0' : '50%',
            backgroundColor: isReading
              ? readingColor
              : isHovering
              ? hoverColor
              : defaultColor,
            opacity: isReading ? 1 : isHovering ? 1 : pulseOpacity,
            filter: isHovering ? 'blur(2px)' : 'none',
            boxShadow: isReading
              ? 'none'
              : isHovering
              ? `0 0 0 2px ${hoverRingColor}, 0 0 20px ${hoverGlowColor}`
              : 'none',
            transition: isClicking
              ? 'width 0.1s ease-out, height 0.1s ease-out, opacity 0.1s ease-out, border-radius 0.1s ease-out'
              : 'width 0.2s ease-out, height 0.2s ease-out, opacity 0.2s ease-out, box-shadow 0.2s ease-out, filter 0.2s ease-out, border-radius 0.2s ease-out, background-color 0.2s ease-out',
          }}
        />
      </div>
    </>
  );
}

