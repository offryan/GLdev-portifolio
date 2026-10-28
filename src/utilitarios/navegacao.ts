/** Seções da página inicial que aparecem no menu. */
export const SECOES_MENU = [
  { id: 'sobre', rotulo: 'Sobre' },
  { id: 'habilidades', rotulo: 'Habilidades' },
  { id: 'projetos', rotulo: 'Projetos' },
  { id: 'experiencia', rotulo: 'Experiência' },
  { id: 'contato', rotulo: 'Contato' },
] as const;

export function rolarAteSecao(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Monta o link do WhatsApp a partir do número (somente dígitos). */
export function linkWhatsapp(numero: string) {
  return `https://wa.me/${numero.replace(/\D/g, '')}`;
}
