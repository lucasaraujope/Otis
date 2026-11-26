import { useMemo, useState } from 'react';
import Mapa from '../../components/Mapa/Mapa.jsx';
import UrgenciaSection from '../../components/UrgenciaSection/UrgenciaSection.jsx';
import { BotaoLink, Entrada, GrupoOpcoes, Opcao } from '../../components/ui/styles.js';
import { useOcorrencias } from '../../store/OcorrenciasContext.jsx';
import { niveisUrgencia, ORDEM_URGENCIA, ORDEM_TIPOS, tiposOcorrencia } from '../../theme/colors.js';
import {
  correspondeBusca,
  estaAtiva,
  falhasRecentesPorEquipamento,
  ordenarPorPrioridade,
  reincidenciaDe,
  situacaoSla,
} from '../../utils/ocorrencias.js';
import { Pagina, PageHead, PageTitle, PageSub, Filtros, Busca } from './styles.js';

export default function ChamadosEmAndamento() {
  const { ocorrencias } = useOcorrencias();
  const [tipo, setTipo] = useState('todos');
  const [termo, setTermo] = useState('');

  const ativos = useMemo(() => ordenarPorPrioridade(ocorrencias.filter(estaAtiva)), [ocorrencias]);
  const grupos = useMemo(() => falhasRecentesPorEquipamento(ocorrencias), [ocorrencias]);

  const filtrados = ativos.filter(
    (o) => (tipo === 'todos' || o.tipo === tipo) && correspondeBusca(o, termo)
  );
  const semTecnico = filtrados.filter((o) => !o.tecnicoId).length;
  const foraDoSla = filtrados.filter((o) => situacaoSla(o).situacao === 'estourado').length;

  return (
    <Pagina id="inicio">
      <div className="container">
        <Mapa chamados={filtrados} />

        <PageHead>
          <div>
            <PageTitle>Chamados ativos</PageTitle>
            <PageSub>
              {filtrados.length} na fila · {semTecnico} sem técnico · {foraDoSla} fora do SLA ·
              ordenados por urgência e tempo de espera
            </PageSub>
          </div>
          <BotaoLink to="/ocorrencias/nova">+ Registrar ocorrência</BotaoLink>
        </PageHead>

        <Filtros>
          <Busca>
            <Entrada
              type="search"
              placeholder="Buscar por código, local, endereço, descrição ou técnico"
              aria-label="Buscar chamados ativos"
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
            />
          </Busca>
          <GrupoOpcoes role="group" aria-label="Filtrar por tipo de ocorrência">
            {['todos', ...ORDEM_TIPOS].map((id) => (
              <Opcao
                key={id}
                type="button"
                $ativa={tipo === id}
                aria-pressed={tipo === id}
                onClick={() => setTipo(id)}
              >
                {id === 'todos' ? 'Todos os tipos' : tiposOcorrencia[id].label}
              </Opcao>
            ))}
          </GrupoOpcoes>
        </Filtros>

        <div id="chamados" className="row g-4 align-items-start">
          {ORDEM_URGENCIA.map((id) => (
            <div className="col-12 col-lg-4" key={id}>
              <UrgenciaSection
                nivel={niveisUrgencia[id]}
                chamados={filtrados.filter((o) => o.urgencia === id)}
                reincidencias={(o) => reincidenciaDe(o, grupos)}
              />
            </div>
          ))}
        </div>
      </div>
    </Pagina>
  );
}
