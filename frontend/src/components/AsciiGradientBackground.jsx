import { useCallback, useEffect, useRef } from 'react';

// Colors pulled from the portfolio's mesh-gradient.svg
export const DEFAULT_SETTINGS = {
  density: 0.75,
  spread: 230,
  softness: 0.44,
  boldness: 0,
  middlefloor: 0,
  cell: 14,
  fontsize: 13,
  fontfamily: "'DM Mono', ui-monospace, monospace",
  fontweight: 300,
  charset: ' .:-=+*#%@',
  radius: 140,
  strength: 5700,
  spring: 0.025,
  damping: 0.82,
  shimmer: 0.12,
  speed: 0.6,
  colorGold: '#f3b717',
  colorOlive: '#9e9a36',
  colorCream: '#fffcf4',
};

function hexToRgb(hex) {
  const v = hex.replace('#', '');
  return [
    parseInt(v.substring(0, 2), 16),
    parseInt(v.substring(2, 4), 16),
    parseInt(v.substring(4, 6), 16),
  ];
}

function lerp(a, b, k) {
  return a + (b - a) * k;
}

function lerpColor(c1, c2, k) {
  return [
    Math.round(lerp(c1[0], c2[0], k)),
    Math.round(lerp(c1[1], c2[1], k)),
    Math.round(lerp(c1[2], c2[2], k)),
  ];
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

// Hard-edged radial falloff: fully 1 within the plateau, smoothstep out
// to exactly 0 at `r`. No gaussian tail, so no speckling far from a blob.
function smoothFalloff(dist, r, softness) {
  if (dist >= r) return 0;
  const plateau = r * (1 - softness);
  if (dist <= plateau) return 1;
  const span = Math.max(r - plateau, 0.001);
  const k = 1 - (dist - plateau) / span;
  return k * k * (3 - 2 * k);
}

/**
 * Fixed, full-viewport ASCII gradient background. Two radial character
 * blobs anchored to the portfolio's mesh-gradient corners (top-right /
 * bottom-left), with cursor-repel physics. Renders behind page content
 * and ignores scroll (position: fixed).
 *
 * Mount this once near the root of the app (e.g. in App.jsx, outside
 * <Routes>) so it persists across route changes instead of remounting
 * on every navigation.
 */
export default function AsciiGradientBackground({ settings = DEFAULT_SETTINGS }) {
  const canvasRef = useRef(null);
  const settingsRef = useRef(settings);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const dimsRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef(null);
  const tRef = useRef(0);

  // Keep the latest settings available to the animation loop without
  // needing to restart it on every slider change.
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    dimsRef.current = { w, h };

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cell = settingsRef.current.cell;
    const cols = Math.ceil(w / cell) + 1;
    const rows = Math.ceil(h / cell) + 1;

    const particles = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const hx = col * cell;
        const hy = row * cell;
        particles.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0 });
      }
    }
    particlesRef.current = particles;
  }, []);

  // Rebuild the particle grid whenever cell spacing changes.
  useEffect(() => {
    resize();
  }, [settings.cell, resize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    function draw() {
      const s = settingsRef.current;
      const { w, h } = dimsRef.current;

      tRef.current += prefersReducedMotion ? 0 : 0.01 * s.speed;
      const t = tRef.current;

      const CREAM = hexToRgb(s.colorCream);
      const GOLD = hexToRgb(s.colorGold);
      const OLIVE = hexToRgb(s.colorOlive);
      const RAMP = s.charset.length > 0 ? s.charset : ' .:-=+*#%@';

      ctx.fillStyle = 'rgb(' + CREAM.join(',') + ')';
      ctx.fillRect(0, 0, w, h);

      ctx.font = s.fontweight + ' ' + s.fontsize + 'px ' + s.fontfamily;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      // Blob centers matched to the mesh-gradient.svg swatch positions.
      const trX = w * 0.877, trY = h * 0.054;
      const blX = w * 0.07, blY = h * 0.86;

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dxHome = p.hx - p.x;
        const dyHome = p.hy - p.y;
        p.vx += dxHome * s.spring;
        p.vy += dyHome * s.spring;

        if (mouse.active && s.radius > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          if (dist < s.radius) {
            const force = ((1 - dist / s.radius) * s.strength) / (dist + 20);
            p.vx += (dx / dist) * force * 0.016;
            p.vy += (dy / dist) * force * 0.016;
          }
        }

        p.vx *= s.damping;
        p.vy *= s.damping;
        p.x += p.vx;
        p.y += p.vy;

        const ambient =
          (Math.sin(p.hx * 0.02 + t * 1.4) + Math.cos(p.hy * 0.025 + t * 1.1)) / 2;
        const displacement = Math.sqrt((p.x - p.hx) ** 2 + (p.y - p.hy) ** 2);
        const displacementBoost = clamp01(displacement / 60);

        const dTR = Math.sqrt((p.hx - trX) ** 2 + (p.hy - trY) ** 2);
        const dBL = Math.sqrt((p.hx - blX) ** 2 + (p.hy - blY) ** 2);
        const infTR = smoothFalloff(dTR, s.spread, s.softness);
        const infBL = smoothFalloff(dBL, s.spread, s.softness);
        const spatialWeight = clamp01(Math.max(infTR, infBL, s.middlefloor));

        if (spatialWeight < 0.02 && displacementBoost < 0.05) continue;

        let intensity =
          (s.density + ambient * s.shimmer) * spatialWeight +
          displacementBoost * 0.4 * spatialWeight;
        intensity = clamp01(intensity);
        if (intensity < 0.05) continue;

        const rampIdx = Math.min(
          RAMP.length - 1,
          Math.floor(intensity * (RAMP.length - 1))
        );
        const char = RAMP[rampIdx];
        if (char === ' ') continue;

        const gradColor = lerpColor(
          OLIVE,
          GOLD,
          clamp01(infTR / (infTR + infBL + 0.0001))
        );
        const alpha = 0.45 + intensity * 0.55;

        ctx.fillStyle =
          'rgba(' + gradColor[0] + ',' + gradColor[1] + ',' + gradColor[2] + ',' +
          alpha.toFixed(3) + ')';
        ctx.fillText(char, p.x, p.y);

        const boldOffset = s.boldness * 1.1;
        if (boldOffset > 0.05) {
          ctx.fillText(char, p.x + boldOffset, p.y);
          ctx.fillText(char, p.x - boldOffset, p.y);
          ctx.fillText(char, p.x, p.y + boldOffset);
          ctx.fillText(char, p.x, p.y - boldOffset);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    function handleResize() {
      resize();
    }
    function handleMouseMove(e) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    }
    function handleMouseLeave() {
      mouseRef.current.active = false;
    }
    function handleTouchMove(e) {
      if (e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    }
    function handleTouchEnd() {
      mouseRef.current.active = false;
    }

    resize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
}
