import styled from 'styled-components';
import { colors } from '../../theme/colors.js';

export const Pagina = styled.main`
  padding: 32px 0 48px;

  .container {
    max-width: ${({ $larga }) => ($larga ? '1100px' : '760px')};
  }
`;

export const Voltar = styled.a`
  display: inline-block;
  margin-bottom: 14px;
  color: ${colors.primary};
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    color: ${colors.primaryDark};
    text-decoration: underline;
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  color: ${colors.title};
  font-size: clamp(24px, 4vw, 30px);
  font-weight: 700;
  letter-spacing: -0.4px;
`;

export const PageSub = styled.p`
  margin: 6px 0 22px;
  color: ${colors.muted};
  font-size: 13px;
  line-height: 1.5;
`;
