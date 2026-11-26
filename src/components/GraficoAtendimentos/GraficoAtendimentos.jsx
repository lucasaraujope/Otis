import { useEffect, useMemo, useRef, useState } from 'react';
import {
  GraficoCard,
  GraficoTopo,
  Cabecalho,
  Titulo,
  Subtitulo,
  BlocoTotal,
  TotalRotulo,
  TotalValor,
  AreaGrafico,
  TooltipFlutuante,
  TabelaSrOnly,
} from './styles.js';

const formatarNumero = new Intl.NumberFormat('pt-BR');

function passoBonito(valorBruto) {
  if (!Number.isFinite(valorBruto) || valorBruto <= 0) return 1;
  const potencia = 10 ** Math.floor(Math.log10(valorBruto));
  const fracao = valorBruto / potencia;
  const multiplicador = fracao <= 1 ? 1 : fracao <= 2 ? 2 : fracao <= 5 ? 5 : 10;
  return multiplicador * potencia;
}

function caminhoBarra(x, y, largura, altura, raio) {
  const r = Math.max(0, Math.min(raio, largura / 2, altura));
  const base = y + altura;
  return [
    `M ${x} ${base}`,
    `L ${x} ${y + r}`,
    `Q ${x} ${y} ${x + r} ${y}`,
    `L ${x + largura - r} ${y}`,
    `Q ${x + largura} ${y} ${x + largura} ${y + r}`,
    `L ${x + largura} ${base}`,
    'Z',
  ].join(' ');
}

