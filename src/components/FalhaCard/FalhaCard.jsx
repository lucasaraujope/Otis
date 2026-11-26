import { useState } from 'react';
import { Link } from 'react-router-dom';
import Tag from '../Tag/Tag.jsx';
import { statusCores, tiposOcorrencia, tagTipo } from '../../theme/colors.js';
import { buscarFuncionario } from '../../data/funcionarios.js';
import { formatarDataHora } from '../../utils/ocorrencias.js';
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
  Acoes,
  DetalhesLink,
  Recolher,
} from './styles.js';

export default function FalhaCard({ ocorrencia }) {
  const [aberto, setAberto] = useState(false);

  const status = statusCores[ocorrencia.status] || statusCores['Não resolvido'];
  const tipo = tiposOcorrencia[ocorrencia.tipo];
  const tecnico = buscarFuncionario(ocorrencia.tecnicoId);
  const detalhesId = `falha-detalhes-${ocorrencia.id}`;

  return (
    <Card $aberto={aberto}>
      <CardHeader
        type="button"
        onClick={() => setAberto((valor) => !valor)}
        aria-expanded={aberto}
        aria-controls={detalhesId}
      >
        <CardHeading>
          <CardTitle>{ocorrencia.titulo}</CardTitle>
          <CardSub>
            {tipo?.label} · {ocorrencia.descricao}
          </CardSub>
        </CardHeading>
        <Chevron $aberto={aberto} aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Chevron>
      </CardHeader>

      {aberto && (
        <Detalhes id={detalhesId}>
          <TagsRow>
            <Tag color={tagTipo.color} soft={tagTipo.soft} border={tagTipo.border}>
              {tipo?.label}
            </Tag>
            <Tag color={status.color} soft={status.soft} border={status.border}>
              {ocorrencia.status}
            </Tag>
          </TagsRow>

          <InfoGrid>
            <InfoBlock>
              <InfoLabel>Localização</InfoLabel>
              <InfoValue>{ocorrencia.endereco}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>Encerrado em</InfoLabel>
              <InfoValue>{formatarDataHora(ocorrencia.encerramento)}</InfoValue>
            </InfoBlock>
          </InfoGrid>

          <InfoGrid>
            <InfoBlock>
              <InfoLabel>Desfecho</InfoLabel>
              <InfoValue>{ocorrencia.desfecho}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>Prejuízo</InfoLabel>
              <InfoValue>{ocorrencia.prejuizo}</InfoValue>
            </InfoBlock>
          </InfoGrid>

          <InfoGrid>
            <InfoBlock>
              <InfoLabel>Responsável</InfoLabel>
              <InfoValue>{tecnico ? tecnico.nome : '—'}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>Aberto em</InfoLabel>
              <InfoValue>{formatarDataHora(ocorrencia.abertura)}</InfoValue>
            </InfoBlock>
          </InfoGrid>

          <Acoes>
            <DetalhesLink as={Link} to={`/ocorrencias/${ocorrencia.id}`}>
              Detalhes do chamado {ocorrencia.id}
            </DetalhesLink>
            <Recolher type="button" onClick={() => setAberto(false)}>
              Recolher
            </Recolher>
          </Acoes>
        </Detalhes>
      )}
    </Card>
  );
}
