import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Botao } from '@/componentes/interface/Botao/Botao';
import { IconeGithub, IconeLinkedin } from '@/componentes/interface/IconesMarcas/IconesMarcas';
import { perfil } from '@/conteudo/perfil';
import { SeloCertificacao } from '@/componentes/interface/SeloCertificacao/SeloCertificacao';
import { TerminalAnimado } from './TerminalAnimado';
import styles from './Abertura.module.css';

const suave = [0.22, 1, 0.36, 1] as const;

export function Abertura() {
  const [indiceFrase, setIndiceFrase] = useState(0);

  useEffect(() => {
    const intervalo = window.setInterval(
      () => setIndiceFrase((i) => (i + 1) % perfil.frasesRotativas.length),
      2600,
    );
    return () => window.clearInterval(intervalo);
  }, []);

  const letras = perfil.nome.split('');

  return (
    <section className={styles.abertura} id="inicio">
      <div className={`container ${styles.grade}`}>
        <div className={styles.texto}>
          {perfil.disponivelParaProjetos && (
            <motion.span
              className={styles.selo}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: suave }}
            >
              <span className={styles.pulso} />
              Disponível para novos projetos
            </motion.span>
          )}

          <motion.p
            className={styles.saudacao}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Olá, eu sou
          </motion.p>

          <h1 className={styles.nome} aria-label={perfil.nome}>
            {letras.map((letra, indice) => (
              <motion.span
                key={indice}
                aria-hidden="true"
                className={styles.letra}
                initial={{ opacity: 0, y: '0.6em', rotateX: -80 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.9, delay: 0.3 + indice * 0.045, ease: suave }}
              >
                {letra === ' ' ? ' ' : letra}
              </motion.span>
            ))}
          </h1>

          <motion.div
            className={styles.cargo}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: suave }}
          >
            <span>Eu crio</span>
            <span className={styles.rotativo}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={indiceFrase}
                  className="texto-gradiente"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.45, ease: suave }}
                >
                  {perfil.frasesRotativas[indiceFrase]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p
            className={styles.chamada}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8, ease: suave }}
          >
            {perfil.cargo}. {perfil.chamada}
          </motion.p>

          <motion.div
            className={styles.acoes}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: suave }}
          >
            <Botao href="#projetos" icone={<ArrowRight size={18} />}>
              Ver projetos
            </Botao>
            <Botao href={perfil.curriculo} variante="secundario" icone={<Download size={18} />} baixar>
              Baixar currículo
            </Botao>
          </motion.div>

          <motion.div
            className={styles.redes}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <span className={styles.local}>
              <MapPin size={16} /> {perfil.localizacao}
            </span>
            <span className={styles.separador} />
            {perfil.contato.linkedin && (
              <a href={perfil.contato.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <IconeLinkedin />
              </a>
            )}
            {perfil.contato.github && (
              <a href={perfil.contato.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <IconeGithub />
              </a>
            )}
            {perfil.contato.email && (
              <a href={`mailto:${perfil.contato.email}`} aria-label="E-mail">
                <Mail size={20} />
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.92, rotateY: -12 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: suave }}
        >
          <TerminalAnimado />
          <SeloCertificacao />
        </motion.div>
      </div>

      <a href="#sobre" className={styles.rolar} aria-label="role para a próxima seção">
        <span>role</span>
        <ArrowDown size={16} />
      </a>
    </section>
  );
}
