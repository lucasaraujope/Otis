import { useMemo, useState } from 'react';
import GraficoAtendimentos from '../../components/GraficoAtendimentos/GraficoAtendimentos.jsx';
import HistoricoCard from '../../components/HistoricoCard/HistoricoCard.jsx';
import { Entrada, MostrarMais } from '../../components/ui/styles.js';
import { useOcorrencias } from '../../store/OcorrenciasContext.jsx';
import { STATUS } from '../../theme/colors.js';
import {
  atendimentosPorMes,
  correspondeBusca,
  formatarNumero,
  maisRecentesPrimeiro,
} from '../../utils/ocorrencias.js';
import { Pagina, Lista, ListaTitulo, Cards } from './styles.js';

const POR_PAGINA = 10;

export default function Historico() {
  const { ocorrencias } = useOcorrencias();
  const [limite, setLimite] = useState(POR_PAGINA);
  const [termo, setTermo] = useState('');

  const grafico = useMemo(() => atendimentosPorMes(ocorrencias), [ocorrencias]);
  const concluidas = useMemo(
    () => maisRecentesPrimeiro(ocorrencias.filter((o) => o.status === STATUS.CONCLUIDO && correspondeBusca(o, termo))),
    [ocorrencias, termo]
  );

  return (
    <Pagina id="inicio">
      <div className="container">
        <GraficoAtendimentos dados={grafico.dados} ano={grafico.ano} />

        <Lista id="historico">
          <ListaTitulo>
            Ocorrências consertadas com sucesso ({formatarNumero.format(concluidas.length)})
          </ListaTitulo>
          <Cards>
            <Entrada
              type="search"
              placeholder="Buscar por código, local, endereço, descrição ou técnico"
              aria-label="Buscar ocorrências consertadas"
              value={termo}
              onChange={(e) => {
                setTermo(e.target.value);
                setLimite(POR_PAGINA);
              }}
            />
            {concluidas.slice(0, limite).map((ocorrencia) => (
              <HistoricoCard key={ocorrencia.id} ocorrencia={ocorrencia} />
            ))}
            {limite < concluidas.length && (
              <MostrarMais type="button" onClick={() => setLimite((l) => l + POR_PAGINA)}>
                Mostrar mais ({concluidas.length - limite} restantes)
              </MostrarMais>
            )}
          </Cards>
        </Lista>
      </div>
    </Pagina>
  );
}
