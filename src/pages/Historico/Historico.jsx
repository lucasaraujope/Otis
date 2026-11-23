import GraficoAtendimentos from '../../components/GraficoAtendimentos/GraficoAtendimentos.jsx';
import HistoricoCard from '../../components/HistoricoCard/HistoricoCard.jsx';
import { ocorrenciasConcluidas } from '../../data/historico.js';
import { Pagina, Lista, ListaTitulo, Cards } from './styles.js';

export default function Historico() {
  return (
    <Pagina id="inicio">
      <div className="container">
        <GraficoAtendimentos />

        <Lista id="historico">
          <ListaTitulo>Ocorrências consertadas com sucesso</ListaTitulo>
          <Cards>
            {ocorrenciasConcluidas.map((ocorrencia) => (
              <HistoricoCard key={ocorrencia.id} ocorrencia={ocorrencia} />
            ))}
          </Cards>
        </Lista>
      </div>
    </Pagina>
  );
}
