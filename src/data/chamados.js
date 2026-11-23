export const chamados = [
  {
    id: 'CH-1042',
    urgencia: 'extrema',
    status: 'Em andamento',
    localizacao: 'Av. Paulista, 1578 - Bela Vista, São Paulo',
    dataHora: '23/11/2026 · 09:15',
    descricao:
      'Falha total no elevador social do bloco A. Passageiros aguardam liberação técnica e a área foi isolada preventivamente.',
    tecnico: 'Marcos Andrade',
    andamento: 'Equipe a caminho',
    posicao: { top: 32, left: 58 },
  },
  {
    id: 'CH-1051',
    urgencia: 'extrema',
    status: 'Aberto',
    localizacao: 'Rua Vergueiro, 3185 - Vila Mariana, São Paulo',
    dataHora: '23/11/2026 · 10:02',
    descricao:
      'Sensor de porta disparando de forma intermitente. Chamado registrado e aguardando designação de técnico.',
    tecnico: 'A definir',
    andamento: 'Aguardando atendimento',
    posicao: { top: 72, left: 51 },
  },
  {
    id: 'CH-1033',
    urgencia: 'media',
    status: 'Em andamento',
    localizacao: 'Rua Oscar Freire, 900 - Jardins, São Paulo',
    dataHora: '22/11/2026 · 16:40',
    descricao:
      'Ruído excessivo durante a subida. Manutenção preventiva em execução com previsão de conclusão no mesmo dia.',
    tecnico: 'Juliana Prado',
    andamento: 'Em manutenção',
    posicao: { top: 27, left: 73 },
  },
  {
    id: 'CH-1028',
    urgencia: 'media',
    status: 'Aberto',
    localizacao: 'Alameda Santos, 981 - Cerqueira César, São Paulo',
    dataHora: '22/11/2026 · 14:08',
    descricao:
      'Botão do painel do 5o andar com resposta lenta. Chamado aberto para verificação elétrica.',
    tecnico: 'A definir',
    andamento: 'Aguardando atendimento',
    posicao: { top: 62, left: 67 },
  },
  {
    id: 'CH-1021',
    urgencia: 'media',
    status: 'Concluído',
    localizacao: 'Rua Haddock Lobo, 595 - Cerqueira César, São Paulo',
    dataHora: '21/11/2026 · 11:30',
    descricao:
      'Iluminação da cabine substituída e sistema testado. Registro encerrado após validação do condomínio.',
    tecnico: 'Rafael Nunes',
    andamento: 'Finalizado com sucesso',
    posicao: { top: 45, left: 84 },
  },
  {
    id: 'CH-1014',
    urgencia: 'baixa',
    status: 'Em andamento',
    localizacao: 'Rua Augusta, 1200 - Consolação, São Paulo',
    dataHora: '21/11/2026 · 09:05',
    descricao:
      'Ajuste no fechamento das portas para reduzir o esforço do mecanismo. Atendimento programado sem impacto no uso.',
    tecnico: 'Carla Menezes',
    andamento: 'Ajuste programado',
    posicao: { top: 20, left: 26 },
  },
  {
    id: 'CH-1009',
    urgencia: 'baixa',
    status: 'Aberto',
    localizacao: 'Rua da Consolação, 2423 - Jardim Paulista, São Paulo',
    dataHora: '20/11/2026 · 17:45',
    descricao:
      'Solicitação de limpeza técnica do poço do elevador. Sem risco operacional identificado.',
    tecnico: 'A definir',
    andamento: 'Aguardando agendamento',
    posicao: { top: 68, left: 16 },
  },
  {
    id: 'CH-1003',
    urgencia: 'baixa',
    status: 'Concluído',
    localizacao: 'Rua Teodoro Sampaio, 1020 - Pinheiros, São Paulo',
    dataHora: '20/11/2026 · 08:20',
    descricao:
      'Revisão dos contatos elétricos concluída. Sistema opera normalmente após os testes finais.',
    tecnico: 'Bruno Tavares',
    andamento: 'Finalizado com sucesso',
    posicao: { top: 50, left: 38 },
  },
];

export function chamadosPorUrgencia(urgencia) {
  return chamados.filter((chamado) => chamado.urgencia === urgencia);
}
