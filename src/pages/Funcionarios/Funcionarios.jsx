import FuncionarioCard from '../../components/FuncionarioCard/FuncionarioCard.jsx';
import { funcionarios } from '../../data/funcionarios.js';
import { Pagina, PageHead, PageTitle, PageSub, Lista, Cards } from './styles.js';

export default function Funcionarios() {
  return (
    <Pagina id="inicio">
      <div className="container">
        <PageHead>
          <PageTitle>Funcionários e seus casos</PageTitle>
          <PageSub>{funcionarios.length} técnicos</PageSub>
        </PageHead>

        <Lista>
          <Cards>
            {funcionarios.map((funcionario) => (
              <FuncionarioCard key={funcionario.id} funcionario={funcionario} />
            ))}
          </Cards>
        </Lista>
      </div>
    </Pagina>
  );
}
