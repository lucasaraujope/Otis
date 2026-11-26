import {
  STATUS,
  ORDEM_URGENCIA,
  ORDEM_TIPOS,
  SLA_HORAS,
  SLA_ATENCAO,
  REINCIDENCIA,
} from '../theme/colors.js';
import { funcionarios, buscarFuncionario } from '../data/funcionarios.js';

const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const formatoDataHora = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'America/Sao_Paulo',
});

export const formatarNumero = new Intl.NumberFormat('pt-BR');

export function formatarDataHora(iso) {
  return iso ? formatoDataHora.format(new Date(iso)).replace(',', ' ·') : '—';
}

export function formatarDuracao(ms) {
  if (ms == null || !Number.isFinite(ms)) return '—';
  const minutos = Math.max(Math.round(ms / 60000), 0);
  if (minutos < 60) return `${minutos} min`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `${horas} h ${String(minutos % 60).padStart(2, '0')} min`;
  const dias = Math.floor(horas / 24);
  return `${dias} d ${horas % 24} h`;
}

export const estaAtiva = (o) => o.status === STATUS.ABERTO || o.status === STATUS.ANDAMENTO;
// Encerrada = houve atendimento com desfecho. Canceladas ficam fora das métricas de resultado.
export const estaEncerrada = (o) => o.status === STATUS.CONCLUIDO || o.status === STATUS.NAO_RESOLVIDO;
export const estaCancelada = (o) => o.status === STATUS.CANCELADO;

export function andamento(o) {
  switch (o.status) {
    case STATUS.ABERTO:
      return o.tecnicoId ? 'Técnico designado, aguardando início' : 'Aguardando designação de técnico';
    case STATUS.ANDAMENTO:
      return 'Em atendimento';
    case STATUS.CONCLUIDO:
      return 'Finalizado com sucesso';
    case STATUS.CANCELADO:
      return 'Cancelada';
    default:
      return 'Encerrado sem solução';
  }
}

export function tempoDeAtendimento(o) {
  if (!o.encerramento) return null;
  return new Date(o.encerramento) - new Date(o.abertura);
}

export function tempoEmEspera(o, agora = Date.now()) {
  return agora - new Date(o.abertura);
}

// ---------- SLA ----------

export const prazoSla = (o) => (SLA_HORAS[o.urgencia] ?? SLA_HORAS.baixa) * 3600000;

// Ativas: 'ok' | 'atencao' | 'estourado' conforme o tempo decorrido desde a abertura.
// Encerradas: 'cumprido' | 'estourado' conforme o tempo total de atendimento.
export function situacaoSla(o, agora = Date.now()) {
  const prazo = prazoSla(o);
  if (estaAtiva(o)) {
    const decorrido = agora - new Date(o.abertura);
    const situacao = decorrido >= prazo ? 'estourado' : decorrido >= prazo * SLA_ATENCAO ? 'atencao' : 'ok';
    return { situacao, prazo, restante: prazo - decorrido };
  }
  if (estaEncerrada(o)) {
    const total = tempoDeAtendimento(o);
    return { situacao: total <= prazo ? 'cumprido' : 'estourado', prazo, restante: prazo - total };
  }
  return { situacao: null, prazo, restante: null };
}

// ---------- Reincidência ----------

export const chaveEquipamento = (o) => o.titulo.trim().toLowerCase();

const contaComoFalha = (o) => o.tipo !== 'solicitacao' && !estaCancelada(o);

// Agrupa as falhas recentes por equipamento. Retorna Map chave -> lista de ocorrências.
export function falhasRecentesPorEquipamento(ocorrencias, agora = Date.now()) {
  const corte = agora - REINCIDENCIA.dias * 86400000;
  const grupos = new Map();
  ocorrencias.forEach((o) => {
    if (!contaComoFalha(o) || new Date(o.abertura) < corte) return;
    const chave = chaveEquipamento(o);
    if (!grupos.has(chave)) grupos.set(chave, []);
    grupos.get(chave).push(o);
  });
  return grupos;
}

export function equipamentosReincidentes(ocorrencias, agora = Date.now()) {
  return [...falhasRecentesPorEquipamento(ocorrencias, agora).values()]
    .filter((lista) => lista.length >= REINCIDENCIA.minimo)
    .map((lista) => {
      const ordenada = [...lista].sort((a, b) => b.abertura.localeCompare(a.abertura));
      return {
        titulo: ordenada[0].titulo,
        endereco: ordenada[0].endereco,
        total: lista.length,
        naoResolvidas: lista.filter((o) => o.status === STATUS.NAO_RESOLVIDO).length,
        ativas: lista.filter(estaAtiva).length,
        ultima: ordenada[0],
      };
    })
    .sort((a, b) => b.total - a.total || b.naoResolvidas - a.naoResolvidas);
}

// Quantas falhas recentes o equipamento desta ocorrência teve (0 se não for reincidente).
export function reincidenciaDe(o, grupos) {
  const lista = grupos.get(chaveEquipamento(o)) || [];
  return lista.length >= REINCIDENCIA.minimo ? lista.length : 0;
}

// ---------- Busca ----------

