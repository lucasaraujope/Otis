import Header from '../../components/Header/Header.jsx';
import Mapa from '../../components/Mapa/Mapa.jsx';
import UrgenciaSection from '../../components/UrgenciaSection/UrgenciaSection.jsx';
import { chamados, chamadosPorUrgencia } from '../../data/chamados.js';
import { niveisUrgencia, ORDEM_URGENCIA } from '../../theme/colors.js';
import { Pagina, PageHead, PageTitle, PageSub } from './styles.js';

export default function ChamadosEmAndamento() {
  return (
    <>
      <Header />

      <Pagina id="inicio">
        <div className="container">
          <Mapa chamados={chamados} />

          <PageHead>
            <PageTitle>Chamados</PageTitle>
            <PageSub>{chamados.length} chamados no painel</PageSub>
          </PageHead>

          <div id="chamados" className="row g-4 align-items-start">
            {ORDEM_URGENCIA.map((id) => {
              const nivel = niveisUrgencia[id];

              return (
                <div className="col-12 col-lg-4" key={id}>
                  <UrgenciaSection
                    nivel={nivel}
                    chamados={chamadosPorUrgencia(id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Pagina>
    </>
  );
}
