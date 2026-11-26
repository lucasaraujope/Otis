import { useState } from 'react';
import Tag from '../Tag/Tag.jsx';
import Alertas from '../Alertas/Alertas.jsx';
import { niveisUrgencia, statusCores, tiposOcorrencia, tagTipo } from '../../theme/colors.js';
import { buscarFuncionario } from '../../data/funcionarios.js';
import {
  andamento,
  formatarDataHora,
  formatarDuracao,
  situacaoSla,
  tempoEmEspera,
} from '../../utils/ocorrencias.js';
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
  Tratar,
  Recolher,
} from './styles.js';

export default function ChamadoCard({ chamado, reincidencia = 0 }) {
  const [aberto, setAberto] = useState(false);

  const nivel = niveisUrgencia[chamado.urgencia] || niveisUrgencia.baixa;
  const status = statusCores[chamado.status] || statusCores.Aberto;
  const tipo = tiposOcorrencia[chamado.tipo];
  const tecnico = buscarFuncionario(chamado.tecnicoId);
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
          <CardTitle>{chamado.titulo}</CardTitle>
          <CardSub>
            {tipo?.label} · aberto há {formatarDuracao(tempoEmEspera(chamado))}
          </CardSub>
          <Alertas sla={situacaoSla(chamado)} reincidencia={reincidencia} />
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
              {chamado.status}
            </Tag>
          </TagsRow>

          <InfoGrid>
            <InfoBlock>
              <InfoLabel>Localização</InfoLabel>
              <InfoValue>{chamado.endereco}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>Aberto em</InfoLabel>
              <InfoValue>{formatarDataHora(chamado.abertura)}</InfoValue>
            </InfoBlock>
          </InfoGrid>

          <Descricao>
            <InfoLabel>Descrição</InfoLabel>
            <p>{chamado.descricao}</p>
          </Descricao>

          <InfoGrid>
            <InfoBlock>
              <InfoLabel>Técnico responsável</InfoLabel>
              <InfoValue>{tecnico ? tecnico.nome : 'A definir'}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>Andamento</InfoLabel>
              <InfoValue>{andamento(chamado)}</InfoValue>
            </InfoBlock>
          </InfoGrid>

          <Acoes>
            <Tratar to={`/ocorrencias/${chamado.id}`}>Tratar chamado {chamado.id}</Tratar>
            <Recolher type="button" onClick={() => setAberto(false)}>
              Recolher
            </Recolher>
          </Acoes>
        </Detalhes>
      )}
    </Card>
  );
}
