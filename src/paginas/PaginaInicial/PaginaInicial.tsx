import { Abertura } from '@/secoes/Abertura/Abertura';
import { Contato } from '@/secoes/Contato/Contato';
import { Experiencia } from '@/secoes/Experiencia/Experiencia';
import { Formacao } from '@/secoes/Formacao/Formacao';
import { Habilidades } from '@/secoes/Habilidades/Habilidades';
import { Projetos } from '@/secoes/Projetos/Projetos';
import { Sobre } from '@/secoes/Sobre/Sobre';

/** Página principal: as seções aparecem nesta ordem. */
export function PaginaInicial() {
  return (
    <>
      <Abertura />
      <Sobre />
      <Habilidades />
      <Projetos />
      <Experiencia />
      <Formacao />
      <Contato />
    </>
  );
}
