import { Link } from 'react-router-dom';
import { niveisUrgencia } from '../../theme/colors.js';
import { posicaoPorId } from '../../utils/ocorrencias.js';
import {
  MapaWrapper,
  MapaTopo,
  MapaTitulo,
  MapaSub,
  Legenda,
  LegendaItem,
  LegendaDot,
  MapaCanvas,
  Rua,
  Parque,
  Rio,
  PinWrapper,
  PinButton,
  PinInner,
  PinTooltip,
} from './styles.js';

export default function Mapa({ chamados = [] }) {
  const contagem = chamados.reduce((acc, chamado) => {
    acc[chamado.urgencia] = (acc[chamado.urgencia] || 0) + 1;
    return acc;
  }, {});

  return (
    <MapaWrapper aria-labelledby="mapa-titulo">
      <MapaTopo>
        <div>
          <MapaTitulo id="mapa-titulo">Mapa de chamados</MapaTitulo>
          <MapaSub>Locais dos chamados em andamento</MapaSub>
        </div>

        <Legenda aria-label="Legenda de urgência">
          {Object.values(niveisUrgencia).map((nivel) => (
            <LegendaItem key={nivel.id}>
              <LegendaDot $color={nivel.color} aria-hidden="true" />
              {nivel.label} ({contagem[nivel.id] || 0})
            </LegendaItem>
          ))}
        </Legenda>
      </MapaTopo>

      <MapaCanvas
        role="group"
        aria-label={`Mapa simulado com ${chamados.length} chamados em andamento`}
      >
        <Rio
          style={{
            top: '60%',
            left: '-5%',
            width: '110%',
            height: '34px',
            transform: 'rotate(-7deg)',
          }}
        />
        <Parque style={{ top: '8%', left: '8%', width: '120px', height: '88px' }} />
        <Parque style={{ top: '66%', left: '70%', width: '150px', height: '110px' }} />

        <Rua style={{ top: '18%', left: 0, width: '100%', height: '14px' }} />
        <Rua style={{ top: '48%', left: 0, width: '100%', height: '12px' }} />
        <Rua style={{ top: '82%', left: 0, width: '100%', height: '10px' }} />
        <Rua style={{ top: 0, left: '22%', width: '12px', height: '100%' }} />
        <Rua style={{ top: 0, left: '52%', width: '16px', height: '100%' }} />
        <Rua style={{ top: 0, left: '78%', width: '10px', height: '100%' }} />
        <Rua
          style={{
            top: '36%',
            left: '10%',
            width: '58%',
            height: '10px',
            transform: 'rotate(18deg)',
          }}
        />

        {chamados.map((chamado) => {
          const nivel = niveisUrgencia[chamado.urgencia] || niveisUrgencia.baixa;
          const posicao = chamado.posicao || posicaoPorId(chamado.id);

          return (
            <PinWrapper
              key={chamado.id}
              style={{ top: `${posicao.top}%`, left: `${posicao.left}%` }}
            >
              <PinButton
                as={Link}
                to={`/ocorrencias/${chamado.id}`}
                $color={nivel.color}
                $pulse={chamado.urgencia === 'extrema'}
                aria-label={`${nivel.label}: ${chamado.titulo}. Abrir chamado ${chamado.id}`}
                aria-describedby={`tooltip-${chamado.id}`}
              >
                <PinInner aria-hidden="true" />
              </PinButton>

              <PinTooltip id={`tooltip-${chamado.id}`} role="tooltip">
                <strong>{nivel.label}</strong>
                <span>{chamado.titulo}</span>
              </PinTooltip>
            </PinWrapper>
          );
        })}
      </MapaCanvas>
    </MapaWrapper>
  );
}
