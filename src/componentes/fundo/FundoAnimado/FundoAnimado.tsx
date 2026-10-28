import { useEffect, useRef } from 'react';
import styles from './FundoAnimado.module.css';

interface Particula {
  x: number;
  y: number;
  vx: number;
  vy: number;
  raio: number;
}

const DISTANCIA_CONEXAO = 130;
const RAIO_MOUSE = 180;

/**
 * Fundo fixo do site, em duas camadas:
 * - auroras coloridas feitas em CSS (animadas pela placa de vídeo, sem pesar no processador);
 * - constelação de pontos conectados em canvas, que reage ao mouse.
 * As cores mudam levemente conforme a página é rolada.
 */
export function FundoAnimado() {
  const refFundo = useRef<HTMLDivElement>(null);
  const refCanvas = useRef<HTMLCanvasElement>(null);

  // Muda o tom das auroras conforme a rolagem
  useEffect(() => {
    let agendado = false;
    function atualizarMatiz() {
      agendado = false;
      const rolagemMaxima = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      refFundo.current?.style.setProperty('--matiz', `${(window.scrollY / rolagemMaxima) * 70}deg`);
    }
    function aoRolar() {
      if (agendado) return;
      agendado = true;
      requestAnimationFrame(atualizarMatiz);
    }
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  useEffect(() => {
    const canvas = refCanvas.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: -9999, y: -9999 };
    let largura = 0;
    let altura = 0;
    let intervaloQuadros = 1000 / 60;
    let particulas: Particula[] = [];
    let quadro = 0;
    let ultimoQuadro = 0;
    let iniciado = false;

    function redimensionar() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = window.innerWidth;
      altura = window.innerHeight;
      canvas!.width = largura * dpr;
      canvas!.height = altura * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Em telas pequenas: menos pontos e 30 quadros por segundo, para poupar bateria
      const telaPequena = largura < 768;
      intervaloQuadros = 1000 / (telaPequena ? 30 : 60);
      const limite = telaPequena ? 40 : 110;
      const quantidade = Math.min(limite, Math.floor((largura * altura) / 13000));
      particulas = Array.from({ length: quantidade }, () => ({
        x: Math.random() * largura,
        y: Math.random() * altura,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        raio: Math.random() * 1.4 + 0.5,
      }));
    }

    function moverParticulas() {
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
    }

    function desenharParticulas() {
      ctx!.clearRect(0, 0, largura, altura);
      ctx!.lineWidth = 1;

      for (let i = 0; i < particulas.length; i++) {
        const a = particulas[i];
        for (let j = i + 1; j < particulas.length; j++) {
          const b = particulas[j];
          const distancia = Math.hypot(a.x - b.x, a.y - b.y);
          if (distancia < DISTANCIA_CONEXAO) {
            ctx!.strokeStyle = `rgba(125, 220, 255, ${(1 - distancia / DISTANCIA_CONEXAO) * 0.22})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }

        const distanciaMouse = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (distanciaMouse < RAIO_MOUSE * 1.3) {
          ctx!.strokeStyle = `rgba(196, 181, 253, ${(1 - distanciaMouse / (RAIO_MOUSE * 1.3)) * 0.45})`;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
      }

      ctx!.fillStyle = 'rgba(230, 240, 255, 0.75)';
      ctx!.beginPath();
      for (const p of particulas) {
        ctx!.moveTo(p.x + p.raio, p.y);
        ctx!.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
      }
      ctx!.fill();
    }

    function animar(tempo: number) {
      quadro = requestAnimationFrame(animar);
      if (tempo - ultimoQuadro < intervaloQuadros) return;
      ultimoQuadro = tempo;
      moverParticulas();
      desenharParticulas();
    }

    function iniciar() {
      if (iniciado) return;
      iniciado = true;
      redimensionar();
      if (movimentoReduzido) desenharParticulas();
      else quadro = requestAnimationFrame(animar);
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
      if (!document.hidden && iniciado && !movimentoReduzido) quadro = requestAnimationFrame(animar);
    }

    function aoRedimensionar() {
      if (!iniciado) return;
      redimensionar();
      if (movimentoReduzido) desenharParticulas();
    }

    // A constelação só começa depois que a página terminou de carregar,
    // para não disputar o processador com o primeiro desenho da tela
    const aguardar = window.setTimeout(iniciar, 1200);

    window.addEventListener('resize', aoRedimensionar);
    window.addEventListener('pointermove', aoMoverMouse);
    document.addEventListener('pointerleave', aoSairMouse);
    document.addEventListener('visibilitychange', aoMudarVisibilidade);

    return () => {
      window.clearTimeout(aguardar);
      cancelAnimationFrame(quadro);
      window.removeEventListener('resize', aoRedimensionar);
      window.removeEventListener('pointermove', aoMoverMouse);
      document.removeEventListener('pointerleave', aoSairMouse);
      document.removeEventListener('visibilitychange', aoMudarVisibilidade);
    };
  }, []);

  return (
    <div ref={refFundo} className={styles.fundo} aria-hidden="true">
      <div className={styles.auroras}>
        <span className={styles.aurora} />
        <span className={styles.aurora} />
        <span className={styles.aurora} />
        <span className={styles.aurora} />
      </div>
      <canvas ref={refCanvas} className={styles.canvas} />
      <div className={styles.grade} />
      <div className={styles.granulado} />
      <div className={styles.vinheta} />
    </div>
  );
}
