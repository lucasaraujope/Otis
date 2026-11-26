import { useState } from 'react';
import {
  Card,
  CardHeader,
  HeaderContent,
  Photo,
  Nome,
  Chevron,
  Detalhes,
  InfoGrid,
  InfoBlock,
  InfoLabel,
  InfoValue,
  Stars,
  Acoes,
  Recolher,
} from './styles.js';

function Estrelas({ nota }) {
  return (
    <Stars role="img" aria-label={`Avaliação: ${nota} de 5`}>
      {'★'.repeat(nota)}
      {'☆'.repeat(5 - nota)}
    </Stars>
  );
}

export default function FuncionarioCard({ funcionario }) {
  const [aberto, setAberto] = useState(false);
  const detalhesId = `funcionario-detalhes-${funcionario.id}`;

  return (
    <Card $aberto={aberto}>
      <CardHeader
        type="button"
        onClick={() => setAberto((valor) => !valor)}
        aria-expanded={aberto}
        aria-controls={detalhesId}
      >
        <HeaderContent>
          <Photo
            $aberto={aberto}
            src={funcionario.foto}
            alt={`Foto de ${funcionario.nome}`}
          />
          <Nome $aberto={aberto}>{funcionario.nome}</Nome>
        </HeaderContent>
        <Chevron $aberto={aberto} aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Chevron>
      </CardHeader>

      {aberto && (
        <Detalhes id={detalhesId}>
          <InfoGrid>
            <InfoBlock>
              <InfoLabel>Chamados encerrados</InfoLabel>
              <InfoValue>{funcionario.atendidos}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>Tempo como técnico</InfoLabel>
              <InfoValue>{funcionario.tempo}</InfoValue>
            </InfoBlock>
          </InfoGrid>

          <InfoGrid>
            <InfoBlock>
              <InfoLabel>Chamados com sucesso</InfoLabel>
              <InfoValue>{funcionario.sucesso}</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>Chamados com falha</InfoLabel>
              <InfoValue>{funcionario.falhas}</InfoValue>
            </InfoBlock>
          </InfoGrid>

          <InfoGrid>
            <InfoBlock>
              <InfoLabel>Avaliação</InfoLabel>
              <Estrelas nota={funcionario.avaliacao} />
            </InfoBlock>
            <InfoBlock>
              <InfoLabel>Chamados ativos agora</InfoLabel>
              <InfoValue>{funcionario.emAberto}</InfoValue>
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
