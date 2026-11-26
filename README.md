# OTIS

Painel de chamados da OTIS. Aplicação front-end em **React** (Vite) com **Bootstrap** e **styled-components**.

## Stack

| Categoria   | Tecnologia |
|-------------|-----------|
| UI          | React 19 + Vite 8 |
| Estilo      | styled-components 6 + Bootstrap 5 (CSS) |
| Roteamento  | React Router 7 |
| Linguagem   | JavaScript (JSX) |
| Runtime     | Node.js 20+ |

## Como a solução atende ao desafio

| Requisito | Onde |
|---|---|
| **Registrar** ocorrências | `/ocorrencias/nova`: formulário com tipo, urgência, local, endereço, descrição e técnico opcional; correção de dados e cancelamento (com motivo) no detalhe |
| **Tratar** | `/ocorrencias/:id`: designar/trocar técnico, iniciar atendimento e encerrar (resolvida ou não, com desfecho e prejuízo) |
| **Organizar** | `/`: fila de despacho por urgência e, no mesmo nível, por tempo de espera; mapa; filtro por tipo; busca (também no histórico e nas falhas) |
| **Classificar** | 4 tipos (passageiros presos, falha técnica, interrupção de energia, solicitação de cliente) + 3 níveis de urgência; urgência sugerida pelo tipo |
| **Analisar** | `/indicadores`, `/historico` e `/funcionarios`: KPIs, tempos por tipo e urgência, carga e desempenho por técnico, tudo calculado da base |
| **Análise inteligente** | Alertas de **SLA** (no prazo, perto de vencer, estourado) e de **equipamento reincidente**, na fila, no detalhe, na visão do técnico e nos indicadores |
| **Base estruturada e centralizada** | Modelo único de ocorrência (`src/data/seed.js`) servido por `src/store/OcorrenciasContext.jsx` |
| **Despacho priorizado** | Fila ordenada + sugestão de técnico pela menor carga atual e maior taxa de sucesso |
| **Técnicos de campo** | `/meus-chamados`: fila do técnico em ordem de prioridade, chamados sem técnico para assumir |
| **Interfaces para gestão** | `/indicadores` |

### Perfis de acesso (simulados)

O seletor **Acesso** no cabeçalho alterna entre **Administrador** e cada **Técnico** (`src/store/AcessoContext.jsx`, onde ficam todas as regras):

| | Administrador (central) | Técnico |
|---|---|---|
| Telas | Chamados, Histórico, Falhas, Funcionários, Indicadores, detalhe | Meus chamados e detalhe |
| Ver ocorrências | Todas | As próprias e as ativas sem técnico |
| Registrar | Sim | Não |
| Designar / trocar técnico | Sim | Não (pode **assumir** chamado sem técnico) |
| Iniciar e encerrar | Sim | Só os próprios |
| Corrigir dados e cancelar | Sim | Não |

> **Atenção:** isto **não é autenticação nem segurança**. O perfil só controla o que a interface mostra; qualquer pessoa pode trocá-lo e os dados ficam no navegador. Em produção, o perfil deve vir de um login validado no servidor, que também aplique essas regras na API.

### Regras e premissas

Definidas em `src/theme/colors.js` para ajuste fácil:

- **SLA** (abertura → encerramento): urgência extrema **4 h**, média **24 h**, baixa **72 h**. Entra em "atenção" a partir de 75% do prazo. *Premissa do protótipo: valores de referência, ajustar ao contrato real.*
- **Reincidência:** equipamento (mesmo "local e equipamento") com **3 ou mais falhas em 30 dias**; solicitações de cliente e canceladas não contam.
- **Canceladas** saem da fila e das métricas de resultado (taxa de resolução, SLA, tempos).
- Ocorrências encerradas ou canceladas não podem mais ser alteradas.

**Limitação atual:** não há backend. A base é persistida no `localStorage` do navegador (cada navegador tem a sua cópia). A store isola essa parte: para usar uma API, troque `carregar`/`salvar` e as ações em `OcorrenciasContext.jsx` mantendo a interface de `useOcorrencias()`.

## Telas

