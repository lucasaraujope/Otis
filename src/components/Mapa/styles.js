import styled, { css, keyframes } from 'styled-components';
import { colors } from '../../theme/colors.js';

export const MapaWrapper = styled.section`
  width: 100%;
  max-width: 920px;
  margin: 40px auto 36px;
`;

export const MapaTopo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

export const MapaTitulo = styled.h2`
  margin: 0;
  font-size: 16px;
  color: ${colors.title};
`;

export const MapaSub = styled.p`
  margin: 3px 0 0;
  font-size: 12px;
  color: ${colors.muted};
`;

export const Legenda = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
`;

export const LegendaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  color: ${colors.muted};
`;

export const LegendaDot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

export const MapaCanvas = styled.div`
  position: relative;
  height: 360px;
  overflow: hidden;
  border: 1px solid ${colors.border};
  border-radius: 18px;
  box-shadow: 0 14px 34px ${colors.shadow};
  background-color: #e8f0ec;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px),
    linear-gradient(180deg, #eef5f1 0%, #dfeae5 100%);
  background-size: 64px 64px, 64px 64px, 100% 100%;

  @media (max-width: 640px) {
    height: 300px;
  }
`;

export const Rua = styled.div`
  position: absolute;
  border-radius: 2px;
  background: #fbfdfc;
  box-shadow: 0 0 0 1px rgba(205, 219, 214, 0.8);
  opacity: 0.9;
`;

export const Parque = styled.div`
  position: absolute;
  border-radius: 14px;
  background: #cfe6cf;
  opacity: 0.8;
`;

export const Rio = styled.div`
  position: absolute;
  border-radius: 40px;
  background: linear-gradient(90deg, #b8e2f5, #9fd6ef);
  opacity: 0.75;
`;

export const PinTooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  z-index: 7;
  width: max-content;
  max-width: 210px;
  padding: 8px 10px;
  border-radius: 10px;
  background: ${colors.title};
  color: #ffffff;
  font-size: 11px;
  line-height: 1.35;
  text-align: center;
  box-shadow: 0 10px 24px rgba(23, 48, 63, 0.25);
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, 4px);
  transition: opacity 0.15s ease, transform 0.15s ease;
  pointer-events: none;

  strong {
    display: block;
    margin-bottom: 2px;
    font-size: 11px;
  }

  span {
    color: #c5d5df;
  }
`;

export const PinWrapper = styled.div`
  position: absolute;
  z-index: 2;
  transform: translate(-50%, -100%);

  &:hover,
  &:focus-within {
    z-index: 6;
  }

  &:hover ${PinTooltip},
  &:focus-within ${PinTooltip} {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
  }
`;

const pulso = keyframes`
  0% { transform: scale(0.85); opacity: 0.65; }
  100% { transform: scale(1.7); opacity: 0; }
`;

export const PinButton = styled.button`
  position: relative;
  display: block;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 2px solid #ffffff;
  border-radius: 50% 50% 50% 0;
  background: ${({ $color }) => $color};
  box-shadow: 0 6px 12px rgba(23, 48, 63, 0.3);
  transform: rotate(-45deg);
  cursor: pointer;
  transition: box-shadow 0.18s ease;

  &::before {
    content: '';
    position: absolute;
    inset: -6px;
    border: 2px solid ${({ $color }) => $color};
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
  }

  ${({ $pulse }) =>
    $pulse &&
    css`
      &::before {
        animation: ${pulso} 1.8s ease-out infinite;
      }
    `}

  &:hover {
    box-shadow: 0 8px 16px rgba(23, 48, 63, 0.42);
  }
`;

export const PinInner = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #ffffff;
  transform: translate(-50%, -50%);
`;
