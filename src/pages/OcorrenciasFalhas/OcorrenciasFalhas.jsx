import FalhaCard from '../../components/FalhaCard/FalhaCard.jsx';
import { ocorrenciasFalhas } from '../../data/falhas.js';
import { Pagina, PageHead, PageTitle, PageSub, Lista, Cards } from './styles.js';

export default function OcorrenciasFalhas() {
  return (
    <Pagina id="inicio">
      <div className="container">
        <PageHead>
          <PageTitle>Ocorrências falhas</PageTitle>
          <PageSub>{ocorrenciasFalhas.length} registros finalizados</PageSub>
        </PageHead>

        <Lista>
          <Cards>
            {ocorrenciasFalhas.map((ocorrencia) => (
              <FalhaCard key={ocorrencia.id} ocorrencia={ocorrencia} />
            ))}
          </Cards>
        </Lista>
      </div>
    </Pagina>
  );
}
