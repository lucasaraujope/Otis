# OTIS

Painel de chamados da OTIS. Aplicação front-end em **React** (Vite) com **Bootstrap** e **styled-components**.

## Stack

| Categoria   | Tecnologia |
|-------------|-----------|
| UI          | React 19 + Vite 8 |
| Estilo      | styled-components 6 + Bootstrap 5 (CSS) |
| Linguagem   | JavaScript (JSX) |
| Runtime     | Node.js 20+ |

## Estrutura do projeto

```
.
├── index.html                      # Entrada do Vite
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx                    # Bootstrap do React + CSS global
│   ├── App.jsx
│   ├── index.css
│   ├── theme/
│   │   └── colors.js               # Paleta OTIS, níveis de urgência e status
│   ├── data/
│   │   └── chamados.js             # Dados fictícios dos chamados
│   ├── pages/
│   │   └── ChamadosEmAndamento/
│   │       ├── ChamadosEmAndamento.jsx
│   │       └── styles.js
│   └── components/
│       ├── Header/
│       ├── Mapa/
│       ├── Tag/
│       ├── ChamadoCard/
│       └── UrgenciaSection/
└── legacy/                         # Versão estática anterior (HTML/CSS/JS)
```

Cada componente possui `Componente.jsx` e `styles.js` (styled-components).

## Tela Chamados em Andamento

- Mapa simulado centralizado com pinos coloridos por urgência e tooltip com a localização.
- Título `Chamados`.
- Três seções, na ordem: **Menos urgência**, **Urgência Média**, **Urgência extrema**.
- Cards "Local do Chamado" fechados por padrão, com seta que expande/recolhe.
- Card expandido exibe: tag de gravidade (esquerda) e de status (direita); Localização e Data e hora; Descrição; Técnico responsável e Andamento; e o texto azul **Recolher**.

## Design / paleta

Mantém a paleta da tela Histórico (versão em `legacy/`):

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
npm run preview   # pré-visualiza build
```

## Dados

Os chamados são fictícios e ficam em `src/data/chamados.js`. Cada registro possui:
`id`, `urgencia` (`baixa` | `media` | `extrema`), `status` (`Aberto` | `Em andamento` | `Concluído`), `localizacao`, `dataHora`, `descricao`, `tecnico`, `andamento` e `posicao` (top/left para o pino no mapa).

## Git

Branch remota padrão: `segunda-tela-albano` (não existe `main`).

```bash
git fetch origin
git pull origin segunda-tela-albano
```

Branch de trabalho: `feature/opencode-setup` (renomeada localmente para `main`).

```bash
git add .
git commit -m "chore: update project via OpenCode"
git push origin feature/opencode-setup
```

> Não sobrescreva alterações locais sem confirmação. Verifique `git status` antes de sincronizar.
