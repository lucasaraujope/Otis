/* ------------------------------------------------------------------ */
/* Chamados: abrir / recolher                                          */
/* ------------------------------------------------------------------ */
const botoesDeAbrir = document.querySelectorAll('.seta');
const botoesDeRecolher = document.querySelectorAll('.recolher');

function abrirOuFechar(botao) {
  const card = botao.closest('.card');
  const detalhes = card.querySelector('.detalhes');
  const estaAberto = botao.getAttribute('aria-expanded') === 'true';

  botao.setAttribute('aria-expanded', String(!estaAberto));
  botao.setAttribute('aria-label', estaAberto ? 'Expandir chamado' : 'Recolher chamado');
  detalhes.hidden = estaAberto;
  card.classList.toggle('aberto', !estaAberto);
}

botoesDeAbrir.forEach((botao) => {
  botao.addEventListener('click', () => abrirOuFechar(botao));
});

botoesDeRecolher.forEach((botao) => {
  botao.addEventListener('click', () => {
    const card = botao.closest('.card');
    abrirOuFechar(card.querySelector('.seta'));
  });
});

/* ------------------------------------------------------------------ */
/* Gráfico de atendimentos do ano                                      */
/* ------------------------------------------------------------------ */

/*
 * Dados do gráfico: de janeiro a dezembro.
 * Substitua os valores de exemplo pelos números reais de cada mês.
 */
const ATENDIMENTOS_POR_MES = [
  { mes: 'Janeiro', valor: 38 },
  { mes: 'Fevereiro', valor: 44 },
  { mes: 'Março', valor: 41 },
  { mes: 'Abril', valor: 52 },
  { mes: 'Maio', valor: 57 },
  { mes: 'Junho', valor: 49 },
  { mes: 'Julho', valor: 63 },
  { mes: 'Agosto', valor: 55 },
  { mes: 'Setembro', valor: 68 },
  { mes: 'Outubro', valor: 61 },
  { mes: 'Novembro', valor: 54 },
  { mes: 'Dezembro', valor: 47 },
];

const SVG_NS = 'http://www.w3.org/2000/svg';
const formatarNumero = new Intl.NumberFormat('pt-BR');

const areaGrafico = document.getElementById('grafico-svg');
const tooltipGrafico = document.getElementById('grafico-tooltip');
const resumoGrafico = document.getElementById('resumo-grafico');
const totalGrafico = document.getElementById('total-grafico');
const tabelaGrafico = document.getElementById('grafico-tabela');

let larguraGrafico = 0;

