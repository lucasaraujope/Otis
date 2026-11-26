import { useNavigate } from 'react-router-dom';
import { funcionarios } from '../../data/funcionarios.js';
import { PERFIS, useAcesso } from '../../store/AcessoContext.jsx';
import {
  Acesso,
  HeaderBar,
  HeaderInner,
  Brand,
  BrandMark,
  BrandName,
  Nav,
  NavItem,
  NavIcon,
  NavDot,
} from './styles.js';

function IconBrand() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M12 3v18" />
      <path d="M7.5 9L9 7.5 10.5 9" />
      <path d="M13.5 15L15 16.5 16.5 15" />
    </svg>
  );
}

function IconChamados() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4a3 3 0 0 1 6 0" />
      <path d="M9 11h6M9 15h6M9 19h4" />
    </svg>
  );
}

function IconHistorico() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function IconFalhas() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function IconFuncionarios() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconMeus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function IconIndicadores() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M22 20H2" />
    </svg>
  );
}

export default function Header() {
  const acesso = useAcesso();
  const navigate = useNavigate();
  const valorAcesso = acesso.admin ? PERFIS.ADMIN : `${PERFIS.TECNICO}:${acesso.tecnicoId}`;

  const trocarAcesso = (evento) => {
    const [perfil, tecnicoId] = evento.target.value.split(':');
    navigate(acesso.entrarComo(perfil, tecnicoId));
  };

  return (
    <HeaderBar>
      <HeaderInner className="container d-flex align-items-center justify-content-between">
        <Brand to={acesso.paginaInicial} end aria-label="OTIS início">
          <BrandMark aria-hidden="true">
            <IconBrand />
          </BrandMark>
          <BrandName>OTIS</BrandName>
        </Brand>

        <Nav aria-label="Navegação principal" className="d-flex align-items-center">
          {acesso.admin ? (
            <>
              <NavItem to="/" end aria-label="Chamados em andamento">
                <NavIcon aria-hidden="true">
                  <IconChamados />
                </NavIcon>
                <span className="nav-text">Chamados</span>
                <NavDot aria-hidden="true" />
              </NavItem>

              <NavItem to="/historico" aria-label="Histórico">
                <NavIcon aria-hidden="true">
                  <IconHistorico />
                </NavIcon>
                <span className="nav-text">Histórico</span>
              </NavItem>

              <NavItem to="/falhas" aria-label="Ocorrências falhas">
                <NavIcon aria-hidden="true">
                  <IconFalhas />
                </NavIcon>
                <span className="nav-text">Falhas</span>
              </NavItem>

              <NavItem to="/funcionarios" aria-label="Funcionários e seus casos">
                <NavIcon aria-hidden="true">
                  <IconFuncionarios />
                </NavIcon>
                <span className="nav-text">Funcionários</span>
              </NavItem>

              <NavItem to="/indicadores" aria-label="Indicadores para gestão">
                <NavIcon aria-hidden="true">
                  <IconIndicadores />
                </NavIcon>
                <span className="nav-text">Indicadores</span>
              </NavItem>
            </>
          ) : (
            <NavItem to="/meus-chamados" aria-label="Meus chamados">
              <NavIcon aria-hidden="true">
                <IconMeus />
              </NavIcon>
              <span className="nav-text">Meus chamados</span>
              <NavDot aria-hidden="true" />
            </NavItem>
          )}
        </Nav>

        <Acesso>
          <label htmlFor="seletor-acesso">Acesso</label>
          <select id="seletor-acesso" value={valorAcesso} onChange={trocarAcesso}>
            <option value={PERFIS.ADMIN}>Administrador</option>
            <optgroup label="Técnico">
              {funcionarios.map((f) => (
                <option key={f.id} value={`${PERFIS.TECNICO}:${f.id}`}>
                  {f.nome}
                </option>
              ))}
            </optgroup>
          </select>
        </Acesso>
      </HeaderInner>
    </HeaderBar>
  );
}
