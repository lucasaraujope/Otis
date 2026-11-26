import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { criarBaseInicial } from '../data/seed.js';
import { STATUS } from '../theme/colors.js';
import { posicaoPorId } from '../utils/ocorrencias.js';

// Base centralizada de ocorrências. Hoje persiste no localStorage do navegador;
// para usar um backend, basta trocar carregar/salvar (e as ações) por chamadas à API
// mantendo a mesma interface exposta por useOcorrencias().
// v2: base inicial com equipamentos reincidentes e campos de edição/cancelamento.
const CHAVE = 'otis:ocorrencias:v2';

function carregar() {
  try {
    window.localStorage.removeItem('otis:ocorrencias:v1');
    const salvo = window.localStorage.getItem(CHAVE);
    if (salvo) {
      const lista = JSON.parse(salvo);
      if (Array.isArray(lista)) return lista;
    }
  } catch {
    // localStorage indisponível ou corrompido: segue com a base inicial.
  }
  return criarBaseInicial();
}

function salvar(lista) {
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(lista));
  } catch {
    // Sem persistência neste navegador (modo privado, cota cheia): a sessão continua funcionando.
  }
}

function proximoId(lista) {
  const maior = lista.reduce((max, o) => Math.max(max, Number(o.id.replace(/\D/g, '')) || 0), 0);
  return `OC-${String(maior + 1).padStart(4, '0')}`;
}

const ativa = (o) => o.status === STATUS.ABERTO || o.status === STATUS.ANDAMENTO;

// Só ocorrências ativas podem ser alteradas: encerradas e canceladas ficam imutáveis.
function atualizar(lista, id, mudar) {
  return lista.map((o) => (o.id === id && ativa(o) ? { ...o, ...mudar(o) } : o));
}

export function reducer(lista, acao) {
  const agora = new Date().toISOString();

  switch (acao.tipo) {
    case 'registrar': {
      // O id vem da ação para a tela poder navegar até a ocorrência criada.
      const id = lista.some((o) => o.id === acao.id) ? proximoId(lista) : acao.id;
      const { tecnicoId, ...dados } = acao.dados;
      return [
        ...lista,
        {
          id,
          ...dados,
          status: STATUS.ABERTO,
          tecnicoId: tecnicoId || null,
          abertura: agora,
          atribuicao: tecnicoId ? agora : null,
          inicio: null,
          encerramento: null,
          desfecho: null,
          prejuizo: null,
          posicao: posicaoPorId(id),
        },
      ];
    }

    case 'designar':
      return atualizar(lista, acao.id, () => ({ tecnicoId: acao.tecnicoId, atribuicao: agora }));

    case 'iniciar':
      return atualizar(lista, acao.id, (o) =>
        o.tecnicoId && o.status === STATUS.ABERTO ? { status: STATUS.ANDAMENTO, inicio: agora } : {}
      );

    case 'encerrar':
      return atualizar(lista, acao.id, (o) => ({
        status: acao.resolvido ? STATUS.CONCLUIDO : STATUS.NAO_RESOLVIDO,
        inicio: o.inicio || agora,
        encerramento: agora,
        desfecho: acao.desfecho,
        prejuizo: acao.resolvido ? null : acao.prejuizo,
      }));

    // Correção dos dados de registro (só enquanto a ocorrência está ativa).
    case 'editar':
      return atualizar(lista, acao.id, () => {
        const { tipo, urgencia, titulo, endereco, descricao } = acao.dados;
        return { tipo, urgencia, titulo, endereco, descricao, editadaEm: agora };
      });

    // Registro indevido (duplicado, aberto por engano). Não entra nas métricas de resultado.
    case 'cancelar':
      return atualizar(lista, acao.id, () => ({
        status: STATUS.CANCELADO,
        cancelamento: agora,
        motivoCancelamento: acao.motivo,
      }));

    case 'restaurar':
      return criarBaseInicial();

    default:
      return lista;
  }
}

const OcorrenciasContext = createContext(null);

export function OcorrenciasProvider({ children }) {
  const [ocorrencias, dispatch] = useReducer(reducer, undefined, carregar);

  useEffect(() => salvar(ocorrencias), [ocorrencias]);

  const valor = useMemo(
    () => ({
      ocorrencias,
      buscar: (id) => ocorrencias.find((o) => o.id === id) || null,
      registrar: (dados) => {
        const id = proximoId(ocorrencias);
        dispatch({ tipo: 'registrar', id, dados });
        return id;
      },
      designar: (id, tecnicoId) => dispatch({ tipo: 'designar', id, tecnicoId }),
      iniciar: (id) => dispatch({ tipo: 'iniciar', id }),
      encerrar: (id, { resolvido, desfecho, prejuizo }) =>
        dispatch({ tipo: 'encerrar', id, resolvido, desfecho, prejuizo }),
      editar: (id, dados) => dispatch({ tipo: 'editar', id, dados }),
      cancelar: (id, motivo) => dispatch({ tipo: 'cancelar', id, motivo }),
      restaurar: () => dispatch({ tipo: 'restaurar' }),
    }),
    [ocorrencias]
  );

  return <OcorrenciasContext.Provider value={valor}>{children}</OcorrenciasContext.Provider>;
}

export function useOcorrencias() {
  const contexto = useContext(OcorrenciasContext);
  if (!contexto) throw new Error('useOcorrencias deve ser usado dentro de <OcorrenciasProvider>.');
  return contexto;
}
