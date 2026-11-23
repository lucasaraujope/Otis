import {
  HeaderBar,
  HeaderInner,
  Logo,
  Nav,
  NavItem,
  NavBadge,
} from './styles.js';

export default function Header() {
  return (
    <HeaderBar>
      <HeaderInner className="container d-flex align-items-center justify-content-between">
        <Logo to="/" end aria-label="OTIS início">
          OTIS
        </Logo>

        <Nav aria-label="Navegação principal" className="d-flex align-items-center">
          <NavItem to="/" end>
            <NavBadge aria-hidden="true" />
            Chamados em andamento
          </NavItem>
          <NavItem to="/historico">Histórico</NavItem>
        </Nav>
      </HeaderInner>
    </HeaderBar>
  );
}
