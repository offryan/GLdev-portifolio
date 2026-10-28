import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BarraProgresso } from '@/componentes/estrutura/BarraProgresso/BarraProgresso';
import { BotaoVoltarTopo } from '@/componentes/estrutura/BotaoVoltarTopo/BotaoVoltarTopo';
import { ID_CONTEUDO, LinkPularConteudo } from '@/componentes/estrutura/LinkPularConteudo/LinkPularConteudo';
import { MenuSuperior } from '@/componentes/estrutura/MenuSuperior/MenuSuperior';
import { Rodape } from '@/componentes/estrutura/Rodape/Rodape';
import { FundoAnimado } from '@/componentes/fundo/FundoAnimado/FundoAnimado';
import { useRolagemDaRota } from '@/ganchos/useRolagemDaRota';
import { PaginaInicial } from '@/paginas/PaginaInicial/PaginaInicial';

// As páginas abaixo só são baixadas quando alguém as abre
const PaginaProjeto = lazy(() =>
  import('@/paginas/PaginaProjeto/PaginaProjeto').then((m) => ({ default: m.PaginaProjeto })),
);
const PaginaNaoEncontrada = lazy(() =>
  import('@/paginas/PaginaNaoEncontrada/PaginaNaoEncontrada').then((m) => ({ default: m.PaginaNaoEncontrada })),
);

export function App() {
  useRolagemDaRota();

  return (
    <>
      <LinkPularConteudo />
      <FundoAnimado />
      <BarraProgresso />
      <MenuSuperior />
      <main id={ID_CONTEUDO} tabIndex={-1}>
        <Suspense fallback={<div style={{ minHeight: '100svh' }} />}>
          <Routes>
            <Route path="/" element={<PaginaInicial />} />
            <Route path="/projetos/:slug" element={<PaginaProjeto />} />
            <Route path="*" element={<PaginaNaoEncontrada />} />
          </Routes>
        </Suspense>
      </main>
      <Rodape />
      <BotaoVoltarTopo />
    </>
  );
}
