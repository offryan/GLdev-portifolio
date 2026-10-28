import { Route, Routes } from 'react-router-dom';
import { BarraProgresso } from '@/componentes/estrutura/BarraProgresso/BarraProgresso';
import { BotaoVoltarTopo } from '@/componentes/estrutura/BotaoVoltarTopo/BotaoVoltarTopo';
import { MenuSuperior } from '@/componentes/estrutura/MenuSuperior/MenuSuperior';
import { Rodape } from '@/componentes/estrutura/Rodape/Rodape';
import { FundoAnimado } from '@/componentes/fundo/FundoAnimado/FundoAnimado';
import { useRolagemDaRota } from '@/ganchos/useRolagemDaRota';
import { PaginaInicial } from '@/paginas/PaginaInicial/PaginaInicial';
import { PaginaNaoEncontrada } from '@/paginas/PaginaNaoEncontrada/PaginaNaoEncontrada';
import { PaginaProjeto } from '@/paginas/PaginaProjeto/PaginaProjeto';

export function App() {
  useRolagemDaRota();

  return (
    <>
      <FundoAnimado />
      <BarraProgresso />
      <MenuSuperior />
      <main>
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/projetos/:slug" element={<PaginaProjeto />} />
          <Route path="*" element={<PaginaNaoEncontrada />} />
        </Routes>
      </main>
      <Rodape />
      <BotaoVoltarTopo />
    </>
  );
}