const normalizar = (texto) =>
  String(texto ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

export function correspondeBusca(o, termo) {
  const busca = normalizar(termo).trim();
  if (!busca) return true;
  const alvo = normalizar(
    [o.id, o.titulo, o.endereco, o.descricao, o.desfecho, buscarFuncionario(o.tecnicoId)?.nome].join(' ')
  );
  return busca.split(/\s+/).every((parte) => alvo.includes(parte));
}

// Fila de despacho: urgência mais alta primeiro; no mesmo nível, quem espera há mais tempo.
export function ordenarPorPrioridade(lista) {
  return [...lista].sort(
    (a, b) =>
      ORDEM_URGENCIA.indexOf(a.urgencia) - ORDEM_URGENCIA.indexOf(b.urgencia) ||
      a.abertura.localeCompare(b.abertura)
  );
}

export function maisRecentesPrimeiro(lista) {
  return [...lista].sort((a, b) => (b.encerramento || b.abertura).localeCompare(a.encerramento || a.abertura));
}

// Posição estável no mapa simulado para ocorrências registradas pela tela.
export function posicaoPorId(id) {
  let hash = 0;
  for (const letra of id) hash = (hash * 31 + letra.charCodeAt(0)) >>> 0;
  return { top: 12 + (hash % 76), left: 8 + (Math.floor(hash / 76) % 84) };
}

export function estatisticasTecnico(ocorrencias, tecnicoId) {
  const doTecnico = ocorrencias.filter((o) => o.tecnicoId === tecnicoId);
  const encerradas = doTecnico.filter(estaEncerrada);
  const sucesso = encerradas.filter((o) => o.status === STATUS.CONCLUIDO).length;
  return {
    atendidos: encerradas.length,
    sucesso,
    falhas: encerradas.length - sucesso,
    emAberto: doTecnico.filter(estaAtiva).length,
    taxaSucesso: encerradas.length ? sucesso / encerradas.length : null,
    tempoMedio: media(encerradas.map(tempoDeAtendimento)),
  };
}

// Sugestão de despacho: técnicos com menos chamados ativos primeiro;
// empate resolvido pela maior taxa de sucesso.
export function tecnicosPorDisponibilidade(ocorrencias) {
  return funcionarios
    .map((funcionario) => ({ ...funcionario, ...estatisticasTecnico(ocorrencias, funcionario.id) }))
    .sort((a, b) => a.emAberto - b.emAberto || (b.taxaSucesso ?? 0) - (a.taxaSucesso ?? 0));
}

function media(valores) {
  const validos = valores.filter((v) => v != null);
  return validos.length ? validos.reduce((s, v) => s + v, 0) / validos.length : null;
}

function anoDeReferencia(ocorrencias) {
  const datas = ocorrencias.filter((o) => o.encerramento).map((o) => o.encerramento);
  return datas.length ? new Date(datas.sort().at(-1)).getFullYear() : new Date().getFullYear();
}

// Atendimentos encerrados por mês no ano mais recente com dados (até o último mês com registro).
export function atendimentosPorMes(ocorrencias) {
  const ano = anoDeReferencia(ocorrencias);
  const contagem = Array(12).fill(0);
  let ultimoMes = 0;
  ocorrencias.forEach((o) => {
    if (!o.encerramento) return;
    const data = new Date(o.encerramento);
    if (data.getFullYear() !== ano) return;
    contagem[data.getMonth()] += 1;
    ultimoMes = Math.max(ultimoMes, data.getMonth());
  });
  return { ano, dados: MESES.slice(0, ultimoMes + 1).map((mes, i) => ({ mes, valor: contagem[i] })) };
}

export function indicadores(ocorrencias) {
  const ativas = ocorrencias.filter(estaAtiva);
  const encerradas = ocorrencias.filter(estaEncerrada);
  const sucesso = encerradas.filter((o) => o.status === STATUS.CONCLUIDO);

  const porTipo = ORDEM_TIPOS.map((tipo) => {
    const doTipo = ocorrencias.filter((o) => o.tipo === tipo);
    const encerradasDoTipo = doTipo.filter(estaEncerrada);
    const sucessoDoTipo = encerradasDoTipo.filter((o) => o.status === STATUS.CONCLUIDO).length;
    return {
      tipo,
      total: doTipo.length,
      ativas: doTipo.filter(estaAtiva).length,
      taxaSucesso: encerradasDoTipo.length ? sucessoDoTipo / encerradasDoTipo.length : null,
      tempoMedio: media(encerradasDoTipo.map(tempoDeAtendimento)),
    };
  });

  const porUrgencia = ORDEM_URGENCIA.map((urgencia) => {
    const doNivel = encerradas.filter((o) => o.urgencia === urgencia);
    const dentro = doNivel.filter((o) => situacaoSla(o).situacao === 'cumprido').length;
    return {
      urgencia,
      encerradas: doNivel.length,
      cumprimentoSla: doNivel.length ? dentro / doNivel.length : null,
      tempoMedio: media(doNivel.map(tempoDeAtendimento)),
      ateInicio: media(doNivel.filter((o) => o.inicio).map((o) => new Date(o.inicio) - new Date(o.abertura))),
    };
  });

  const dentroDoSla = encerradas.filter((o) => situacaoSla(o).situacao === 'cumprido').length;

  return {
    total: ocorrencias.length,
    ativas: ativas.length,
    foraDoSla: ativas.filter((o) => situacaoSla(o).situacao === 'estourado').length,
    cumprimentoSla: encerradas.length ? dentroDoSla / encerradas.length : null,
    canceladas: ocorrencias.filter(estaCancelada).length,
    semTecnico: ativas.filter((o) => !o.tecnicoId).length,
    extremasAtivas: ativas.filter((o) => o.urgencia === 'extrema').length,
    encerradas: encerradas.length,
    taxaSucesso: encerradas.length ? sucesso.length / encerradas.length : null,
    tempoMedio: media(encerradas.map(tempoDeAtendimento)),
    porTipo,
    porUrgencia,
  };
}
