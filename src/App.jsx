import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import ChamadosEmAndamento from './pages/ChamadosEmAndamento/ChamadosEmAndamento.jsx';
import Historico from './pages/Historico/Historico.jsx';
import OcorrenciasFalhas from './pages/OcorrenciasFalhas/OcorrenciasFalhas.jsx';
import Funcionarios from './pages/Funcionarios/Funcionarios.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ChamadosEmAndamento />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/falhas" element={<OcorrenciasFalhas />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
