// Base inicial de ocorrências (dados fictícios para demonstração).
//
// Todas as telas leem desta única estrutura. Modelo de uma ocorrência:
// {
//   id:           'OC-0001'
//   tipo:         chave de tiposOcorrencia (theme/colors.js)
//   urgencia:     'extrema' | 'media' | 'baixa'
//   status:       'Aberto' | 'Em andamento' | 'Concluído' | 'Não resolvido'
//   titulo:       local + equipamento ("Edifício Aurora - Elevador 1")
//   endereco:     endereço do local
//   descricao:    relato de quem registrou
//   tecnicoId:    id em data/funcionarios.js ou null
//   abertura, atribuicao, inicio, encerramento: data ISO ou null
//   desfecho:     texto do encerramento (null enquanto aberta)
//   prejuizo:     impacto quando não resolvida (null nos demais casos)
//   posicao:      { top, left } em % no mapa simulado
// }

import { STATUS, tiposOcorrencia } from '../theme/colors.js';

const h = (data) => new Date(`${data}:00-03:00`).toISOString();
const mais = (iso, minutos) => new Date(new Date(iso).getTime() + minutos * 60000).toISOString();

// Chamados ainda ativos (aparecem na tela de despacho e no mapa).
const ativos = [
  {
    tipo: 'passageiros_presos',
    urgencia: 'extrema',
    status: STATUS.ANDAMENTO,
    titulo: 'Edifício Paulista Center - Elevador social A',
    endereco: 'Av. Paulista, 1578 - Bela Vista, São Paulo',
    descricao:
      'Elevador parado entre o 7º e o 8º andar com dois passageiros. A área foi isolada preventivamente.',
    tecnicoId: 'f-carlos',
    abertura: h('2026-11-25T10:05'),
    atribuicao: h('2026-11-25T10:09'),
    inicio: h('2026-11-25T10:31'),
    posicao: { top: 32, left: 58 },
  },
  {
    tipo: 'falha_tecnica',
    urgencia: 'extrema',
    status: STATUS.ABERTO,
    titulo: 'Residencial Vergueiro - Elevador 2',
    endereco: 'Rua Vergueiro, 3185 - Vila Mariana, São Paulo',
    descricao:
      'Sensor de porta disparando de forma intermitente; porta reabre durante o movimento.',
    tecnicoId: null,
    abertura: h('2026-11-25T08:40'),
    posicao: { top: 72, left: 51 },
  },
  {
    tipo: 'falha_tecnica',
    urgencia: 'media',
    status: STATUS.ANDAMENTO,
    titulo: 'Edifício Jardins - Elevador 1',
    endereco: 'Rua Oscar Freire, 900 - Jardins, São Paulo',
    descricao: 'Ruído excessivo durante a subida. Manutenção em execução.',
    tecnicoId: 'f-ana',
    abertura: h('2026-11-24T09:40'),
    atribuicao: h('2026-11-24T10:05'),
    inicio: h('2026-11-24T14:10'),
    posicao: { top: 27, left: 73 },
  },
  {
    tipo: 'energia',
    urgencia: 'media',
    status: STATUS.ABERTO,
    titulo: 'Centro Empresarial Pinheiros - Elevador 2',
    endereco: 'Rua dos Pinheiros, 870 - Pinheiros, São Paulo',
    descricao:
      'Queda de energia no prédio. Elevador parado no térreo, sem passageiros. Energia já restabelecida pela concessionária.',
    tecnicoId: 'f-paulo',
    abertura: h('2026-11-25T07:00'),
    atribuicao: h('2026-11-25T07:14'),
    posicao: { top: 55, left: 30 },
  },
  {
    tipo: 'falha_tecnica',
    urgencia: 'media',
    status: STATUS.ABERTO,
    titulo: 'Hospital Vida - Elevador 4',
    endereco: 'Rua da Saúde, 80 - Mogi Guaçu',
    descricao: 'Botão do painel do 5º andar com resposta lenta. Verificação elétrica necessária.',
    tecnicoId: null,
    abertura: h('2026-11-24T17:30'),
    posicao: { top: 62, left: 67 },
  },
  {
    tipo: 'falha_tecnica',
    urgencia: 'baixa',
    status: STATUS.ANDAMENTO,
    titulo: 'Condomínio Vila Nova - Elevador 1',
    endereco: 'Rua Augusta, 1200 - Consolação, São Paulo',
    descricao:
      'Ajuste no fechamento das portas para reduzir o esforço do mecanismo. Sem impacto no uso.',
    tecnicoId: 'f-fernanda',
    abertura: h('2026-11-24T08:00'),
    atribuicao: h('2026-11-24T09:00'),
    inicio: h('2026-11-25T08:30'),
    posicao: { top: 20, left: 26 },
  },
  {
    tipo: 'solicitacao',
    urgencia: 'baixa',
    status: STATUS.ABERTO,
    titulo: 'Edifício Consolação - Elevadores 1 e 2',
    endereco: 'Rua da Consolação, 2423 - Jardim Paulista, São Paulo',
    descricao: 'Cliente solicita limpeza técnica do poço do elevador. Sem risco operacional.',
    tecnicoId: null,
    abertura: h('2026-11-21T18:00'),
    posicao: { top: 68, left: 16 },
  },
];

