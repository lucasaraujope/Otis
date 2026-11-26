import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { colors } from '../../theme/colors.js';

export const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 12px 0;
  background: linear-gradient(135deg, #0ba5df 0%, #0794cc 55%, #0783bb 100%);
  box-shadow: 0 8px 24px rgba(7, 131, 187, 0.28);
`;

export const HeaderInner = styled.div`
  flex-wrap: wrap;
  gap: 16px;
  min-height: 56px;
`;

export const Brand = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  text-decoration: none;
`;

export const BrandMark = styled.span`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);

  svg {
    width: 22px;
    height: 22px;
  }

  @media (max-width: 820px) {
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }
`;

export const BrandName = styled.span`
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -2px;

  @media (max-width: 820px) {
    font-size: 26px;
  }
`;

export const Nav = styled.nav`
  gap: 4px;
  padding: 5px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(6px);

  @media (max-width: 1080px) {
    flex: 1 1 100%;
    order: 3;
  }
`;

// Seletor de perfil (simulado, sem autenticação).
export const Acesso = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;

  select {
    max-width: 190px;
    padding: 8px 30px 8px 12px;
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.16)
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 4.5 6 7.5 9 4.5' fill='none' stroke='white' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
      no-repeat right 11px center;
    color: #ffffff;
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    appearance: none;
    cursor: pointer;
  }

  select:focus-visible {
    outline: 3px solid rgba(255, 255, 255, 0.6);
    outline-offset: 2px;
  }

  option,
  optgroup {
    color: ${colors.text};
  }
`;

export const NavItem = styled(NavLink)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 14px;
  border-radius: 999px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  opacity: 0.88;
  transition: background 0.18s ease, color 0.18s ease, opacity 0.18s ease,
    box-shadow 0.18s ease;

  &:hover,
  &:focus-visible {
    opacity: 1;
    background: rgba(255, 255, 255, 0.16);
  }

  &.active {
    opacity: 1;
    background: #ffffff;
    color: ${colors.primaryDark};
    box-shadow: 0 6px 16px rgba(7, 83, 120, 0.25);
  }

  @media (max-width: 1080px) {
    flex: 1 1 0;
    padding: 9px 8px;
    font-size: 12px;
  }

  @media (max-width: 820px) {
    gap: 0;

    .nav-text {
      display: none;
    }
  }
`;

export const NavIcon = styled.span`
  display: inline-flex;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const piscar = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.8); }
`;

export const NavDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  animation: ${piscar} 2s ease-in-out infinite;

  @media (max-width: 820px) {
    display: none;
  }
`;
