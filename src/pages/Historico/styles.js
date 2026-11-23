import styled from 'styled-components';
import { colors } from '../../theme/colors.js';

export const Pagina = styled.main`
  padding: 0 0 48px;
`;

export const Lista = styled.section`
  width: min(100%, 604px);
  margin: 0 auto;
`;

export const ListaTitulo = styled.h2`
  margin: 0 0 21px;
  color: #111111;
  font-size: 16px;

  @media (max-width: 650px) {
    line-height: 1.4;
  }
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
