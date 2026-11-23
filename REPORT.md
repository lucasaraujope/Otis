# Relatório Técnico — OTIS

Data da análise: 2026-11-23
Repositório: https://github.com/lucasaraujope/Otis.git
Branch remota padrão: `segunda-tela-albano`

## 1. Estrutura de diretórios

```
otis/
├── index.html                      # Entrada Vite (div#root)
├── vite.config.js
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
├── REPORT.md
├── src/
│   ├── main.jsx
│   ├── App.jsx                     # BrowserRouter + rotas + Header
│   ├── index.css
│   ├── theme/
│   │   └── colors.js
│   ├── data/
│   │   ├── chamados.js
│   │   └── historico.js
│   ├── pages/
│   │   ├── ChamadosEmAndamento/    (ChamadosEmAndamento.jsx, styles.js)
│   │   └── Historico/              (Historico.jsx, styles.js)
│   └── components/
│       ├── Header/                 (Header.jsx, styles.js)
│       ├── Mapa/                   (Mapa.jsx, styles.js)
│       ├── Tag/                    (Tag.jsx, styles.js)
│       ├── ChamadoCard/            (ChamadoCard.jsx, styles.js)
│       ├── UrgenciaSection/        (UrgenciaSection.jsx, styles.js)
│       ├── GraficoAtendimentos/    (GraficoAtendimentos.jsx, styles.js)
│       └── HistoricoCard/          (HistoricoCard.jsx, styles.js)
└── legacy/                         # Versão estática anterior (HTML/CSS/JS)
```

## 2. Tecnologias utilizadas

| Categoria   | Tecnologia |
|-------------|-----------|
| UI          | React 19 + Vite 8 |
| Estilo      | styled-components 6 + Bootstrap 5 (CSS) |
| Roteamento  | React Router 7 (`BrowserRouter`) |
| Linguagem   | JavaScript (JSX) |
| Runtime     | Node.js 20+ |
| Acessibilidade | `aria-expanded`, `aria-controls`, `aria-describedby`, `role`, `:focus-visible`, tabela `sr-only`, `prefers-reduced-motion` |

## 3. Dependências principais

- `react`, `react-dom` (^19.3.1)
- `react-router-dom` (^7.18.6)
- `bootstrap` (^5.3.9)
- `styled-components` (^6.6.0)
- Dev: `vite` (^8.3.8), `@vitejs/plugin-react` (^6.3.0)

## 4. Configuração do ambiente local

- Requisitos: Node.js 20+ e Git.
- `npm install` → `npm run dev` (Vite em <http://localhost:5173>).
- `npm run build` gera `dist/`; `npm run preview` serve o build com fallback SPA.

## 5. Documentação

`README.md` (stack, telas, estrutura, execução, dados e Git) e este `REPORT.md`. A versão estática anterior está preservada em `legacy/`.

## 6. Sincronização remota

- Branch remota única: `origin/segunda-tela-albano` (HEAD padrão). **Não existe `main` no remoto.**
- Equivalente correto de `git pull origin main`: `git pull origin segunda-tela-albano`.
- Branch local de trabalho: `main` (renomeada de `feature/opencode-setup`), com upstream em `origin/feature/opencode-setup`.
- Push usado: `git push origin main:feature/opencode-setup`.

## 7. Telas implementadas

### Chamados em Andamento (`/`)

- Mapa simulado centralizado (ruas, parques, rio, pinos por urgência, pulso nos extremos e tooltip).
- Título `Chamados`; seções Menos urgência / Urgência Média / Urgência extrema.
- Cards "Local do Chamado" expansíveis; conteúdo completo com tags, localização, data/hora, descrição, técnico, andamento e **Recolher** azul.

### Histórico (`/historico`)

- Card "Atendimentos realizados no ano" com gráfico SVG de barras (jan–dez), total, média, tooltip e tabela acessível `sr-only`; redimensionamento via `ResizeObserver`.
- Seção "Ocorrências consertadas com sucesso" com 4 cards expansíveis contendo status, localização, data/hora, descrição, técnico, andamento, link "Detalhes do chamado" e **Recolher**.
- Navegação compartilhada via `Header` + `NavLink` (link ativo destacado).

## 8. Problemas encontrados / corrigidos

1. Projeto era estático (HTML/CSS/JS) → migrado para React + Vite.
2. Tela Histórico existia só em `legacy/` → recriada em React, com gráfico e cards componentizados.
3. Navegação por âncoras → React Router com rotas `/` e `/historico`.
4. Texto "concertadas" (erro) → corrigido para "consertadas".
5. Dados mockados no HTML → centralizados em `src/data/`.
6. CSS/JS monolíticos → separados em componentes com styled-components.
7. Acessibilidade do mapa → `role="group"` com botões acessíveis (não `role="img"`).

## 9. Problemas remanescentes / melhorias sugeridas

- Adicionar ESLint + Prettier e script `lint`.
- Testes automatizados (Vitest/Testing Library e/ou Playwright) para expansão dos cards, tooltip do gráfico e rotas.
- CI (GitHub Actions) executando lint, testes e build.
- Integrar dados reais via API e tratar estados de carregamento/erro.
- Substituir mapa simulado por biblioteca real (Leaflet/Google Maps).
- Adicionar favicon e meta tags Open Graph.
- Considerar `HashRouter` caso o deploy estático não tenha fallback de SPA.
- Padronizar a branch principal remota (`main`).

## 10. Conclusão

O projeto foi migrado integralmente para React com estrutura padrão (`components`, `pages`, `theme`, `data`), estilização por styled-components + Bootstrap e navegação por React Router. As telas **Chamados em Andamento** e **Histórico** estão implementadas e compartilham a mesma paleta. Build validado e renderização verificada em ambas as rotas (8 cards de chamados, 4 cards de histórico e 12 barras no gráfico).
