import { useMemo, useState } from 'react';
import FalhaCard from '../../components/FalhaCard/FalhaCard.jsx';
import { Entrada, MostrarMais } from '../../components/ui/styles.js';
import { useOcorrencias } from '../../store/OcorrenciasContext.jsx';
import { STATUS } from '../../theme/colors.js';
import { correspondeBusca, maisRecentesPrimeiro } from '../../utils/ocorrencias.js';
import { Pagina, PageHead, PageTitle, PageSub, Lista, Cards } from './styles.js';

const POR_PAGINA = 10;

export default function OcorrenciasFalhas() {
  const { ocorrencias } = useOcorrencias();
  const [limite, setLimite] = useState(POR_PAGINA);
  const [termo, setTermo] = useState('');

  const falhas = useMemo(
    () => maisRecentesPrimeiro(ocorrencias.filter((o) => o.status === STATUS.NAO_RESOLVIDO && correspondeBusca(o, termo))),
    [ocorrencias, termo]
  );

  return (
    <Pagina id="inicio">
      <div className="container">
        <PageHead>
          <PageTitle>Ocorrências falhas</PageTitle>
          <PageSub>{falhas.length} registros encerrados sem solução</PageSub>
        </PageHead>

        <Lista>
          <Cards>
            <Entrada
              type="search"
              placeholder="Buscar por código, local, endereço, descrição ou técnico"
              aria-label="Buscar ocorrências falhas"
              value={termo}
              onChange={(e) => {
                setTermo(e.target.value);
                setLimite(POR_PAGINA);
              }}
            />
            {falhas.slice(0, limite).map((ocorrencia) => (
              <FalhaCard key={ocorrencia.id} ocorrencia={ocorrencia} />
            ))}
            {limite < falhas.length && (
              <MostrarMais type="button" onClick={() => setLimite((l) => l + POR_PAGINA)}>
                Mostrar mais ({falhas.length - limite} restantes)
              </MostrarMais>
            )}
          </Cards>
        </Lista>
      </div>
    </Pagina>
  );
}
