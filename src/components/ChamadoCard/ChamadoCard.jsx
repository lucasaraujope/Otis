import { useState } from 'react';
import Tag from '../Tag/Tag.jsx';
import { niveisUrgencia, statusCores } from '../../theme/colors.js';
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
  Recolher,
} from './styles.js';

export default function ChamadoCard({ chamado }) {
  const [aberto, setAberto] = useState(false);

  const nivel = niveisUrgencia[chamado.urgencia] || niveisUrgencia.baixa;
  const status = statusCores[chamado.status] || statusCores.Aberto;
  const detalhesId = `detalhes-${chamado.id}`;

  return (
    <Card $color={nivel.color} $aberto={aberto}>
      <CardHeader
        type="button"
        onClick={() => setAberto((valor) => !valor)}
        aria-expanded={aberto}
        aria-controls={detalhesId}
      >
        <CardHeading>
          <CardTitle>Local do Chamado</CardTitle>
          <CardSub>{chamado.localizacao}</CardSub>
        </CardHeading>
        <Chevron $aberto={aberto} aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Chevron>
      </CardHeader>

      {aberto && (
        <Detalhes id={detalhesId}>
          <TagsRow>
            <Tag color={nivel.color} soft={nivel.soft} border={nivel.border}>
              {nivel.label}
            </Tag>
            <Tag color={status.color} soft={status.soft} border={status.border}>
              {chamado.status}
            </Tag>
          </TagsRow>

          <InfoGrid>
            <InfoBlock>
              <InfoLabel>Localização</InfoLabel>
              <InfoValue>{chamado.localizacao}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>Data e hora</InfoLabel>
              <InfoValue>{chamado.dataHora}</InfoValue>
            </InfoBlock>
          </InfoGrid>

          <Descricao>
            <InfoLabel>Descrição</InfoLabel>
            <p>{chamado.descricao}</p>
          </Descricao>

          <InfoGrid>
            <InfoBlock>
              <InfoLabel>Técnico responsável</InfoLabel>
              <InfoValue>{chamado.tecnico}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>Andamento</InfoLabel>
              <InfoValue>{chamado.andamento}</InfoValue>
            </InfoBlock>
          </InfoGrid>

          <Acoes>
            <Recolher type="button" onClick={() => setAberto(false)}>
              Recolher
            </Recolher>
          </Acoes>
        </Detalhes>
      )}
    </Card>
  );
}
