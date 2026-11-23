import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { colors } from '../../theme/colors.js';

export const HeaderBar = styled.header`
  background: ${colors.primary};
  padding: 14px 0;
`;

export const HeaderInner = styled.div`
  gap: 24px;
`;

export const Logo = styled(NavLink)`
  flex-shrink: 0;
  color: #ffffff;
  font-size: clamp(38px, 6vw, 64px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -3px;
  text-decoration: none;

  @media (max-width: 600px) {
    font-size: 38px;
  }
`;

export const Nav = styled.nav`
  flex-wrap: wrap;
  gap: clamp(16px, 4vw, 48px);
`;

export const NavItem = styled(NavLink)`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  opacity: 0.82;
  transition: opacity 0.15s ease;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 3px;
    border-radius: 3px;
    background: #ffffff;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.18s ease;
  }

  &.active {
    opacity: 1;
  }

  &.active::after {
    transform: scaleX(1);
  }

  &:hover,
  &:focus-visible {
    opacity: 1;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const pulsoNav = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.65); }
  70% { box-shadow: 0 0 0 8px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
`;

export const NavBadge = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ffffff;
  animation: ${pulsoNav} 2s infinite;
`;
