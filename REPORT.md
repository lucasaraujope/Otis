# Relatório Técnico — OTIS

Data da análise: 2026-11-23
Repositório: https://github.com/lucasaraujope/Otis.git
Branch padrão remota: `segunda-tela-albano`

## 1. Estrutura de diretórios

```
otis/
├── .git/
├── .gitignore
├── README.md
├── REPORT.md
├── index.html
├── package.json
├── script.js
├── server.js
└── style.css
```

Projeto plano (sem subpastas de código ou assets). Histórico inicial com 1 commit (`86dcfb3 segunda tela - Albano`).

## 2. Tecnologias utilizadas

| Categoria      | Tecnologia |
|----------------|-----------|
| Marcação       | HTML5 semântico (`header`, `nav`, `main`, `section`, `article`, `figure`) |
| Estilo         | CSS3 puro (custom properties, grid, flexbox, media queries) |
| Script         | JavaScript vanilla (DOM API, SVG dinâmico, `Intl.NumberFormat`, `ResizeObserver`) |
| Acessibilidade | `aria-*`, `hidden`, tabela `sr-only`, `prefers-reduced-motion` |
| Runtime local  | Node.js 18+ (servidor HTTP nativo, zero dependências) |

Não há framework front-end (React/Vue/Angular) nem bundler (Vite/Webpack).

## 3. Dependências principais

Nenhuma dependência de runtime ou de desenvolvimento declarada. O `package.json` foi adicionado apenas para padronizar os scripts `dev`/`start`. Todo o código roda direto no navegador.

## 4. Configuração do ambiente local

- Requisitos: Node.js 18+ e Git (presentes: Node 24.19, Git 2.55).
- Ambiente já configurado com:
  - `server.js` — servidor estático nativo (porta padrão 5173, configurável via `PORT`);
  - `package.json` — scripts `dev` e `start`;
  - `.gitignore` — ignora `node_modules/`, logs e pastas de IDE.
- Execução: `npm run dev` → http://localhost:5173

## 5. Documentação existente

Antes desta análise **não havia README, `/docs` nem wiki**. Foi criado o `README.md` com stack, estrutura, execução e fluxo Git, além deste `REPORT.md`.

## 6. Sincronização remota

- `git fetch origin --prune` executado.
- Branch remota única: `origin/segunda-tela-albano` (também a HEAD padrão).
- **Não existe branch `main`.** Portanto `git pull origin main` falharia; o equivalente correto é `git pull origin segunda-tela-albano`.
- Working tree limpa e atualizada em relação ao remoto.
- Branch local criada: `feature/opencode-setup`.

## 7. Pendências e issues

- Issues abertas no GitHub: **0**.
- Pull requests abertos: nenhum detectado.
- Sem CI/CD, testes automatizados, lint ou formatação configurados.

## 8. Problemas encontrados

1. **Acentuação/português:** títulos usam "Ocorrências concertadas" (grafia incorreta — o correto é "consertadas").
2. **HTML duplicado:** os 4 cards são marcação repetida; conteúdo é placeholder ("Local do chamado", "Endereço do chamado", "Técnico responsável").
3. **Dados mockados no JS:** `ATENDIMENTOS_POR_MES` é hardcoded; comentário pede substituição por dados reais.
4. **Sem separação de dados/UI:** nenhuma camada de dados ou integração com API/back-end.
5. **Sem `main`:** fluxos que assumem `main` quebram; documentação precisa refletir a branch real.
6. **Sem responsividade testada formalmente:** há media queries, mas sem validação automatizada.
7. **Sem `package-lock.json`/versões fixas:** não há dependências, então baixo risco, mas também sem padronização via lockfile.
8. **Acessibilidade/segurança:** uso de `innerHTML` no tooltip e na tabela (`script.js:97`, `script.js:274`) — seguro com dados atuais, mas evitar com dados externos (XSS).
9. **Nenhum tratamento de erro** caso `clientWidth` seja 0 na primeira renderização.

## 9. Melhorias sugeridas

- Corrigir ortografia ("consertadas") e revisar textos.
- Renderizar cards dinamicamente a partir de um array/JSON, eliminando duplicação de HTML.
- Extrair dados para `data/chamados.json` e buscar via `fetch`, preparando integração com API.
- Adicionar ferramentas de qualidade: ESLint + Prettier e um `lint` script.
- Adicionar testes básicos (ex.: Playwright/Vitest) para interação dos cards e do gráfico.
- Configurar CI (GitHub Actions) para lint/testes em PRs.
- Padronizar branch principal: criar `main` como espelho da `segunda-tela-albano` ou renomear, alinhando os comandos de sync.
- Evitar `innerHTML` com dados dinâmicos; usar `textContent`/`createElement`.
- Adicionar favicon e meta tags (`description`, Open Graph).
- Documentar decisões de design e dados em `docs/`.
- Considerar fallback para navegadores sem `ResizeObserver` (já existe) e teste em dispositivos reais.

## 10. Conclusão

Projeto pequeno e funcional, de baixa complexidade, pronto para desenvolvimento local. Principais lacunas são ausência de documentação (agora suprida), dados mockados, duplicação de markup e falta de pipeline de qualidade. O ambiente local está configurado e a branch `feature/opencode-setup` está pronta para evolução contínua.
