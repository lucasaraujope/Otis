import styled from 'styled-components';
import { colors } from '../../theme/colors.js';

export const Section = styled.section`
  height: 100%;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e8eef3;
`;

export const Marker = styled.span`
  flex: 0 0 auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

export const Title = styled.h2`
  margin: 0;
  color: ${colors.title};
  font-size: 15px;
  font-weight: 700;
`;

export const Count = styled.span`
  margin-left: auto;
  padding: 2px 9px;
  border-radius: 999px;
  background: ${({ $soft }) => $soft};
  color: ${({ $color }) => $color};
  font-size: 12px;
  font-weight: 700;
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Empty = styled.p`
  margin: 0;
  padding: 18px;
  border: 1px dashed ${colors.border};
  border-radius: 12px;
  color: ${colors.muted};
  font-size: 12px;
  text-align: center;
`;
