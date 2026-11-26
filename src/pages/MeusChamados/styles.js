import styled from 'styled-components';
import { colors } from '../../theme/colors.js';

export const Pagina = styled.main`
  padding: 32px 0 48px;
`;

export const Colunas = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 20px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Vazio = styled.p`
  margin: 0;
  padding: 18px;
  border: 1px dashed ${colors.border};
  border-radius: 12px;
  color: ${colors.muted};
  font-size: 13px;
  text-align: center;
`;

export const Disponivel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 14px 0;
  border-top: 1px solid #e8eef3;
`;

export const DisponivelTopo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
`;

export const DisponivelTitulo = styled.a`
  color: ${colors.title};
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    color: ${colors.primaryDark};
    text-decoration: underline;
  }
`;

export const DisponivelSub = styled.span`
  display: block;
  margin-top: 3px;
  color: ${colors.muted};
  font-size: 12px;
`;

export const SelosLinha = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
`;
