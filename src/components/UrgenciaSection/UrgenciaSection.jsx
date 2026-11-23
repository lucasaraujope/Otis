import ChamadoCard from '../ChamadoCard/ChamadoCard.jsx';
import {
  Section,
  SectionHeader,
  Marker,
  Title,
  Count,
  Cards,
  Empty,
} from './styles.js';

export default function UrgenciaSection({ nivel, chamados }) {
  return (
    <Section aria-labelledby={`titulo-${nivel.id}`}>
      <SectionHeader>
        <Marker $color={nivel.color} aria-hidden="true" />
        <Title id={`titulo-${nivel.id}`}>{nivel.label}</Title>
        <Count $color={nivel.color} $soft={nivel.soft}>
          {chamados.length}
        </Count>
      </SectionHeader>

      {chamados.length > 0 ? (
        <Cards>
          {chamados.map((chamado) => (
            <ChamadoCard key={chamado.id} chamado={chamado} />
          ))}
        </Cards>
      ) : (
        <Empty>Nenhum chamado neste nível.</Empty>
      )}
    </Section>
  );
}
