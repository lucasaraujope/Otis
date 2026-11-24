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
  width: min(100%, 604px);
  margin: 40px auto 21px;
`;

export const PageTitle = styled.h1`
  margin: 0;
  color: ${colors.title};
  font-size: clamp(24px, 4vw, 30px);
  font-weight: 700;
  letter-spacing: -0.4px;
`;

export const PageSub = styled.span`
  color: ${colors.muted};
  font-size: 13px;
`;

export const Lista = styled.section`
  width: min(100%, 604px);
  margin: 0 auto;
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
