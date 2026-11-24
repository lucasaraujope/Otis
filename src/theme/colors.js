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

export const ORDEM_URGENCIA = ['baixa', 'media', 'extrema'];

export const statusCores = {
  Aberto: { color: '#0b6fa4', soft: '#e3f4fc', border: '#b9dff0' },
  'Em andamento': { color: '#b07d00', soft: '#fff6e0', border: '#f0d999' },
  Concluído: { color: '#32785c', soft: '#eff5f2', border: '#bcdccd' },
  Finalizado: { color: '#b3403d', soft: '#fdeeed', border: '#f2c9c8' },
};
