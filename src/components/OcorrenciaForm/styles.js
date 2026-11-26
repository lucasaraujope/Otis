import styled from 'styled-components';

export const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Linha = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

export const Rodape = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid #e8eef3;
`;
