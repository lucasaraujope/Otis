import styled from 'styled-components';
import { colors } from '../../theme/colors.js';

export const Aviso = styled.div`
  span {
    display: block;
    margin-bottom: 18px;
    padding: 11px 14px;
    border: 1px solid #bcdccd;
    border-radius: 10px;
    background: ${colors.greenSoft};
    color: ${colors.greenDark};
    font-size: 13px;
    font-weight: 700;
  }
`;

export const Colunas = styled.div`
  display: grid;
  grid-template-columns: ${({ $duas }) => ($duas ? 'minmax(0, 1.3fr) minmax(0, 1fr)' : 'minmax(0, 1fr)')};
  gap: 20px;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 6px;
`;

export const Dados = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid #e8eef3;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
`;

export const Rotulo = styled.span`
  color: ${colors.muted};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const Valor = styled.strong`
  color: ${colors.text};
  font-size: 13px;
  font-weight: 600;
  overflow-wrap: anywhere;
`;

export const Texto = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 0;
  border-bottom: 1px solid #e8eef3;

  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }

  p {
    margin: 0 0 6px;
    color: #586d80;
    font-size: 13px;
    line-height: 1.5;
  }
`;

export const Linha = styled.ol`
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
`;

export const Evento = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 0 14px 20px;
  border-left: 2px solid #e2eaf0;
  margin-left: 4px;

  &:last-child {
    padding-bottom: 0;
    border-left-color: transparent;
  }

  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: -6px;
    width: 10px;
    height: 10px;
    border: 2px solid ${colors.surface};
    border-radius: 50%;
    background: ${colors.primary};
  }

  strong {
    color: ${colors.title};
    font-size: 13px;
  }

  span {
    color: ${colors.muted};
    font-size: 12px;
  }
`;

export const Secao = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px 0;
  border-top: 1px solid #e8eef3;

  &:last-child {
    padding-bottom: 0;
  }
`;

export const Acoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
`;

export const Selos = styled.div`
  &:not(:empty) {
    margin: -10px 0 18px;
  }
`;

export const ListaSimples = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: #586d80;
  font-size: 13px;
  line-height: 1.7;

  a {
    color: ${colors.primary};
    font-weight: 700;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
