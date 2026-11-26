import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OcorrenciaForm from '../../components/OcorrenciaForm/OcorrenciaForm.jsx';
import { Painel } from '../../components/ui/styles.js';
import { useOcorrencias } from '../../store/OcorrenciasContext.jsx';
import { tiposOcorrencia } from '../../theme/colors.js';
import { tecnicosPorDisponibilidade } from '../../utils/ocorrencias.js';
import { Pagina, Voltar, PageTitle, PageSub } from './styles.js';

const INICIAL = {
  tipo: 'falha_tecnica',
  urgencia: tiposOcorrencia.falha_tecnica.urgenciaSugerida,
  titulo: '',
  endereco: '',
  descricao: '',
};

export default function NovaOcorrencia() {
  const { ocorrencias, registrar } = useOcorrencias();
  const navigate = useNavigate();
  const tecnicos = useMemo(() => tecnicosPorDisponibilidade(ocorrencias), [ocorrencias]);

  const enviar = (dados) => {
    const id = registrar(dados);
    navigate(`/ocorrencias/${id}`, { state: { criada: true } });
  };

  return (
    <Pagina>
      <div className="container">
        <Voltar as={Link} to="/">← Voltar para chamados</Voltar>
        <PageTitle>Registrar ocorrência</PageTitle>
        <PageSub>
          A ocorrência entra na fila de despacho conforme a urgência. A urgência é sugerida pelo tipo
          e pode ser ajustada.
        </PageSub>

        <Painel as="div">
          <OcorrenciaForm
            inicial={INICIAL}
            tecnicos={tecnicos}
            onEnviar={enviar}
            rotuloEnviar="Registrar ocorrência"
            prefixoId="nova"
          />
        </Painel>
      </div>
    </Pagina>
  );
}