function criarElemento(tag, atributos = {}, texto) {
  const elemento = document.createElementNS(SVG_NS, tag);
  Object.entries(atributos).forEach(([nome, valor]) => elemento.setAttribute(nome, String(valor)));
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

/* Arredonda o intervalo do eixo Y para um valor "redondo" (1, 2, 5, 10...). */
function passoBonito(valorBruto) {
  if (!Number.isFinite(valorBruto) || valorBruto <= 0) return 1;
  const potencia = Math.pow(10, Math.floor(Math.log10(valorBruto)));
  const fracao = valorBruto / potencia;
  const multiplicador = fracao <= 1 ? 1 : fracao <= 2 ? 2 : fracao <= 5 ? 5 : 10;
  return multiplicador * potencia;
}

/* Barra com apenas os cantos de cima arredondados. */
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

function mostrarTooltip(x, y, mes, valor) {
  if (!tooltipGrafico) return;

  tooltipGrafico.innerHTML = `<strong>${formatarNumero.format(valor)}</strong><span>${mes}</span>`;
  tooltipGrafico.classList.add('ativo');

  const limite = tooltipGrafico.offsetWidth / 2 + 4;
  const posicaoX = Math.min(Math.max(x, limite), Math.max(larguraGrafico - limite, limite));
  const embaixo = y < 56;

  tooltipGrafico.classList.toggle('abaixo', embaixo);
  tooltipGrafico.style.left = `${posicaoX}px`;
  tooltipGrafico.style.top = `${y}px`;
}

function esconderTooltip() {
  if (tooltipGrafico) tooltipGrafico.classList.remove('ativo');
}

function desenharGrafico({ animar = false } = {}) {
  if (!areaGrafico) return;

  const largura = Math.max(Math.round(areaGrafico.clientWidth), 280);
  larguraGrafico = largura;

  const compacto = largura < 520;
  const altura = compacto ? 250 : 330;
  const margem = {
    topo: 18,
    direita: compacto ? 6 : 12,
    base: 30,
    esquerda: compacto ? 34 : 44,
  };
  const plotLargura = largura - margem.esquerda - margem.direita;
  const plotAltura = altura - margem.topo - margem.base;
  const baseY = margem.topo + plotAltura;

  const valores = ATENDIMENTOS_POR_MES.map((item) => item.valor);
  const total = valores.reduce((soma, valor) => soma + valor, 0);
  const maior = Math.max(1, ...valores);
  const passo = passoBonito(maior / 4);
  const topo = Math.ceil(maior / passo) * passo;

  const svg = criarElemento('svg', {
    viewBox: `0 0 ${largura} ${altura}`,
    width: '100%',
    height: altura,
    role: 'img',
    'aria-label': `Atendimentos por mês: ${formatarNumero.format(total)} no ano.`,
  });

  const defs = criarElemento('defs');
  const gradiente = criarElemento('linearGradient', {
    id: 'gradiente-atendimentos',
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 1,
  });
  gradiente.appendChild(criarElemento('stop', { offset: '0%', 'stop-color': '#3dc2f2' }));
  gradiente.appendChild(criarElemento('stop', { offset: '100%', 'stop-color': '#0a8ecb' }));
  defs.appendChild(gradiente);
  svg.appendChild(defs);

  /* Linhas de grade + valores do eixo Y */
  for (let valor = 0; valor <= topo + 0.001; valor += passo) {
    const y = baseY - (valor / topo) * plotAltura;

    svg.appendChild(
      criarElemento('line', {
        class: valor === 0 ? 'eixo-base' : 'eixo-linha',
        x1: margem.esquerda,
        x2: margem.esquerda + plotLargura,
        y1: y,
        y2: y,
      })
    );

    svg.appendChild(
      criarElemento(
        'text',
        {
          class: 'eixo-texto',
          x: margem.esquerda - 9,
          y: y + 4,
          'text-anchor': 'end',
        },
        formatarNumero.format(valor)
      )
    );
  }

  /* Barras */
  const banda = plotLargura / ATENDIMENTOS_POR_MES.length;
  const larguraBarra = Math.min(banda * 0.58, 38);
  const raio = Math.min(6, larguraBarra / 2);

  ATENDIMENTOS_POR_MES.forEach(({ mes, valor }, indice) => {
    const centro = margem.esquerda + banda * indice + banda / 2;
    const alturaBarra = valor > 0 ? Math.max((valor / topo) * plotAltura, 2) : 0;
    const x = centro - larguraBarra / 2;
    const y = baseY - alturaBarra;

    const grupo = criarElemento('g', {
      class: 'barra-grupo',
      style: `--atraso:${indice * 45}ms`,
    });

    grupo.appendChild(
      criarElemento('rect', {
        class: 'barra-area',
        x: centro - banda / 2,
        y: margem.topo,
        width: banda,
        height: plotAltura,
      })
    );
    grupo.appendChild(
      criarElemento('path', {
        class: 'barra',
        d: caminhoBarra(x, y, larguraBarra, alturaBarra, raio),
      })
    );
    grupo.appendChild(
      criarElemento('title', {}, `${mes}: ${formatarNumero.format(valor)} atendimentos`)
    );

    grupo.addEventListener('pointerenter', () => mostrarTooltip(centro, y, mes, valor));
    grupo.addEventListener('pointerleave', esconderTooltip);
    grupo.addEventListener('pointercancel', esconderTooltip);

    svg.appendChild(grupo);
  });

  /* Rótulos do eixo X (em telas estreitas mostra mês sim, mês não) */
  const mostrarTodosRotulos = banda >= 34;

  ATENDIMENTOS_POR_MES.forEach(({ mes }, indice) => {
    if (!mostrarTodosRotulos && indice % 2 !== 0) return;

    const centro = margem.esquerda + banda * indice + banda / 2;
    svg.appendChild(
      criarElemento(
        'text',
        {
          class: 'eixo-texto',
          x: centro,
          y: baseY + 20,
          'text-anchor': 'middle',
        },
        mes.slice(0, 3)
      )
    );
  });

  if (animar) {
    areaGrafico.classList.remove('sem-animacao');
  } else {
    areaGrafico.classList.add('sem-animacao');
  }

  areaGrafico.replaceChildren(svg);

  if (totalGrafico) totalGrafico.textContent = formatarNumero.format(total);
  if (resumoGrafico) {
    const media = Math.round(total / ATENDIMENTOS_POR_MES.length);
    resumoGrafico.textContent = `${ATENDIMENTOS_POR_MES.length} meses · média de ${formatarNumero.format(media)} por mês`;
  }
}

/* Tabela escondida visualmente para leitores de tela. */
function montarTabelaGrafico() {
  if (!tabelaGrafico) return;

  const total = ATENDIMENTOS_POR_MES.reduce((soma, item) => soma + item.valor, 0);
  const linhas = ATENDIMENTOS_POR_MES.map(
    ({ mes, valor }) =>
      `<tr><th scope="row">${mes}</th><td>${formatarNumero.format(valor)}</td></tr>`
  ).join('');

  tabelaGrafico.innerHTML = `
    <table>
      <caption>Atendimentos realizados por mês</caption>
      <thead><tr><th scope="col">Mês</th><th scope="col">Atendimentos</th></tr></thead>
      <tbody>${linhas}</tbody>
      <tfoot><tr><th scope="row">Total</th><td>${formatarNumero.format(total)}</td></tr></tfoot>
    </table>`;
}

if (areaGrafico) {
  montarTabelaGrafico();
  desenharGrafico({ animar: true });

  if ('ResizeObserver' in window) {
    let ultimaLargura = Math.round(areaGrafico.clientWidth);

    const observador = new ResizeObserver((entradas) => {
      const largura = Math.round(entradas[0].contentRect.width);
      if (Math.abs(largura - ultimaLargura) < 2) return;

      ultimaLargura = largura;
      desenharGrafico({ animar: false });
    });

    observador.observe(areaGrafico);
  } else {
    window.addEventListener('resize', () => desenharGrafico({ animar: false }));
  }
}
