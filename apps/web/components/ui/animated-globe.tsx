'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';

interface AnimatedGlobeProps {
  theme?: 'light' | 'dark' | 'fancy';
}

export function AnimatedGlobe({ theme = 'dark' }: AnimatedGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const rotationRef = useRef<number>(0);

  // Globe colors based on theme
  const colors = useMemo(() => {
    switch (theme) {
      case 'light':
        return {
          globe: '#3B82F6',
          grid: '#60A5FA',
          continents: '#1E40AF',
          glow: 'rgba(59, 130, 246, 0.3)',
        };
      case 'fancy':
        return {
          globe: '#F11A7B',
          grid: '#FFE5AD',
          continents: '#982176',
          glow: 'rgba(241, 26, 123, 0.4)',
        };
      default:
        return {
          globe: '#F11A7B',
          grid: '#FFE5AD',
          continents: '#982176',
          glow: 'rgba(241, 26, 123, 0.3)',
        };
    }
  }, [theme]);

  // Pre-calculate city positions for better performance
  const cities = useMemo(() => [
    { lat: 40.7, lng: -74 }, // New York
    { lat: 51.5, lng: 0 }, // London
    { lat: 35.7, lng: 139.7 }, // Tokyo
    { lat: -33.9, lng: 151.2 }, // Sydney
    { lat: 37.8, lng: -122.4 }, // San Francisco
    { lat: 55.8, lng: 37.6 }, // Moscow
  ], []);

  // Draw globe with optimizations
  const drawGlobe = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const rotation = rotationRef.current;
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    const radius = Math.min(centerX, centerY) * 0.8;

    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Outer glow
    const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.2);
    gradient.addColorStop(0, colors.glow);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Main globe circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = colors.globe;
    ctx.fill();

    // Grid lines (longitude) - reduced iterations for performance
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.6;

    for (let i = 0; i < 8; i++) { // Reduced from 12 to 8
      const angle = (i * Math.PI) / 4 + rotation;
      const radiusX = Math.abs(radius * Math.cos(angle));
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radiusX, radius, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Grid lines (latitude) - reduced iterations
    for (let i = 1; i < 5; i++) { // Reduced from 6 to 5
      const y = centerY + (radius * (i - 2.5)) / 2.5;
      const ellipseRadius = radius * Math.sqrt(1 - Math.pow((i - 2.5) / 2.5, 2));

      if (ellipseRadius > 0) {
        ctx.beginPath();
        ctx.ellipse(centerX, y, ellipseRadius, ellipseRadius * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Simplified continents (dots representing major cities/regions)
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = colors.continents;

    const time = Date.now() * 0.005; // Cache time calculation

    cities.forEach(city => {
      const adjustedLng = city.lng + rotation * 20;
      const x = centerX + radius * Math.cos(city.lat * Math.PI / 180) * Math.cos(adjustedLng * Math.PI / 180);
      const y = centerY + radius * Math.sin(city.lat * Math.PI / 180);

      // Only draw if on visible hemisphere
      if (Math.cos(adjustedLng * Math.PI / 180) > 0) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Pulse effect - optimized with cached time
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(x, y, 6 + Math.sin(time) * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.8;
      }
    });

    ctx.globalAlpha = 1;
  }, [colors, cities]);

  // Animation loop with frame rate limiting
  const animate = useCallback((currentTime: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const deltaTime = currentTime - lastTimeRef.current;

    // Limit to ~60fps (16.67ms per frame)
    if (deltaTime >= 16) {
      rotationRef.current += 0.005; // Smooth rotation
      drawGlobe(ctx, canvas);
      lastTimeRef.current = currentTime;
    }

    animationRef.current = requestAnimationFrame((time) => animate(time, ctx, canvas));
  }, [drawGlobe]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Check for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
      animationRef.current = requestAnimationFrame((time) => animate(time, ctx, canvas));
    } else {
      drawGlobe(ctx, canvas);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [animate, drawGlobe]);

  return (
    <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 20px rgba(241, 26, 123, 0.3))' }}
      />

      {/* Orbital rings for fancy mode */}
      {theme === 'fancy' && (
        <>
          <div className="absolute inset-0 border-2 border-highlight/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute inset-2 border border-primary/30 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        </>
      )}
    </div>
  );
}