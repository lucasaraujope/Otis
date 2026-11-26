import { createContext, useContext, useMemo, useState } from 'react';
import { buscarFuncionario, funcionarios } from '../data/funcionarios.js';
import { estaAtiva } from '../utils/ocorrencias.js';

// Perfis de acesso SIMULADOS (protótipo sem backend).
// Isto controla apenas o que a interface mostra: NÃO é autenticação nem segurança.
// Qualquer pessoa pode trocar o perfil no seletor e os dados ficam no navegador.
// Em produção, o perfil viria de um login validado no servidor, que também
// precisaria aplicar estas mesmas regras nas chamadas à API.
export const PERFIS = { ADMIN: 'admin', TECNICO: 'tecnico' };

const CHAVE = 'otis:acesso';

function carregar() {
  try {
    window.localStorage.removeItem('otis:tecnico-atual'); // chave da versão anterior da tela do técnico
    const salvo = JSON.parse(window.localStorage.getItem(CHAVE) || 'null');
    if (salvo?.perfil === PERFIS.ADMIN) return { perfil: PERFIS.ADMIN, tecnicoId: null };
    if (salvo?.perfil === PERFIS.TECNICO && buscarFuncionario(salvo.tecnicoId)) return salvo;
  } catch {
    // Sem localStorage: começa como administrador.
  }
  return { perfil: PERFIS.ADMIN, tecnicoId: null };
}

// Regras de permissão, todas em um lugar só.
function criarPermissoes({ perfil, tecnicoId }) {
  const admin = perfil === PERFIS.ADMIN;
  const doTecnico = (o) => o.tecnicoId === tecnicoId;
  const semTecnico = (o) => !o.tecnicoId && estaAtiva(o);

  return {
    admin,
    paginaInicial: admin ? '/' : '/meus-chamados',
    // Técnico vê os próprios chamados (ativos ou encerrados) e os ativos sem técnico.
    podeVer: (o) => admin || doTecnico(o) || semTecnico(o),
    podeAssumir: (o) => !admin && semTecnico(o),
    podeDesignar: () => admin,
    podeAtender: (o) => estaAtiva(o) && (admin || doTecnico(o)), // iniciar e encerrar
    podeCorrigirOuCancelar: (o) => admin && estaAtiva(o),
    podeRegistrar: admin,
  };
}

const AcessoContext = createContext(null);

export function AcessoProvider({ children }) {
  const [sessao, setSessao] = useState(carregar);

  const valor = useMemo(() => {
    const entrarComo = (perfil, tecnicoId = null) => {
      const nova = perfil === PERFIS.TECNICO
        ? { perfil, tecnicoId: buscarFuncionario(tecnicoId) ? tecnicoId : funcionarios[0].id }
        : { perfil: PERFIS.ADMIN, tecnicoId: null };
      setSessao(nova);
      try {
        window.localStorage.setItem(CHAVE, JSON.stringify(nova));
      } catch {
        // Sem persistência: vale só nesta visita.
      }
      return criarPermissoes(nova).paginaInicial;
    };

    return {
      ...sessao,
      tecnico: buscarFuncionario(sessao.tecnicoId),
      ...criarPermissoes(sessao),
      entrarComo,
    };
  }, [sessao]);

  return <AcessoContext.Provider value={valor}>{children}</AcessoContext.Provider>;
}

export function useAcesso() {
  const contexto = useContext(AcessoContext);
  if (!contexto) throw new Error('useAcesso deve ser usado dentro de <AcessoProvider>.');
  return contexto;
}
