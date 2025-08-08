'use client';

import { useEffect, useRef } from 'react';

interface GlitterEffectProps {
  theme: 'light' | 'dark' | 'fancy';
  intensity?: 'low' | 'medium' | 'high';
}

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocity: { x: number; y: number };
  life: number;
  maxLife: number;
}

export function GlitterEffect({ theme, intensity = 'medium' }: GlitterEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle configuration based on theme and intensity
    const getParticleCount = () => {
      const baseCount = intensity === 'low' ? 20 : intensity === 'medium' ? 40 : 60;
      return theme === 'fancy' ? baseCount * 1.5 : baseCount;
    };

    const getParticleColor = () => {
      switch (theme) {
        case 'light':
          return ['#F11A7B', '#982176', '#FFE5AD'];
        case 'dark':
          return ['#F11A7B', '#FFE5AD', '#FFFFFF'];
        case 'fancy':
          return ['#F11A7B', '#982176', '#FFE5AD', '#FFFFFF', '#FF6B9D'];
        default:
          return ['#F11A7B'];
      }
    };

    // Create particle
    const createParticle = (): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (theme === 'fancy' ? 4 : 2) + 1,
        opacity: Math.random() * 0.8 + 0.2,
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
        },
        life: 0,
        maxLife: Math.random() * 200 + 100,
      };
    };

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const count = getParticleCount();
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    // Update particle
    const updateParticle = (particle: Particle) => {
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;
      particle.life++;

      // Fade in and out
      const lifeCycle = particle.life / particle.maxLife;
      if (lifeCycle < 0.1) {
        particle.opacity = lifeCycle * 10 * 0.8;
      } else if (lifeCycle > 0.9) {
        particle.opacity = (1 - lifeCycle) * 10 * 0.8;
      }

      // Reset particle if it's dead or out of bounds
      if (particle.life >= particle.maxLife || 
          particle.x < 0 || particle.x > canvas.width ||
          particle.y < 0 || particle.y > canvas.height) {
        Object.assign(particle, createParticle());
      }
    };

    // Render particle
    const renderParticle = (particle: Particle) => {
      const colors = getParticleColor();
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      
      // Create gradient for sparkle effect
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size
      );
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add sparkle cross for fancy mode
      if (theme === 'fancy' && Math.random() > 0.7) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particle.x - particle.size, particle.y);
        ctx.lineTo(particle.x + particle.size, particle.y);
        ctx.moveTo(particle.x, particle.y - particle.size);
        ctx.lineTo(particle.x, particle.y + particle.size);
        ctx.stroke();
      }
      
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        updateParticle(particle);
        renderParticle(particle);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: theme === 'light' ? 'multiply' : 'screen' }}
    />
  );
}