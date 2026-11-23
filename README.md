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

## Telas

| Rota | Tela |
|------|------|
| `/` | **Chamados em Andamento** |
| `/historico` | **Histórico** |

## Estrutura do projeto

```
.
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx
│   ├── App.jsx                       # Rotas + Header compartilhado
│   ├── index.css
│   ├── theme/
│   │   └── colors.js                 # Paleta OTIS, urgência e status
│   ├── data/
│   │   ├── chamados.js               # Chamados em andamento (fictícios)
│   │   └── historico.js              # Atendimentos por mês + ocorrências concluídas
│   ├── pages/
│   │   ├── ChamadosEmAndamento/
│   │   └── Historico/
│   └── components/
│       ├── Header/                   # Navegação (NavLink)
│       ├── Mapa/                     # Mapa simulado com pinos
│       ├── Tag/                      # Tags de urgência/status
│       ├── ChamadoCard/              # Card expansível de chamado
│       ├── UrgenciaSection/          # Seção por urgência
│       ├── GraficoAtendimentos/      # Gráfico SVG de barras + tabela acessível
│       └── HistoricoCard/            # Card expansível de ocorrência concluída
└── legacy/                           # Versão estática anterior (HTML/CSS/JS)
```

Cada componente possui `Componente.jsx` e `styles.js` (styled-components).

## Tela Chamados em Andamento (`/`)

- Mapa simulado centralizado com pinos coloridos por urgência e tooltip acessível.
- Título `Chamados`.
- Seções: **Menos urgência**, **Urgência Média**, **Urgência extrema** (grid responsivo).
- Cards "Local do Chamado" fechados por padrão, com seta que expande/recolhe.
- Expandido: tag de gravidade + status; Localização e Data e hora; Descrição; Técnico responsável e Andamento; texto azul **Recolher**.

## Tela Histórico (`/historico`)

- Card "Atendimentos realizados no ano" com gráfico de barras SVG (jan–dez), total, média, tooltip e tabela oculta para leitores de tela.
- Gráfico responsivo (recriado no `ResizeObserver`).
- Seção "Ocorrências consertadas com sucesso" com cards expansíveis; ao expandir exibe status, Localização, Data e hora, Descrição, Técnico responsável, Andamento, link "Detalhes do chamado" e **Recolher**.

## Design / paleta

A paleta é compartilhada pelas duas telas:

- Azul principal `#0ba5df` / escuro `#0783bb`
- Fundo `#f5f8fa`, texto `#293b4b`, títulos `#17303f`
- Cinza suave `#8292a1`, bordas `#d8e1e8`
- Verde `#218b63`, âmbar `#b07d00`, vermelho `#d64545` para urgência

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

Dados fictícios em `src/data/`:

- `chamados.js`: `id`, `urgencia` (`baixa` | `media` | `extrema`), `status`, `localizacao`, `dataHora`, `descricao`, `tecnico`, `andamento`, `posicao`.
- `historico.js`: `atendimentosPorMes` e `ocorrenciasConcluidas`.

## Git

Branch remota padrão: `segunda-tela-albano` (não existe `main`).

```bash
git fetch origin
git pull origin segunda-tela-albano
```

Branch local de trabalho: `main` (upstream em `origin/feature/opencode-setup`).

```bash
git add .
git commit -m "chore: update project via OpenCode"
git push origin main:feature/opencode-setup
```

> Não sobrescreva alterações locais sem confirmação. Verifique `git status` antes de sincronizar.
