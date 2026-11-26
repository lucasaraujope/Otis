import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import { OcorrenciasProvider } from './store/OcorrenciasContext.jsx';
import { AcessoProvider, PERFIS, useAcesso } from './store/AcessoContext.jsx';
import ChamadosEmAndamento from './pages/ChamadosEmAndamento/ChamadosEmAndamento.jsx';
import NovaOcorrencia from './pages/NovaOcorrencia/NovaOcorrencia.jsx';
import DetalheOcorrencia from './pages/DetalheOcorrencia/DetalheOcorrencia.jsx';
import Historico from './pages/Historico/Historico.jsx';
import OcorrenciasFalhas from './pages/OcorrenciasFalhas/OcorrenciasFalhas.jsx';
import Funcionarios from './pages/Funcionarios/Funcionarios.jsx';
import Indicadores from './pages/Indicadores/Indicadores.jsx';
import MeusChamados from './pages/MeusChamados/MeusChamados.jsx';

// Rota visível só para um perfil; os demais voltam para a própria página inicial.
function Restrita({ perfil, children }) {
  const acesso = useAcesso();
  return acesso.perfil === perfil ? children : <Navigate to={acesso.paginaInicial} replace />;
}

function PaginaInicial() {
  const { paginaInicial } = useAcesso();
  return <Navigate to={paginaInicial} replace />;
}

const soAdmin = (elemento) => <Restrita perfil={PERFIS.ADMIN}>{elemento}</Restrita>;

export default function App() {
  return (
    <OcorrenciasProvider>
      <AcessoProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={soAdmin(<ChamadosEmAndamento />)} />
            <Route path="/ocorrencias/nova" element={soAdmin(<NovaOcorrencia />)} />
            {/* Aberta aos dois perfis: a própria página verifica se o técnico pode ver a ocorrência. */}
            <Route path="/ocorrencias/:id" element={<DetalheOcorrencia />} />
            <Route path="/historico" element={soAdmin(<Historico />)} />
            <Route path="/falhas" element={soAdmin(<OcorrenciasFalhas />)} />
            <Route path="/funcionarios" element={soAdmin(<Funcionarios />)} />
            <Route path="/indicadores" element={soAdmin(<Indicadores />)} />
            <Route
              path="/meus-chamados"
              element={<Restrita perfil={PERFIS.TECNICO}><MeusChamados /></Restrita>}
            />
            <Route path="*" element={<PaginaInicial />} />
          </Routes>
        </BrowserRouter>
      </AcessoProvider>
    </OcorrenciasProvider>
  );
}
