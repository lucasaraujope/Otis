import {
  HeaderBar,
  HeaderInner,
  Logo,
  Nav,
  NavLink,
  NavBadge,
} from './styles.js';

export default function Header() {
  return (
    <HeaderBar>
      <HeaderInner className="container d-flex align-items-center justify-content-between">
        <Logo href="#inicio" aria-label="OTIS início">
          OTIS
        </Logo>

        <Nav aria-label="Navegação principal" className="d-flex align-items-center">
          <NavLink href="#chamados" $active>
            <NavBadge aria-hidden="true" />
            Chamados em andamento
          </NavLink>
          <NavLink href="#historico">Histórico</NavLink>
        </Nav>
      </HeaderInner>
    </HeaderBar>
  );
}
