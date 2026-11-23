import styled from 'styled-components';
import { colors } from '../../theme/colors.js';

export const Pagina = styled.main`
  padding: 0 0 48px;
`;

export const PageHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin: 0 0 22px;
`;

export const PageTitle = styled.h1`
  margin: 0;
  color: ${colors.title};
  font-size: clamp(26px, 4vw, 34px);
  font-weight: 700;
  letter-spacing: -0.5px;
`;

export const PageSub = styled.span`
  color: ${colors.muted};
  font-size: 13px;
`;
