import styled from 'styled-components';

export const StyledTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 11px;
  border-radius: 999px;
  background: ${({ $soft }) => $soft};
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $border }) => $border || 'transparent'};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;
`;

export const TagDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;
