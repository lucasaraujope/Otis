import { useState } from 'react';
import Tag from '../Tag/Tag.jsx';
import { statusCores } from '../../theme/colors.js';
import {
  Card,
  CardHeader,
  CardHeading,
  CardTitle,
  CardSub,
  Chevron,
  Detalhes,
  TagsRow,
  InfoGrid,
  InfoBlock,
  InfoLabel,
  InfoValue,
  Descricao,
  Acoes,
  DetalhesLink,
  Recolher,
} from './styles.js';

export default function HistoricoCard({ ocorrencia }) {
  const [aberto, setAberto] = useState(false);

  const status = statusCores[ocorrencia.status] || statusCores['Concluído'];
  const detalhesId = `historico-detalhes-${ocorrencia.id}`;

  return (
    <Card $aberto={aberto}>
      <CardHeader
        type="button"
        onClick={() => setAberto((valor) => !valor)}
        aria-expanded={aberto}
        aria-controls={detalhesId}
      >
        <CardHeading>
          <CardTitle>Local do Chamado</CardTitle>
          <CardSub>{ocorrencia.localizacao}</CardSub>
        </CardHeading>
        <Chevron $aberto={aberto} aria-hidden="true">
          ⌄
        </Chevron>
      </CardHeader>

      {aberto && (
        <Detalhes id={detalhesId}>
          <TagsRow>
            <Tag color={status.color} soft={status.soft} border={status.border}>
              {ocorrencia.status}
            </Tag>
          </TagsRow>

          <InfoGrid>
            <InfoBlock>
              <InfoLabel>Localização</InfoLabel>
              <InfoValue>{ocorrencia.localizacao}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>Data e hora</InfoLabel>
              <InfoValue>{ocorrencia.dataHora}</InfoValue>
            </InfoBlock>
          </InfoGrid>

          <Descricao>
            <InfoLabel>Descrição</InfoLabel>
            <p>{ocorrencia.descricao}</p>
          </Descricao>

          <InfoGrid>
            <InfoBlock>
              <InfoLabel>Técnico responsável</InfoLabel>
              <InfoValue>{ocorrencia.tecnico}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>Andamento</InfoLabel>
              <InfoValue>{ocorrencia.andamento}</InfoValue>
            </InfoBlock>
          </InfoGrid>

          <Acoes>
            <DetalhesLink href="#detalhes">Detalhes do chamado</DetalhesLink>
            <Recolher type="button" onClick={() => setAberto(false)}>
              Recolher
            </Recolher>
          </Acoes>
        </Detalhes>
      )}
    </Card>
  );
}
