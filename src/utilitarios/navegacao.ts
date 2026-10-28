/** Seções da página inicial que aparecem no menu. */
export const SECOES_MENU = [
  { id: 'sobre', rotulo: 'Sobre' },
  { id: 'habilidades', rotulo: 'Habilidades' },
  { id: 'projetos', rotulo: 'Projetos' },
  { id: 'experiencia', rotulo: 'Experiência' },
  { id: 'contato', rotulo: 'Contato' },
] as const;

/** id do link da logo: primeiro item focável da página. */
export const ID_LINK_INICIO = 'link-inicio';

function comportamentoRolagem(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

export function rolarAteSecao(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: comportamentoRolagem(), block: 'start' });
}

/** Sobe ao topo e devolve o foco ao início da página, para quem navega pelo teclado. */
export function voltarAoTopo() {
  window.scrollTo({ top: 0, behavior: comportamentoRolagem() });
  document.getElementById(ID_LINK_INICIO)?.focus({ preventScroll: true });
}

/** Monta o link do WhatsApp a partir do número (somente dígitos). */
export function linkWhatsapp(numero: string) {
  return `https://wa.me/${numero.replace(/\D/g, '')}`;
}
