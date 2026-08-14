import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseX: number;
      baseY: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        // Very slow, subtle drift (speed: 0.6 approx)
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2.5 + 1.0;
      }

      update(width: number, height: number, mouseOffsetX: number, mouseOffsetY: number) {
        this.baseX += this.vx;
        this.baseY += this.vy;

        // Bounce off edges smoothly for the base position
        if (this.baseX < 0 || this.baseX > width) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > height) this.vy *= -1;

        // Apply subtle parallax (particles shift opposite cursor direction)
        this.x = this.baseX - mouseOffsetX * (this.radius * 0.5);
        this.y = this.baseY - mouseOffsetY * (this.radius * 0.5);
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.8)'; // Indigo-500
        ctx.fill();
      }
    }

    const init = () => {
      const numParticles = Math.floor((canvas.width * canvas.height) / 12000);
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1 range
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Smoothly interpolate mouse position for parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Connection radius
          if (distance < 160) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Fade out based on distance
            const opacity = (1 - distance / 160) * 0.4;
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      // Max parallax shift of ~8px as requested
      const maxShift = 16;
      const mouseOffsetX = mouseX * maxShift;
      const mouseOffsetY = mouseY * maxShift;

      // Update and draw dots
      for (const particle of particles) {
        particle.update(width, height, mouseOffsetX, mouseOffsetY);
        particle.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        maskImage: 'linear-gradient(to bottom, black 0%, transparent 60%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 60%)'
      }}
      className="absolute inset-0 pointer-events-none z-0 opacity-100"
    />
  );
}
