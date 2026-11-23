# OTIS

Painel front-end de chamados (atendimentos) da OTIS. Projeto estático escrito em HTML, CSS e JavaScript puro, sem etapa de build.

## Stack

- HTML5
- CSS3 (variáveis, grid/flexbox, media queries, `prefers-reduced-motion`)
- JavaScript (ES2020+, DOM, SVG dinâmico, `ResizeObserver`)
- Node.js apenas para servir os arquivos localmente (servidor sem dependências)

## Estrutura

```
.
├── index.html      # Marcação da página (gráfico + cards de chamados)
├── style.css       # Estilos e responsividade
├── script.js       # Interações dos cards + gráfico SVG
├── server.js       # Servidor estático local (Node, zero dependências)
├── package.json    # Metadados e scripts (dev/start)
├── REPORT.md       # Relatório de análise técnica
└── .gitignore
```

## Requisitos

- Node.js 18+ (testado com Node 24)
- Git

## Como rodar

```bash
npm run dev
```

Acesse <http://localhost:5173>. Para usar outra porta:

```powershell
$env:PORT=8080; npm run dev
```

Alternativa sem Node:

```bash
python -m http.server 5173
```

## Fluxo de trabalho Git

Branch principal do repositório remoto: `segunda-tela-albano` (não existe `main`).

```bash
git fetch origin
git pull origin segunda-tela-albano
```

Branch de trabalho atual: `feature/opencode-setup`.

```bash
git add .
git commit -m "chore: update project via OpenCode"
git push origin feature/opencode-setup
```

> Nunca sobrescreva alterações locais sem confirmação. Rode `git status` antes de sincronizar.
