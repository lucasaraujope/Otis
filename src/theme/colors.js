export const colors = {
  primary: '#0ba5df',
  primaryDark: '#0783bb',
  background: '#f5f8fa',
  surface: '#ffffff',
  text: '#293b4b',
  title: '#17303f',
  muted: '#8292a1',
  border: '#d8e1e8',
  green: '#218b63',
  greenDark: '#32785c',
  greenSoft: '#eff5f2',
  shadow: 'rgba(41, 59, 75, 0.08)',
};

export const niveisUrgencia = {
  baixa: {
    id: 'baixa',
    label: 'Menos urgência',
    color: '#218b63',
    soft: '#eff5f2',
    border: '#bcdccd',
  },
  media: {
    id: 'media',
    label: 'Urgência Média',
    color: '#b07d00',
    soft: '#fff6e0',
    border: '#f0d999',
  },
  extrema: {
    id: 'extrema',
    label: 'Urgência extrema',
    color: '#d64545',
    soft: '#fdecec',
    border: '#f2bebe',
  },
};

// Ordem de prioridade de despacho: mais urgente primeiro.
export const ORDEM_URGENCIA = ['extrema', 'media', 'baixa'];

export const statusCores = {
  Aberto: { color: '#0b6fa4', soft: '#e3f4fc', border: '#b9dff0' },
  'Em andamento': { color: '#b07d00', soft: '#fff6e0', border: '#f0d999' },
  Concluído: { color: '#32785c', soft: '#eff5f2', border: '#bcdccd' },
  'Não resolvido': { color: '#b3403d', soft: '#fdeeed', border: '#f2c9c8' },
  Cancelado: { color: '#66798a', soft: '#f0f3f6', border: '#d5dee5' },
};

export const STATUS = {
  ABERTO: 'Aberto',
  ANDAMENTO: 'Em andamento',
  CONCLUIDO: 'Concluído',
  NAO_RESOLVIDO: 'Não resolvido',
  CANCELADO: 'Cancelado',
};

// Prazo máximo (SLA) da abertura ao encerramento, por urgência.
// PREMISSA do protótipo: valores de referência, ajuste conforme o contrato real da OTIS.
export const SLA_HORAS = { extrema: 4, media: 24, baixa: 72 };

// A partir de que fração do prazo o chamado entra em "atenção".
export const SLA_ATENCAO = 0.75;

// Equipamento reincidente: pelo menos `minimo` ocorrências de falha (qualquer tipo,
// exceto solicitação de cliente) nos últimos `dias` dias.
export const REINCIDENCIA = { dias: 30, minimo: 3 };

export const alertaCores = {
  estourado: { color: '#d64545', soft: '#fdecec', border: '#f2bebe' },
  atencao: { color: '#b07d00', soft: '#fff6e0', border: '#f0d999' },
  reincidente: { color: '#7a4fb5', soft: '#f3eefb', border: '#dccff0' },
};

// Classificação das ocorrências exigida no desafio. A urgência sugerida é só
// o padrão do formulário: quem registra pode ajustar.
export const tiposOcorrencia = {
  passageiros_presos: { id: 'passageiros_presos', label: 'Passageiros presos', urgenciaSugerida: 'extrema' },
  falha_tecnica: { id: 'falha_tecnica', label: 'Falha técnica', urgenciaSugerida: 'media' },
  energia: { id: 'energia', label: 'Interrupção de energia', urgenciaSugerida: 'media' },
  solicitacao: { id: 'solicitacao', label: 'Solicitação de cliente', urgenciaSugerida: 'baixa' },
};

export const ORDEM_TIPOS = ['passageiros_presos', 'falha_tecnica', 'energia', 'solicitacao'];

export const tagTipo = { color: '#4a5f72', soft: '#eef2f5', border: '#d5dee5' };
