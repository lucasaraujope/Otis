import { useMemo } from 'react';
import FuncionarioCard from '../../components/FuncionarioCard/FuncionarioCard.jsx';
import { useOcorrencias } from '../../store/OcorrenciasContext.jsx';
import { funcionarios } from '../../data/funcionarios.js';
import { estatisticasTecnico } from '../../utils/ocorrencias.js';
import { Pagina, PageHead, PageTitle, PageSub, Lista, Cards } from './styles.js';

export default function Funcionarios() {
  const { ocorrencias } = useOcorrencias();

  const comNumeros = useMemo(
    () => funcionarios.map((f) => ({ ...f, ...estatisticasTecnico(ocorrencias, f.id) })),
    [ocorrencias]
  );

  return (
    <Pagina id="inicio">
      <div className="container">
        <PageHead>
          <PageTitle>Funcionários e seus casos</PageTitle>
          <PageSub>{funcionarios.length} técnicos</PageSub>
        </PageHead>

        <Lista>
          <Cards>
            {comNumeros.map((funcionario) => (
              <FuncionarioCard key={funcionario.id} funcionario={funcionario} />
            ))}
          </Cards>
        </Lista>
      </div>
    </Pagina>
  );
}
