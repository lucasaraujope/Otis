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
│   ├── App.jsx
│   ├── index.css
│   ├── theme/
│   │   └── colors.js
│   ├── data/
│   │   └── chamados.js
│   ├── pages/
│   │   └── ChamadosEmAndamento/
│   │       ├── ChamadosEmAndamento.jsx
│   │       └── styles.js
│   └── components/
│       ├── Header/            (Header.jsx, styles.js)
│       ├── Mapa/              (Mapa.jsx, styles.js)
│       ├── Tag/               (Tag.jsx, styles.js)
│       ├── ChamadoCard/       (ChamadoCard.jsx, styles.js)
│       └── UrgenciaSection/   (UrgenciaSection.jsx, styles.js)
└── legacy/                        # Versão estática anterior (HTML/CSS/JS)
    ├── index.html
    ├── style.css
    ├── script.js
    └── server.js
```

## 2. Tecnologias utilizadas

| Categoria   | Tecnologia |
|-------------|-----------|
| UI          | React 19 + Vite 8 |
| Estilo      | styled-components 6 + Bootstrap 5 (CSS) |
| Linguagem   | JavaScript (JSX) |
| Runtime     | Node.js 20+ |
| Acessibilidade | `aria-expanded`, `aria-controls`, `aria-describedby`, `role`, `:focus-visible` |

## 3. Dependências principais

- `react`, `react-dom` (^19.3.1)
- `bootstrap` (^5.3.9)
- `styled-components` (^6.6.0)
- Dev: `vite` (^8.3.8), `@vitejs/plugin-react` (^6.3.0)

Sem dependências de dados/API: os chamados são fictícios.

## 4. Configuração do ambiente local

- Requisitos: Node.js 20+ e Git.
- `npm install` instala as dependências.
- `npm run dev` sobe o Vite em <http://localhost:5173>.
- `npm run build` gera produção em `dist/`; `npm run preview` serve o build.
- Verificado: build concluído (42 módulos) e renderização headless (8 cards, 3 seções, mapa e acentos corretos).

## 5. Documentação

`README.md` (stack, estrutura, execução, dados e fluxo Git) e este `REPORT.md`. A versão estática anterior foi preservada em `legacy/`.

## 6. Sincronização remota

- Branch remota única: `origin/segunda-tela-albano` (HEAD padrão).
- **Não existe `main` no remoto.** O equivalente a `git pull origin main` é `git pull origin segunda-tela-albano`.
- Branch local de trabalho: renomeada de `feature/opencode-setup` para `main`.

## 7. Tela Chamados em Andamento (implementada)

- Mapa simulado centralizado, com ruas/parques/rio, pinos coloridos por urgência, pulso nos extremos e tooltip acessível.
- Título `Chamados`.
- Seções na ordem: Menos urgência, Urgência Média, Urgência extrema (grid responsivo de 3 colunas no desktop, empilhado no mobile).
- Cards "Local do Chamado" fechados por padrão, com seta que expande/recolhe.
- Card expandido: tag de gravidade + tag de status; Localização e Data e hora; Descrição; Técnico responsável e Andamento; texto azul **Recolher**.
- Paleta reaproveitada da tela Histórico: azul `#0ba5df`, fundo `#f5f8fa`, verde `#218b63`, âmbar `#b07d00`, vermelho `#d64545`.

## 8. Problemas encontrados / corrigidos

1. **Projeto sem React**: migrado para Vite + React com organização por `components`/`pages`/`theme`/`data`.
2. **Sem separação de componentes**: cada bloco virou componente próprio com estilos isolados.
3. **Sem branch `main`**: documentado o uso de `segunda-tela-albano`.
4. **Dados mockados no HTML**: agora centralizados em `src/data/chamados.js`.
5. **Acessibilidade**: mapa com pinos interativos não usa mais `role="img"` (que ocultaria os botões); usa `role="group"` + `aria-describedby` nos tooltips.
6. **Sem etapa de build**: Vite adicionado.

## 9. Problemas remanescentes / melhorias sugeridas

- Adicionar ESLint + Prettier e script `lint`.
- Adicionar testes (Vitest/Testing Library ou Playwright) para expansão dos cards e mapa.
- Configurar CI (GitHub Actions) para lint/testes/build.
- Extrair dados para uma API/JSON e criar estados de carregamento/erro.
- Reimplementar a tela Histórico em React (hoje só em `legacy/`).
- Adicionar roteamento (React Router) ao integrar múltiplas telas.
- Substituir o mapa simulado por biblioteca real (Leaflet/Google Maps) quando houver coordenadas reais.
- Adicionar favicon e meta tags Open Graph.
- Padronizar a branch principal remota (`main`).

## 10. Conclusão

O projeto foi migrado para React com estrutura padrão, componentes separados e estilização via styled-components + Bootstrap. A tela **Chamados em Andamento** está implementada com mapa simulado, três níveis de urgência e cards expansíveis, seguindo a paleta da tela Histórico. Build e renderização validados.
