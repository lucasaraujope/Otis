import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../theme/colors.js';

// Peças de interface reaproveitadas pelas telas de registro, tratamento e indicadores.

const botaoBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  padding: 9px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

export const Botao = styled.button`
  ${botaoBase};
  border: 1px solid ${colors.primary};
  background: ${colors.primary};
  color: #ffffff;

  &:hover:not(:disabled) {
    border-color: ${colors.primaryDark};
    background: ${colors.primaryDark};
    color: #ffffff;
  }
`;

export const BotaoLink = styled(Link)`
  ${botaoBase};
  border: 1px solid ${colors.primary};
  background: ${colors.primary};
  color: #ffffff;

  &:hover {
    border-color: ${colors.primaryDark};
    background: ${colors.primaryDark};
    color: #ffffff;
  }
`;

export const BotaoSecundario = styled.button`
  ${botaoBase};
  border: 1px solid ${colors.border};
  background: ${colors.surface};
  color: ${colors.text};

  &:hover:not(:disabled) {
    border-color: ${colors.primary};
    color: ${colors.primaryDark};
  }
`;

export const BotaoPerigo = styled.button`
  ${botaoBase};
  border: 1px solid #f2bebe;
  background: ${colors.surface};
  color: #b3403d;

  &:hover:not(:disabled) {
    border-color: #d64545;
    background: #fdecec;
  }
`;

export const Painel = styled.section`
  padding: 20px;
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  box-shadow: 0 10px 24px ${colors.shadow};

  @media (max-width: 520px) {
    padding: 16px;
  }
`;

export const PainelTitulo = styled.h2`
  margin: 0 0 14px;
  color: ${colors.title};
  font-size: 16px;
  font-weight: 700;
`;

export const Campo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const Rotulo = styled.label`
  color: ${colors.title};
  font-size: 12px;
  font-weight: 700;
`;

export const Dica = styled.span`
  color: ${colors.muted};
  font-size: 12px;
`;

export const Erro = styled.span`
  color: #b3403d;
  font-size: 12px;
  font-weight: 700;
`;

const campoBase = css`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ $erro }) => ($erro ? '#d64545' : colors.border)};
  border-radius: 10px;
  background: ${colors.surface};
  color: ${colors.text};
  font-family: inherit;
  font-size: 14px;

  &:focus {
    border-color: ${colors.primary};
    outline: 3px solid rgba(11, 165, 223, 0.2);
  }
`;

export const Entrada = styled.input`
  ${campoBase};
`;

export const Selecao = styled.select`
  ${campoBase};
`;

export const AreaTexto = styled.textarea`
  ${campoBase};
  min-height: 96px;
  resize: vertical;
`;

export const GrupoOpcoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Opcao = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 13px;
  border: 1px solid ${({ $ativa, $cor }) => ($ativa ? $cor || colors.primary : colors.border)};
  border-radius: 999px;
  background: ${({ $ativa, $fundo }) => ($ativa ? $fundo || '#e3f4fc' : colors.surface)};
  color: ${({ $ativa, $cor }) => ($ativa ? $cor || colors.primaryDark : colors.text)};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: ${({ $cor }) => $cor || colors.primary};
  }
`;

export const MostrarMais = styled(BotaoSecundario)`
  align-self: center;
  margin-top: 6px;
`;
