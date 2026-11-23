import styled, { keyframes } from 'styled-components';
import { colors } from '../../theme/colors.js';

const crescerBarra = keyframes`
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
`;

const aparecerTooltip = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const GraficoCard = styled.section`
  width: min(100%, 712px);
  margin: 40px auto 56px;
  padding: 22px 22px 14px;
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  box-shadow: 0 14px 34px ${colors.shadow};

  @media (max-width: 650px) {
    margin: 32px auto 40px;
    padding: 18px 14px 10px;
    border-radius: 12px;
  }
`;

export const GraficoTopo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
`;

export const Cabecalho = styled.div``;

export const Titulo = styled.h1`
  margin: 0 0 6px;
  color: ${colors.title};
  font-size: 18px;
  line-height: 1.3;
  text-wrap: balance;

  @media (max-width: 650px) {
    font-size: 15px;
  }
`;

export const Subtitulo = styled.p`
  margin: 0;
  color: ${colors.muted};
  font-size: 12px;
`;

export const BlocoTotal = styled.p`
  flex: 0 0 auto;
  margin: 0;
  text-align: right;
`;

export const TotalRotulo = styled.span`
  display: block;
  margin-bottom: 2px;
  color: #8292a1;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const TotalValor = styled.strong`
  color: ${colors.primary};
  font-size: 28px;
  line-height: 1;

  @media (max-width: 650px) {
    font-size: 22px;
  }
`;

export const AreaGrafico = styled.figure`
  position: relative;
  margin: 0;

  svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }

  .eixo-texto {
    fill: ${colors.muted};
    font-family: Arial, Helvetica, sans-serif;
    font-size: 11px;
  }

  .eixo-linha {
    stroke: #e8eef3;
    stroke-width: 1;
  }

  .eixo-base {
    stroke: #cfdbe3;
    stroke-width: 1;
  }

  .barra-grupo {
    transform-box: fill-box;
    transform-origin: 50% 100%;
    animation: ${crescerBarra} 0.6s cubic-bezier(0.22, 0.7, 0.3, 1) both;
    animation-delay: var(--atraso, 0ms);
    cursor: pointer;
  }

  .barra {
    fill: url(#gradiente-atendimentos);
    transition: fill 0.15s ease;
  }

  .barra-grupo:hover .barra {
    fill: #0783bb;
  }

  .barra-area {
    fill: transparent;
  }

  @media (prefers-reduced-motion: reduce) {
    .barra-grupo {
      animation: none;
    }
  }
`;

export const TooltipFlutuante = styled.div`
  position: absolute;
  z-index: 3;
  padding: 7px 10px;
  border-radius: 8px;
  background: ${colors.title};
  color: #ffffff;
  font-size: 12px;
  line-height: 1.3;
  white-space: nowrap;
  pointer-events: none;
  transform: translate(-50%, calc(-100% - 10px));
  animation: ${aparecerTooltip} 0.15s ease both;

  ${({ $abaixo }) =>
    $abaixo &&
    `
      transform: translate(-50%, 10px);
    `}

  strong {
    display: block;
    font-size: 15px;
  }

  span {
    color: #b9cbd7;
  }
`;

export const TabelaSrOnly = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;
