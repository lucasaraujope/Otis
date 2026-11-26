import styled, { css, keyframes } from 'styled-components';
import { colors } from '../../theme/colors.js';

const abrirDetalhes = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Card = styled.article`
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-left: 4px solid #c0504d;
  border-radius: 5px 16px 16px 5px;
  box-shadow: 0 10px 24px ${colors.shadow};
  overflow: hidden;
  transition: box-shadow 0.2s ease;

  ${({ $aberto }) =>
    $aberto &&
    css`
      box-shadow: 0 16px 32px rgba(41, 59, 75, 0.12);
    `}
`;

export const Chevron = styled.span`
  flex: 0 0 22px;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border: 1px solid #e5ebef;
  border-radius: 50%;
  background: #f5f8fa;
  color: #607485;
  transform: rotate(${({ $aberto }) => ($aberto ? '180deg' : '0deg')});
  transition: transform 0.2s ease, border-color 0.15s ease, color 0.15s ease;
`;

export const CardHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  width: 100%;
  padding: 16px;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;

  &:hover ${Chevron} {
    border-color: #c0504d;
    color: #b3403d;
  }
`;

export const CardHeading = styled.span`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
`;

export const CardTitle = styled.span`
  color: ${colors.title};
  font-size: 14px;
  font-weight: 700;
`;

export const CardSub = styled.span`
  overflow: hidden;
  color: ${colors.muted};
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Detalhes = styled.div`
  padding: 0 16px 18px;
  animation: ${abrirDetalhes} 0.22s ease both;
`;

export const TagsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 4px 0 14px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  padding: 16px 0;
  border-top: 1px solid #e8eef3;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const InfoLabel = styled.span`
  color: ${colors.muted};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const InfoValue = styled.strong`
  color: ${colors.text};
  font-size: 13px;
  font-weight: 600;
  overflow-wrap: anywhere;
`;

export const Acoes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid #e8eef3;
`;

export const DetalhesLink = styled.a`
  color: ${colors.primary};
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    color: ${colors.primaryDark};
    text-decoration: underline;
  }
`;

export const Recolher = styled.button`
  padding: 0;
  border: 0;
  background: transparent;
  color: #66798a;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: ${colors.title};
  }
`;
