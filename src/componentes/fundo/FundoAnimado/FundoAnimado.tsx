import { useEffect, useRef } from 'react';
import styles from './FundoAnimado.module.css';

interface Particula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  raio: number;
}

/** Manchas de luz em movimento ("aurora"). Valores relativos ao tamanho da tela. */
const AURORAS = [
  { matiz: 262, tamanho: 0.62, velocidade: 0.00013, centroX: 0.18, centroY: 0.2, amplitude: 0.22 },
  { matiz: 190, tamanho: 0.55, velocidade: 0.00017, centroX: 0.82, centroY: 0.3, amplitude: 0.2 },
  { matiz: 160, tamanho: 0.5, velocidade: 0.00011, centroX: 0.6, centroY: 0.85, amplitude: 0.25 },
  { matiz: 320, tamanho: 0.42, velocidade: 0.00015, centroX: 0.3, centroY: 0.75, amplitude: 0.18 },
];

const DISTANCIA_CONEXAO = 130;
const RAIO_MOUSE = 180;

/**
 * Fundo fixo do site: auroras coloridas + constelação de pontos conectados
 * que reage ao mouse. As cores mudam levemente conforme a página é rolada.
 */
export function FundoAnimado() {
  const refCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = refCanvas.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: -9999, y: -9999 };
    let largura = 0;
    let altura = 0;
    let particulas: Particula[] = [];
    let quadro = 0;

    function redimensionar() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = window.innerWidth;
      altura = window.innerHeight;
      canvas!.width = largura * dpr;
      canvas!.height = altura * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const quantidade = Math.min(120, Math.floor((largura * altura) / 13000));
      particulas = Array.from({ length: quantidade }, () => ({
        x: Math.random() * largura,
        y: Math.random() * altura,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        raio: Math.random() * 1.4 + 0.5,
      }));
    }

    function desenharAuroras(tempo: number, desvioMatiz: number) {
      const maior = Math.max(largura, altura);
      ctx!.globalCompositeOperation = 'lighter';
      for (const aurora of AURORAS) {
        const t = tempo * aurora.velocidade;
        const x = (aurora.centroX + Math.sin(t) * aurora.amplitude) * largura;
        const y = (aurora.centroY + Math.cos(t * 1.3) * aurora.amplitude) * altura;
        const raio = aurora.tamanho * maior * (0.9 + Math.sin(t * 2) * 0.1);
        const matiz = aurora.matiz + desvioMatiz;
        const gradiente = ctx!.createRadialGradient(x, y, 0, x, y, raio);
        gradiente.addColorStop(0, `hsla(${matiz}, 90%, 60%, 0.32)`);
        gradiente.addColorStop(0.45, `hsla(${matiz}, 90%, 50%, 0.12)`);
        gradiente.addColorStop(1, `hsla(${matiz}, 90%, 40%, 0)`);
        ctx!.fillStyle = gradiente;
        ctx!.fillRect(0, 0, largura, altura);
      }
      ctx!.globalCompositeOperation = 'source-over';
    }

    function desenharParticulas(desvioMatiz: number) {
      for (const p of particulas) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = largura;
        if (p.x > largura) p.x = 0;
        if (p.y < 0) p.y = altura;
        if (p.y > altura) p.y = 0;

        // Os pontos se afastam levemente do cursor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distancia = Math.hypot(dx, dy);
        if (distancia < RAIO_MOUSE && distancia > 0) {
          const forca = (1 - distancia / RAIO_MOUSE) * 1.2;
          p.x += (dx / distancia) * forca;
          p.y += (dy / distancia) * forca;
        }
      }

      const corLinha = 190 + desvioMatiz;
      for (let i = 0; i < particulas.length; i++) {
        const a = particulas[i];
        for (let j = i + 1; j < particulas.length; j++) {
          const b = particulas[j];
          const distancia = Math.hypot(a.x - b.x, a.y - b.y);
          if (distancia < DISTANCIA_CONEXAO) {
            ctx!.strokeStyle = `hsla(${corLinha}, 90%, 70%, ${(1 - distancia / DISTANCIA_CONEXAO) * 0.22})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }

        const distanciaMouse = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (distanciaMouse < RAIO_MOUSE * 1.3) {
          ctx!.strokeStyle = `hsla(${corLinha + 60}, 90%, 75%, ${(1 - distanciaMouse / (RAIO_MOUSE * 1.3)) * 0.45})`;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }

        ctx!.fillStyle = 'rgba(230, 240, 255, 0.75)';
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, a.raio, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function desenhar(tempo: number) {
      const rolagemMaxima = Math.max(1, document.documentElement.scrollHeight - altura);
      const desvioMatiz = (window.scrollY / rolagemMaxima) * 70;

      ctx!.fillStyle = '#05060d';
      ctx!.fillRect(0, 0, largura, altura);
      desenharAuroras(tempo, desvioMatiz);
      desenharParticulas(desvioMatiz);

      if (!movimentoReduzido) quadro = requestAnimationFrame(desenhar);
    }

    function aoMoverMouse(evento: PointerEvent) {
      mouse.x = evento.clientX;
      mouse.y = evento.clientY;
    }

    function aoSairMouse() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function aoMudarVisibilidade() {
      cancelAnimationFrame(quadro);
      if (!document.hidden) quadro = requestAnimationFrame(desenhar);
    }

    redimensionar();
    quadro = requestAnimationFrame(desenhar);
    window.addEventListener('resize', redimensionar);
    window.addEventListener('pointermove', aoMoverMouse);
    document.addEventListener('pointerleave', aoSairMouse);
    document.addEventListener('visibilitychange', aoMudarVisibilidade);

    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener('resize', redimensionar);
      window.removeEventListener('pointermove', aoMoverMouse);
      document.removeEventListener('pointerleave', aoSairMouse);
      document.removeEventListener('visibilitychange', aoMudarVisibilidade);
    };
  }, []);

  return (
    <div className={styles.fundo} aria-hidden="true">
      <canvas ref={refCanvas} className={styles.canvas} />
      <div className={styles.grade} />
      <div className={styles.granulado} />
      <div className={styles.vinheta} />
    </div>
  );
}
