import img1 from '../assets/funcionarios/img1.jpg';
import img2 from '../assets/funcionarios/img2.jpg';
import img3 from '../assets/funcionarios/img3.jpg';
import img4 from '../assets/funcionarios/img4.jpg';
import img5 from '../assets/funcionarios/img5.jpg';

// Cadastro dos técnicos de campo. Os números de atendimento (atendidos,
// sucesso, falhas, carga atual) NÃO ficam aqui: são calculados a partir das
// ocorrências em utils/ocorrencias.js, para nunca divergirem da base.
export const funcionarios = [
  { id: 'f-carlos', nome: 'Carlos Mendes', foto: img1, tempo: '5 anos', avaliacao: 5 },
  { id: 'f-ana', nome: 'Ana Souza', foto: img2, tempo: '3 anos', avaliacao: 5 },
  { id: 'f-roberto', nome: 'Roberto Lima', foto: img3, tempo: '8 anos', avaliacao: 4 },
  { id: 'f-fernanda', nome: 'Fernanda Alves', foto: img4, tempo: '2 anos', avaliacao: 4 },
  { id: 'f-paulo', nome: 'Paulo Ribeiro', foto: img5, tempo: '6 anos', avaliacao: 5 },
];

export function buscarFuncionario(id) {
  return funcionarios.find((funcionario) => funcionario.id === id) || null;
}