// Encerramentos recentes descritos à mão (aparecem no topo do histórico e das falhas).
const encerradosRecentes = [
  {
    tipo: 'falha_tecnica', urgencia: 'media', status: STATUS.CONCLUIDO,
    titulo: 'Edifício Haddock - Elevador 1', endereco: 'Rua Haddock Lobo, 595 - Cerqueira César, São Paulo',
    descricao: 'Iluminação da cabine apagada.', tecnicoId: 'f-roberto',
    abertura: h('2026-11-21T11:30'), duracao: 190,
    desfecho: 'Iluminação da cabine substituída e sistema testado. Encerrado após validação do condomínio.',
  },
  {
    tipo: 'falha_tecnica', urgencia: 'baixa', status: STATUS.CONCLUIDO,
    titulo: 'Residencial Ipê - Elevador 2', endereco: 'Rua Teodoro Sampaio, 1020 - Pinheiros, São Paulo',
    descricao: 'Oscilação no nivelamento da cabine.', tecnicoId: 'f-paulo',
    abertura: h('2026-11-20T08:20'), duracao: 420,
    desfecho: 'Revisão dos contatos elétricos concluída. Sistema opera normalmente após os testes.',
  },
  {
    tipo: 'falha_tecnica', urgencia: 'extrema', status: STATUS.CONCLUIDO,
    titulo: 'Edifício Aurora - Elevador 1', endereco: 'Av. Paulista, 900 - Bela Vista, São Paulo',
    descricao: 'Desgaste identificado no cabo de tração durante inspeção.', tecnicoId: 'f-roberto',
    abertura: h('2026-11-18T14:20'), duracao: 230,
    desfecho: 'Substituição do cabo de tração e revisão completa. Testes aprovados pelo condomínio.',
  },
  {
    tipo: 'solicitacao', urgencia: 'baixa', status: STATUS.CONCLUIDO,
    titulo: 'Condomínio Vila Nova - Elevador 2', endereco: 'Rua Augusta, 1200 - Consolação, São Paulo',
    descricao: 'Cliente relata portas fechando com força.', tecnicoId: 'f-fernanda',
    abertura: h('2026-11-16T10:05'), duracao: 1500,
    desfecho: 'Ajuste no mecanismo das portas e lubrificação das guias. Equipamento liberado.',
  },
  {
    tipo: 'falha_tecnica', urgencia: 'media', status: STATUS.CONCLUIDO,
    titulo: 'Torre Central - Elevador 4', endereco: 'Alameda Santos, 981 - Cerqueira César, São Paulo',
    descricao: 'Painel de chamada do 5º andar sem resposta.', tecnicoId: 'f-ana',
    abertura: h('2026-11-14T16:40'), duracao: 600,
    desfecho: 'Correção da falha no painel e substituição do botão danificado.',
  },
  {
    tipo: 'solicitacao', urgencia: 'baixa', status: STATUS.CONCLUIDO,
    titulo: 'Residencial Ipê - Elevador 1', endereco: 'Rua Teodoro Sampaio, 1020 - Pinheiros, São Paulo',
    descricao: 'Manutenção preventiva trimestral solicitada pelo síndico.', tecnicoId: 'f-paulo',
    abertura: h('2026-11-12T08:15'), duracao: 2900,
    desfecho: 'Manutenção preventiva concluída, com revisão elétrica e testes de segurança.',
  },
  {
    tipo: 'falha_tecnica', urgencia: 'extrema', status: STATUS.NAO_RESOLVIDO,
    titulo: 'Edifício Central - Elevador 2', endereco: 'Av. Paulista, 1000 - São Paulo',
    descricao: 'Falha no sistema de freio.', tecnicoId: 'f-carlos',
    abertura: h('2026-11-12T14:30'), duracao: 320,
    desfecho: 'Desfecho sem reparo: peça de reposição indisponível.', prejuizo: 'Peça danificada',
  },
  {
    tipo: 'energia', urgencia: 'media', status: STATUS.NAO_RESOLVIDO,
    titulo: 'Shopping Norte - Elevador 3', endereco: 'Rua das Flores, 250 - Campinas',
    descricao: 'Interrupção de energia no quadro do elevador.', tecnicoId: 'f-ana',
    abertura: h('2026-11-10T09:15'), duracao: 480,
    desfecho: 'Retorno de energia sem sucesso; quadro precisa de substituição.', prejuizo: 'Equipamento parado',
  },
  {
    tipo: 'passageiros_presos', urgencia: 'extrema', status: STATUS.NAO_RESOLVIDO,
    titulo: 'Hospital Vida - Elevador 4', endereco: 'Rua da Saúde, 80 - Mogi Guaçu',
    descricao: 'Passageiros presos na cabine.', tecnicoId: 'f-roberto',
    abertura: h('2026-11-08T18:45'), duracao: 150,
    desfecho: 'Atendimento fora do prazo; resgate feito pelo Corpo de Bombeiros.', prejuizo: 'Atraso no resgate',
  },
  {
    tipo: 'falha_tecnica', urgencia: 'media', status: STATUS.NAO_RESOLVIDO,
    titulo: 'Condomínio Aurora - Elevador 1', endereco: 'Rua do Sol, 45 - Campinas',
    descricao: 'Falha na porta de pavimento.', tecnicoId: 'f-fernanda',
    abertura: h('2026-11-05T07:50'), duracao: 540,
    desfecho: 'Reparo não concluído; aguardando nova visita.', prejuizo: 'Elevador desativado',
  },
].map(({ duracao, ...o }) => ({
  ...o,
  atribuicao: mais(o.abertura, Math.round(duracao * 0.08)),
  inicio: mais(o.abertura, Math.round(duracao * 0.25)),
  encerramento: mais(o.abertura, duracao),
  prejuizo: o.prejuizo || null,
}));

