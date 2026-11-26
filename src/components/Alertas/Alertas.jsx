import styled from 'styled-components';
import { alertaCores, REINCIDENCIA } from '../../theme/colors.js';
import { formatarDuracao } from '../../utils/ocorrencias.js';

const Lista = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Selo = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border: 1px solid ${({ $c }) => $c.border};
  border-radius: 999px;
  background: ${({ $c }) => $c.soft};
  color: ${({ $c }) => $c.color};
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;

  svg {
    width: 11px;
    height: 11px;
  }
`;

const IconeRelogio = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const IconeRepeticao = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 2l4 4-4 4" />
    <path d="M3 11V9a3 3 0 0 1 3-3h15" />
    <path d="M7 22l-4-4 4-4" />
    <path d="M21 13v2a3 3 0 0 1-3 3H3" />
  </svg>
);

// Selos de alerta: texto + ícone (nunca só cor). `sla` vem de situacaoSla().
export default function Alertas({ sla, reincidencia = 0, detalhado = false }) {
  const selos = [];

  if (sla?.situacao === 'estourado') {
    selos.push(
      <Selo key="sla" $c={alertaCores.estourado}>
        <IconeRelogio />
        {detalhado && sla.restante != null
          ? `SLA estourado há ${formatarDuracao(-sla.restante)}`
          : 'SLA estourado'}
      </Selo>
    );
  } else if (sla?.situacao === 'atencao') {
    selos.push(
      <Selo key="sla" $c={alertaCores.atencao}>
        <IconeRelogio />
        {`SLA vence em ${formatarDuracao(sla.restante)}`}
      </Selo>
    );
  }

  if (reincidencia > 0) {
    selos.push(
      <Selo key="reinc" $c={alertaCores.reincidente}>
        <IconeRepeticao />
        {`Reincidente: ${reincidencia} falhas em ${REINCIDENCIA.dias} dias`}
      </Selo>
    );
  }

  return selos.length ? <Lista>{selos}</Lista> : null;
}
