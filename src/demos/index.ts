import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { IdDemo } from '@/tipos/conteudo';

/**
 * Demonstrações interativas disponíveis para os projetos.
 * Para criar uma nova: crie a pasta em src/demos, registre aqui e
 * adicione o nome em `IdDemo` (src/tipos/conteudo.ts).
 */
export const DEMOS: Record<IdDemo, LazyExoticComponent<ComponentType>> = {
  'painel-operacoes': lazy(() => import('./PainelOperacoes/PainelOperacoes')),
  'robo-faturamento': lazy(() => import('./RoboFaturamento/RoboFaturamento')),
  'previsao-demanda': lazy(() => import('./PrevisaoDemanda/PrevisaoDemanda')),
};
