import React, { useEffect, useRef, useState } from 'react';

// Full custom cursor system:
// - Crosshair dot that snaps INSTANTLY to mouse (no lag)
// - Outer ring that follows with slight lag (so it's readable, not annoying)
// - Click burst: ring explodes out on click
// - Particle trail: tiny sparks spawn behind movement
// - Hover state: dot changes color/shape on interactive elements
export default function CursorGlow() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const canvasRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // If no mouse is detected, we keep the default OS cursor
    if (!isFine || noMotion) {
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    // Enable custom cursor
    setEnabled(true);
    document.body.classList.add('custom-cursor-active');
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;
    if (!dot || !ring || !canvas) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: mouse.x, y: mouse.y };
    let clicking = false;
    let clickAnim = 0;
    let hovering = false;
    const particles = [];

    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMove = (e) => {
      // spawn trail particle
      particles.push({
        x: e.clientX, y: e.clientY,
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.5) * 1.8 - 0.5,
        life: 1,
        size: Math.random() * 3 + 1,
        hue: Math.random() > 0.5 ? 'pink' : 'cyan',
      });
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onClick = () => {
      clicking = true;
      clickAnim = 1;
      // burst of particles
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const speed = Math.random() * 4 + 2;
        particles.push({
          x: mouse.x, y: mouse.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: Math.random() * 4 + 2,
          hue: Math.random() > 0.5 ? 'pink' : 'cyan',
        });
      }
    };

    const onEnterInteractive = () => { hovering = true; };
    const onLeaveInteractive = () => { hovering = false; };

    const interactives = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);
    window.addEventListener('resize', onResize);

    let frame;
    const tick = () => {
      // ── dot: instant snap ──
      dot.style.transform = `translate3d(${mouse.x - 4}px, ${mouse.y - 4}px, 0)`;

      // dot color on hover
      dot.style.background = hovering
        ? '#5ffbf1'
        : clicking ? '#ff9d76' : '#ff6ec7';
      dot.style.boxShadow = hovering
        ? '0 0 10px #5ffbf1, 0 0 20px rgba(95,251,241,0.5)'
        : '0 0 10px #ff6ec7, 0 0 20px rgba(255,110,199,0.5)';
      dot.style.transform = `translate3d(${mouse.x - (hovering ? 8 : 4)}px, ${mouse.y - (hovering ? 8 : 4)}px, 0) scale(${hovering ? 2 : 1})`;

      // ── ring: slight lag for style ──
      ringPos.x += (mouse.x - ringPos.x) * 0.18;
      ringPos.y += (mouse.y - ringPos.y) * 0.18;
      const ringSize = hovering ? 48 : clickAnim > 0 ? 40 + (1 - clickAnim) * 30 : 32;
      ring.style.width  = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;
      ring.style.transform = `translate3d(${ringPos.x - ringSize / 2}px, ${ringPos.y - ringSize / 2}px, 0)`;
      ring.style.borderColor = hovering ? '#5ffbf1' : '#ff6ec7';
      ring.style.opacity = hovering ? '0.9' : '0.55';
      if (clickAnim > 0) {
        clickAnim = Math.max(0, clickAnim - 0.07);
        if (clickAnim === 0) clicking = false;
      }

      // ── canvas particles ──
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.06; // gravity
        p.life -= 0.035;
        if (p.life <= 0) { particles.splice(i, 1); continue; }

        const alpha = p.life;
        const color = p.hue === 'pink'
          ? `rgba(255,110,199,${alpha})`
          : `rgba(95,251,241,${alpha})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fill();
      }

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
      document.body.classList.remove('custom-cursor-active');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <canvas ref={canvasRef} className="cursor-canvas" aria-hidden="true" />
      <div ref={ringRef}  className="cursor-ring"   aria-hidden="true" />
      <div ref={dotRef}   className="cursor-dot"    aria-hidden="true" />
    </>
  );
}