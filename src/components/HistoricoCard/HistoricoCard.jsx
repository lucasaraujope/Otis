import { useState } from 'react';
import { Link } from 'react-router-dom';
import Tag from '../Tag/Tag.jsx';
import { statusCores, tiposOcorrencia, tagTipo } from '../../theme/colors.js';
import { buscarFuncionario } from '../../data/funcionarios.js';
import { formatarDataHora, formatarDuracao, tempoDeAtendimento } from '../../utils/ocorrencias.js';
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
  const tipo = tiposOcorrencia[ocorrencia.tipo];
  const tecnico = buscarFuncionario(ocorrencia.tecnicoId);
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
          <CardTitle>{ocorrencia.titulo}</CardTitle>
          <CardSub>
            {tipo?.label} · encerrado em {formatarDataHora(ocorrencia.encerramento)}
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
              <InfoLabel>Aberto em</InfoLabel>
              <InfoValue>{formatarDataHora(ocorrencia.abertura)}</InfoValue>
            </InfoBlock>
          </InfoGrid>

          <Descricao>
            <InfoLabel>Descrição</InfoLabel>
            <p>{ocorrencia.descricao}</p>
          </Descricao>

          <Descricao>
            <InfoLabel>Desfecho</InfoLabel>
            <p>{ocorrencia.desfecho}</p>
          </Descricao>

          <InfoGrid>
            <InfoBlock>
              <InfoLabel>Técnico responsável</InfoLabel>
              <InfoValue>{tecnico ? tecnico.nome : '—'}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>Tempo de atendimento</InfoLabel>
              <InfoValue>{formatarDuracao(tempoDeAtendimento(ocorrencia))}</InfoValue>
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
