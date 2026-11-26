import styled from 'styled-components';
import { colors } from '../../theme/colors.js';

export const Pagina = styled.main`
  padding: 32px 0 48px;

  .container > section + section {
    margin-top: 20px;
  }
`;

export const Kpis = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Kpi = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-top: 3px solid ${({ $alerta }) => ($alerta ? '#d64545' : colors.primary)};
  border-radius: 12px;
  box-shadow: 0 8px 20px ${colors.shadow};
`;

export const KpiRotulo = styled.span`
  color: ${colors.muted};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const KpiValor = styled.strong`
  color: ${colors.title};
  font-size: 28px;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
`;

export const KpiNota = styled.span`
  color: ${colors.muted};
  font-size: 12px;
`;

export const Grade = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Rolagem = styled.div`
  overflow-x: auto;
`;

export const Tabela = styled.table`
  min-width: 420px;
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  font-variant-numeric: tabular-nums;

  th,
  td {
    padding: 10px 8px;
    border-top: 1px solid #e8eef3;
    text-align: left;
    vertical-align: middle;
  }

  thead th {
    border-top: 0;
    color: ${colors.muted};
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  tbody th {
    color: ${colors.title};
    font-weight: 700;
  }

  a {
    color: ${colors.primary};
    font-weight: 700;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  td {
    color: ${colors.text};
  }

  .num {
    text-align: right;
    white-space: nowrap;
  }

  .barra {
    width: 34%;
    min-width: 110px;
  }

  @media (max-width: 560px) {
    font-size: 12px;

    th,
    td {
      padding: 9px 5px;
    }
  }
`;

// Barra horizontal de série única: cor primária, ponta arredondada, valor escrito ao lado.
export const Barra = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    width: var(--largura);
    min-width: 2px;
    height: 10px;
    border-radius: 0 4px 4px 0;
    background: ${colors.primary};
  }

  strong {
    color: ${colors.text};
    font-weight: 700;
  }
`;

export const Rodape = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 24px;
  color: ${colors.muted};
  font-size: 12px;
`;

export const Endereco = styled.span`
  display: block;
  margin-top: 2px;
  color: ${colors.muted};
  font-size: 11px;
  font-weight: 400;
`;
