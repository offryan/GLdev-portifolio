import { Check, Copy, Mail } from 'lucide-react';
import { useState } from 'react';
import { Botao } from '@/componentes/interface/Botao/Botao';
import { IconeGithub, IconeLinkedin, IconeWhatsapp } from '@/componentes/interface/IconesMarcas/IconesMarcas';
import { Revelar } from '@/componentes/interface/Revelar/Revelar';
import { perfil } from '@/conteudo/perfil';
import { linkWhatsapp } from '@/utilitarios/navegacao';
import styles from './Contato.module.css';

export function Contato() {
  const [copiado, setCopiado] = useState(false);
  const { email, linkedin, github, whatsapp } = perfil.contato;

  async function copiarEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <section id="contato" className={styles.contato}>
      <div className="container">
        <Revelar className={styles.caixa}>
          <span className={styles.rotulo}>06 — Contato</span>
          <h2 className={styles.titulo}>
            Vamos transformar seus dados em <span className="texto-gradiente">resultado?</span>
          </h2>
          <p className={styles.texto}>
            Tem um processo manual demais, um dashboard que ninguém entende ou dados espalhados por todo lado? Me
            conta — eu ajudo a resolver.
          </p>

          <div className={styles.acoes}>
            <Botao href={`mailto:${email}`} icone={<Mail size={18} />}>
              Enviar e-mail
            </Botao>
            <Botao variante="secundario" onClick={copiarEmail} icone={copiado ? <Check size={18} /> : <Copy size={18} />}>
              {copiado ? 'Copiado!' : email}
            </Botao>
          </div>

          <div className={styles.redes}>
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <IconeLinkedin /> LinkedIn
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer">
                <IconeGithub /> GitHub
              </a>
            )}
            {whatsapp && (
              <a href={linkWhatsapp(whatsapp)} target="_blank" rel="noopener noreferrer">
                <IconeWhatsapp /> WhatsApp
              </a>
            )}
          </div>
        </Revelar>
      </div>
    </section>
  );
}