// Histórico do ano gerado de forma determinística (mesma semente = mesmos dados),
// para que o gráfico e os indicadores tenham volume realista.
const ATENDIMENTOS_POR_MES_2026 = [38, 44, 41, 52, 57, 49, 63, 55, 68, 61, 54];

function geradorAleatorio(semente) {
  let a = semente;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LOCAIS = [
  ['Edifício Aurora', 'Av. Paulista, 900 - Bela Vista, São Paulo'],
  ['Torre Central', 'Alameda Santos, 981 - Cerqueira César, São Paulo'],
  ['Residencial Ipê', 'Rua Teodoro Sampaio, 1020 - Pinheiros, São Paulo'],
  ['Condomínio Vila Nova', 'Rua Augusta, 1200 - Consolação, São Paulo'],
  ['Shopping Norte', 'Rua das Flores, 250 - Campinas'],
  ['Hospital Vida', 'Rua da Saúde, 80 - Mogi Guaçu'],
  ['Edifício Jardins', 'Rua Oscar Freire, 900 - Jardins, São Paulo'],
  ['Centro Empresarial Faria Lima', 'Av. Brig. Faria Lima, 3477 - Itaim Bibi, São Paulo'],
  ['Residencial Mooca', 'Rua da Mooca, 2100 - Mooca, São Paulo'],
  ['Edifício Liberdade', 'Rua Galvão Bueno, 410 - Liberdade, São Paulo'],
];

const TEXTOS = {
  passageiros_presos: {
    descricao: 'Passageiros presos na cabine após parada entre andares.',
    sucesso: 'Resgate realizado com segurança e equipamento liberado após testes.',
    falha: ['Resgate concluído, mas o equipamento segue parado para troca de peça.', 'Equipamento interditado'],
  },
  falha_tecnica: {
    descricao: 'Falha técnica reportada pelo cliente: parada, ruído ou falha de porta.',
    sucesso: 'Componente ajustado ou substituído; equipamento testado e liberado.',
    falha: ['Peça de reposição indisponível; reparo reagendado.', 'Peça danificada'],
  },
  energia: {
    descricao: 'Elevador parado após interrupção de energia no edifício.',
    sucesso: 'Sistema religado e calibrado após o retorno da energia.',
    falha: ['Retorno de energia sem sucesso; quadro elétrico danificado.', 'Equipamento parado'],
  },
  solicitacao: {
    descricao: 'Solicitação do cliente: manutenção preventiva, ajuste ou vistoria.',
    sucesso: 'Solicitação atendida e registrada com o cliente.',
    falha: ['Atendimento não concluído no prazo combinado.', 'Atraso no atendimento'],
  },
};

// Equipamentos com falhas repetidas no fim do ano, para demonstrar o alerta de reincidência.
const PROBLEMATICOS = [
  ['Shopping Norte - Elevador 3', 'Rua das Flores, 250 - Campinas'],
  ['Hospital Vida - Elevador 4', 'Rua da Saúde, 80 - Mogi Guaçu'],
];

const PESOS_TIPO = [
  ['falha_tecnica', 0.48],
  ['solicitacao', 0.25],
  ['energia', 0.15],
  ['passageiros_presos', 0.12],
];
const CHANCE_SUCESSO = { passageiros_presos: 0.97, falha_tecnica: 0.84, energia: 0.88, solicitacao: 0.97 };
const DURACAO_MIN = { extrema: [50, 260], media: [180, 1440], baixa: [720, 4320] };
const TECNICOS = ['f-carlos', 'f-ana', 'f-roberto', 'f-fernanda', 'f-paulo'];

function gerarHistorico() {
  const rand = geradorAleatorio(2026);
  const escolher = (lista) => lista[Math.floor(rand() * lista.length)];
  const entre = ([min, max]) => Math.round(min + rand() * (max - min));
  const recentesPorMes = (mes) =>
    encerradosRecentes.filter((o) => new Date(o.encerramento).getMonth() === mes).length;

  const lista = [];
  ATENDIMENTOS_POR_MES_2026.forEach((total, mes) => {
    const quantidade = Math.max(total - recentesPorMes(mes), 0);
    const ultimoDia = mes === 10 ? 18 : new Date(2026, mes + 1, 0).getDate();

    for (let i = 0; i < quantidade; i += 1) {
      let sorteio = rand();
      const problematico = mes >= 9 && rand() < 0.1 ? escolher(PROBLEMATICOS) : null;
      const tipo = problematico
        ? 'falha_tecnica'
        : PESOS_TIPO.find(([, peso]) => (sorteio -= peso) < 0)?.[0] || 'falha_tecnica';
      const urgencia = tiposOcorrencia[tipo].urgenciaSugerida;
      const sucesso = rand() < (problematico ? 0.6 : CHANCE_SUCESSO[tipo]);
      const [local, endereco] = problematico ? [null, problematico[1]] : escolher(LOCAIS);
      const titulo = problematico ? problematico[0] : `${local} - Elevador ${1 + Math.floor(rand() * 4)}`;
      const dia = 1 + Math.floor(rand() * (ultimoDia - 2));
      const abertura = new Date(2026, mes, dia, 6 + Math.floor(rand() * 14), Math.floor(rand() * 60)).toISOString();
      const duracao = entre(DURACAO_MIN[urgencia]) * (sucesso ? 1 : 1.4);
      const textos = TEXTOS[tipo];

      lista.push({
        tipo,
        urgencia,
        status: sucesso ? STATUS.CONCLUIDO : STATUS.NAO_RESOLVIDO,
        titulo,
        endereco,
        descricao: textos.descricao,
        tecnicoId: escolher(TECNICOS),
        abertura,
        atribuicao: mais(abertura, Math.round(duracao * 0.08)),
        inicio: mais(abertura, Math.round(duracao * 0.25)),
        encerramento: mais(abertura, Math.round(duracao)),
        desfecho: sucesso ? textos.sucesso : textos.falha[0],
        prejuizo: sucesso ? null : textos.falha[1],
      });
    }
  });
  return lista;
}

// A base é escrita como se "agora" fosse ANCORA. Ao criá-la, todas as datas são
// deslocadas para que ANCORA coincida com o momento atual: assim SLA, reincidência e
// "aberto há" continuam coerentes em qualquer dia em que a demonstração rodar.
const ANCORA = new Date('2026-11-25T12:00:00-03:00').getTime();
const CAMPOS_DATA = ['abertura', 'atribuicao', 'inicio', 'encerramento'];

function deslocar(o, ms) {
  const copia = { ...o };
  CAMPOS_DATA.forEach((campo) => {
    if (copia[campo]) copia[campo] = new Date(new Date(copia[campo]).getTime() + ms).toISOString();
  });
  return copia;
}

export function criarBaseInicial(agora = Date.now()) {
  const deslocamento = agora - ANCORA;
  const todas = [
    ...gerarHistorico(),
    ...encerradosRecentes,
    ...ativos.map((o) => ({
      atribuicao: null,
      inicio: null,
      encerramento: null,
      desfecho: null,
      prejuizo: null,
      ...o,
    })),
  ].sort((a, b) => a.abertura.localeCompare(b.abertura));

  return todas.map((o, indice) => ({
    id: `OC-${String(indice + 1).padStart(4, '0')}`,
    posicao: null,
    ...deslocar(o, deslocamento),
  }));
}