export default function GraficoAtendimentos({ dados = [], ano }) {
  const areaRef = useRef(null);
  const [largura, setLargura] = useState(0);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const elemento = areaRef.current;
    if (!elemento) return undefined;

    const medir = () => setLargura(Math.max(Math.round(elemento.clientWidth), 280));
    medir();

    if ('ResizeObserver' in window) {
      const observador = new ResizeObserver((entradas) => {
        const nova = Math.round(entradas[0].contentRect.width);
        setLargura((atual) =>
          Math.abs(nova - atual) < 2 ? atual : Math.max(nova, 280)
        );
      });
      observador.observe(elemento);
      return () => observador.disconnect();
    }

    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, []);

  const total = useMemo(
    () => dados.reduce((soma, item) => soma + item.valor, 0),
    [dados]
  );
  const media = dados.length ? Math.round(total / dados.length) : 0;

  const compacto = largura < 520;
  const altura = compacto ? 250 : 330;
  const margem = {
    topo: 18,
    direita: compacto ? 6 : 12,
    base: 30,
    esquerda: compacto ? 34 : 44,
  };
  const plotLargura = Math.max(largura - margem.esquerda - margem.direita, 40);
  const plotAltura = altura - margem.topo - margem.base;
  const baseY = margem.topo + plotAltura;

  const maior = Math.max(1, ...dados.map((item) => item.valor));
  const passo = passoBonito(maior / 4);
  const topo = Math.ceil(maior / passo) * passo;
  const quantidadePassos = Math.round(topo / passo);
  const linhas = Array.from({ length: quantidadePassos + 1 }, (_, indice) => {
    const valor = indice * passo;
    return { valor, y: baseY - (valor / topo) * plotAltura };
  });

  const banda = plotLargura / Math.max(dados.length, 1);
  const larguraBarra = Math.min(banda * 0.58, 38);
  const raio = Math.min(6, larguraBarra / 2);
  const mostrarTodosRotulos = banda >= 34;

  const posicaoTooltip = tooltip
    ? Math.min(Math.max(tooltip.x, 70), Math.max(largura - 70, 70))
    : 0;

  return (
    <GraficoCard aria-labelledby="titulo-grafico">
      <GraficoTopo>
        <Cabecalho>
          <Titulo id="titulo-grafico">Atendimentos encerrados em {ano}</Titulo>
          <Subtitulo>
            {dados.length} {dados.length === 1 ? 'mês' : 'meses'} · média de {formatarNumero.format(media)} por mês
          </Subtitulo>
        </Cabecalho>

        <BlocoTotal>
          <TotalRotulo>Total no ano</TotalRotulo>
          <TotalValor>{formatarNumero.format(total)}</TotalValor>
        </BlocoTotal>
      </GraficoTopo>

      <AreaGrafico ref={areaRef}>
        {largura > 0 && (
          <svg
            viewBox={`0 0 ${largura} ${altura}`}
            width="100%"
            height={altura}
            role="img"
            aria-label={`Atendimentos por mês: ${formatarNumero.format(total)} no ano.`}
          >
            <defs>
              <linearGradient id="gradiente-atendimentos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3dc2f2" />
                <stop offset="100%" stopColor="#0a8ecb" />
              </linearGradient>
            </defs>

            {linhas.map((linha) => (
              <g key={linha.valor}>
                <line
                  className={linha.valor === 0 ? 'eixo-base' : 'eixo-linha'}
                  x1={margem.esquerda}
                  x2={margem.esquerda + plotLargura}
                  y1={linha.y}
                  y2={linha.y}
                />
                <text
                  className="eixo-texto"
                  x={margem.esquerda - 9}
                  y={linha.y + 4}
                  textAnchor="end"
                >
                  {formatarNumero.format(linha.valor)}
                </text>
              </g>
            ))}

            {dados.map(({ mes, valor }, indice) => {
              const centro = margem.esquerda + banda * indice + banda / 2;
              const alturaBarra =
                valor > 0 ? Math.max((valor / topo) * plotAltura, 2) : 0;
              const x = centro - larguraBarra / 2;
              const y = baseY - alturaBarra;

              return (
                <g
                  key={mes}
                  className="barra-grupo"
                  style={{ '--atraso': `${indice * 45}ms` }}
                  onPointerEnter={() => setTooltip({ x: centro, y, mes, valor })}
                  onPointerLeave={() => setTooltip(null)}
                  onPointerCancel={() => setTooltip(null)}
                >
                  <rect
                    className="barra-area"
                    x={centro - banda / 2}
                    y={margem.topo}
                    width={banda}
                    height={plotAltura}
                  />
                  <path
                    className="barra"
                    d={caminhoBarra(x, y, larguraBarra, alturaBarra, raio)}
                  />
                  <title>{`${mes}: ${formatarNumero.format(valor)} atendimentos`}</title>
                </g>
              );
            })}

            {dados.map(({ mes }, indice) => {
              if (!mostrarTodosRotulos && indice % 2 !== 0) return null;

              const centro = margem.esquerda + banda * indice + banda / 2;

              return (
                <text
                  key={`rotulo-${mes}`}
                  className="eixo-texto"
                  x={centro}
                  y={baseY + 20}
                  textAnchor="middle"
                >
                  {mes.slice(0, 3)}
                </text>
              );
            })}
          </svg>
        )}

        {tooltip && (
          <TooltipFlutuante
            $abaixo={tooltip.y < 56}
            style={{ left: `${posicaoTooltip}px`, top: `${tooltip.y}px` }}
          >
            <strong>{formatarNumero.format(tooltip.valor)}</strong>
            <span>{tooltip.mes}</span>
          </TooltipFlutuante>
        )}
      </AreaGrafico>

      <TabelaSrOnly>
        <table>
          <caption>Atendimentos realizados por mês</caption>
          <thead>
            <tr>
              <th scope="col">Mês</th>
              <th scope="col">Atendimentos</th>
            </tr>
          </thead>
          <tbody>
            {dados.map(({ mes, valor }) => (
              <tr key={mes}>
                <th scope="row">{mes}</th>
                <td>{formatarNumero.format(valor)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Total</th>
              <td>{formatarNumero.format(total)}</td>
            </tr>
          </tfoot>
        </table>
      </TabelaSrOnly>
    </GraficoCard>
  );
}
