import styled from 'styled-components';
import { colors } from '../../theme/colors.js';

export const Pagina = styled.main`
  padding: 0 0 48px;
`;

export const PageHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 16px;
  margin: 0 0 22px;
`;

export const PageTitle = styled.h1`
  margin: 0;
  color: ${colors.title};
  font-size: clamp(26px, 4vw, 34px);
  font-weight: 700;
  letter-spacing: -0.5px;
`;

export const PageSub = styled.p`
  margin: 6px 0 0;
  color: ${colors.muted};
  font-size: 13px;
`;

export const Filtros = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: -8px 0 24px;
`;

export const Busca = styled.div`
  max-width: 520px;
`;
