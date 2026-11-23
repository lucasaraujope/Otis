import {
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

export default function Header() {
  return (
    <HeaderBar>
      <HeaderInner className="container d-flex align-items-center justify-content-between">
        <Brand to="/" end aria-label="OTIS início">
          <BrandMark aria-hidden="true">
            <IconBrand />
          </BrandMark>
          <BrandName>OTIS</BrandName>
        </Brand>

        <Nav aria-label="Navegação principal" className="d-flex align-items-center">
          <NavItem to="/" end>
            <NavIcon aria-hidden="true">
              <IconChamados />
            </NavIcon>
            <span className="nav-label-full">Chamados em andamento</span>
            <span className="nav-label-short">Chamados</span>
            <NavDot aria-hidden="true" />
          </NavItem>

          <NavItem to="/historico">
            <NavIcon aria-hidden="true">
              <IconHistorico />
            </NavIcon>
            <span>Histórico</span>
          </NavItem>
        </Nav>
      </HeaderInner>
    </HeaderBar>
  );
}