| Rota | Tela |
|------|------|
| `/` | **Chamados ativos** (despacho) |
| `/ocorrencias/nova` | **Registrar ocorrência** |
| `/ocorrencias/:id` | **Detalhe e tratamento** da ocorrência |
| `/historico` | **Histórico** (gráfico + ocorrências resolvidas) |
| `/falhas` | **Ocorrências falhas** (encerradas sem solução) |
| `/funcionarios` | **Funcionários e seus casos** |
| `/meus-chamados` | **Meus chamados** (visão do técnico de campo; só no perfil Técnico) |
| `/indicadores` | **Indicadores** para a liderança |

## Estrutura do projeto

```
src/
├── App.jsx                     # Provider da base + rotas + Header
├── theme/colors.js             # Paleta, urgência, status e tipos de ocorrência
├── data/
│   ├── seed.js                 # Base inicial de ocorrências (fictícia, determinística)
│   └── funcionarios.js         # Cadastro dos técnicos (perfil e foto)
├── store/
│   ├── OcorrenciasContext.jsx  # Base centralizada: registrar, designar, iniciar, encerrar
│   └── AcessoContext.jsx       # Perfil simulado (admin/técnico) e regras de permissão
├── utils/
│   └── ocorrencias.js          # Regras: prioridade, sugestão de técnico, indicadores, formatação
├── pages/
│   ├── ChamadosEmAndamento/    # Fila de despacho + mapa + filtro por tipo
│   ├── NovaOcorrencia/         # Formulário de registro
│   ├── DetalheOcorrencia/      # Dados, linha do tempo e tratamento
│   ├── Historico/
│   ├── OcorrenciasFalhas/
│   ├── Funcionarios/
│   ├── MeusChamados/           # Visão do técnico
│   └── Indicadores/
└── components/
    ├── ui/                     # Botões, campos e filtros compartilhados
    ├── OcorrenciaForm/         # Formulário de registro e correção
    ├── Alertas/                # Selos de SLA e reincidência
    ├── Header/, Mapa/, Tag/, UrgenciaSection/, GraficoAtendimentos/
    └── ChamadoCard/, HistoricoCard/, FalhaCard/, FuncionarioCard/
legacy/                         # Versões estáticas anteriores
```

Cada componente possui `Componente.jsx` e `styles.js` (styled-components).

## Design / paleta

A paleta é compartilhada por todas as telas:

- Azul principal `#0ba5df` / escuro `#0783bb`
- Fundo `#f5f8fa`, texto `#293b4b`, títulos `#17303f`
- Cinza suave `#8292a1`, bordas `#d8e1e8`
- Verde `#218b63`, âmbar `#b07d00`, vermelho `#d64545` para urgência
- Vermelho de falha `#c0504d`; status **Não resolvido** `#b3403d` (fundo `#fdeeed`, borda `#f2c9c8`)

## Como rodar

```bash
npm install
npm run dev
```

Acesse <http://localhost:5173>.

```bash
npm run build     # build de produção em dist/
npm run preview   # pré-visualiza build (com fallback SPA)
```

## Dados

Modelo de uma ocorrência (documentado no topo de `src/data/seed.js`):

`id`, `tipo`, `urgencia` (`extrema` | `media` | `baixa`), `status` (`Aberto` | `Em andamento` | `Concluído` | `Não resolvido`), `titulo` (local + equipamento), `endereco`, `descricao`, `tecnicoId`, `abertura`, `atribuicao`, `inicio`, `encerramento` (datas ISO), `desfecho`, `prejuizo`, `posicao` (mapa); e, quando houver, `editadaEm`, `cancelamento`, `motivoCancelamento`.

A base inicial é **fictícia**: 7 chamados ativos e 10 encerramentos recentes escritos à mão, mais o histórico de 2026 gerado de forma determinística (mesmo resultado a cada carga) para dar volume aos indicadores. As datas são escritas em relação a 25/11/2026 12h e **deslocadas para o momento em que a base é criada**, para que SLA e reincidência façam sentido em qualquer dia de demonstração. Em `/indicadores` há um botão para restaurar essa base.

## Git

Branch local de trabalho: `main` (upstream em `origin/main`). O remoto também possui `segunda-tela-albano`, ainda marcada como branch padrão no GitHub.

```bash
git fetch origin
git pull origin main
git add .
git commit -m "chore: update project via OpenCode"
git push origin main
```

> Não sobrescreva alterações locais sem confirmação. Verifique `git status` antes de sincronizar.
