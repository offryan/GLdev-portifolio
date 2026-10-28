import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState, type MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '@/componentes/interface/Logo/Logo';
import { useSecaoAtiva } from '@/ganchos/useSecaoAtiva';
import { SECOES_MENU, rolarAteSecao } from '@/utilitarios/navegacao';
import styles from './MenuSuperior.module.css';

const IDS_SECOES = SECOES_MENU.map((secao) => secao.id);

export function MenuSuperior() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const { pathname } = useLocation();
  const navegar = useNavigate();
  const secaoAtiva = useSecaoAtiva(IDS_SECOES);
  const naInicial = pathname === '/';

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : '';
  }, [aberto]);

  function irPara(evento: MouseEvent, id: string) {
    evento.preventDefault();
    setAberto(false);
    if (naInicial) {
      rolarAteSecao(id);
      window.history.replaceState(null, '', `#${id}`);
    } else {
      navegar(`/#${id}`);
    }
  }

  return (
    <header className={`${styles.menu} ${rolou || aberto ? styles.solido : ''}`}>
      <nav className={`container ${styles.conteudo}`} aria-label="Principal">
        <Link to="/" className={styles.marca} aria-label="gldev — página inicial" onClick={() => setAberto(false)}>
          <Logo />
        </Link>

        <ul className={styles.links}>
          {SECOES_MENU.map((secao) => (
            <li key={secao.id}>
              <a
                href={`/#${secao.id}`}
                onClick={(e) => irPara(e, secao.id)}
                className={naInicial && secaoAtiva === secao.id ? styles.ativo : undefined}
              >
                {secao.rotulo}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles.botaoMobile}
          onClick={() => setAberto((v) => !v)}
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
        >
          {aberto ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {aberto && (
          <motion.ul
            className={styles.painelMobile}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {SECOES_MENU.map((secao, indice) => (
              <motion.li
                key={secao.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * indice }}
              >
                <a href={`/#${secao.id}`} onClick={(e) => irPara(e, secao.id)}>
                  <span>0{indice + 1}</span>
                  {secao.rotulo}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
