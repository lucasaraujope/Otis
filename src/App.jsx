import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import ChamadosEmAndamento from './pages/ChamadosEmAndamento/ChamadosEmAndamento.jsx';
import Historico from './pages/Historico/Historico.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ChamadosEmAndamento />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
