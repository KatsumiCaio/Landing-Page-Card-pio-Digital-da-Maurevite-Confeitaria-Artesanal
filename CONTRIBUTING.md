# Guia de Contribuição — Maurevite Confeitaria Artesanal

Seja bem-vindo(a) ao projeto da **Maurevite Confeitaria Artesanal**! Este documento detalha os padrões obrigatórios de engenharia, gestão por Issues, fluxo de branches e criação de Pull Requests (PRs) que **todos os desenvolvedores e agentes de IA** devem seguir rigorosamente.

---

## 📌 1. Regra de Ouro: Todo Trabalho Começa por uma Issue

Nenhuma linha de código deve ser escrita ou modificada sem uma **Issue** correspondente no GitHub ou no registro do backlog (`ISSUES.md`).

### Categorização Obrigatória de Issues:

Toda tarefa deve receber exatamente um dos três prefixos/rótulos:

1. **`[Correção]` (Bug Fix)**:
   - Correção de bugs funcionais, quebras de layout mobile, problemas de overflow, erros de digitação ou comportamentos inesperados.
   - *Exemplo de Título:* `[Correção]: Ajuste de overflow horizontal no cardápio mobile`

2. **`[Melhoria]` (Enhancement)**:
   - Otimizações de UX/UI, refinamento de acessibilidade, melhoria de SEO, performance de carregamento ou refatoração sem acréscimo de funcionalidade.
   - *Exemplo de Título:* `[Melhoria]: Adição de notas de sabor na busca em tempo real`

3. **`[Nova função]` (Feature)**:
   - Criação de novas seções, componentes, fluxos de conversão ou integrações de dados.
   - *Exemplo de Título:* `[Nova função]: Calculadora interativa de rendimento de fatias por kg`

---

## 🌿 2. Estratégia de Branches e Nomenclatura

Para manter o histórico do repositório limpo e rastreável, utilize a seguinte convenção de branches:

| Tipo de Tarefa | Prefixo da Branch | Exemplo de Nome |
| :--- | :--- | :--- |
| **Correção (Bug Fix)** | `fix/` ou `bugfix/` | `fix/issue-001-mobile-overflow` |
| **Melhoria (Enhancement)** | `enhance/` ou `refactor/` | `enhance/issue-004-search-filters` |
| **Nova função (Feature)** | `feat/` ou `feature/` | `feat/issue-011-cake-calculator` |

### Fluxo de Trabalho (Git Workflow):
1. Crie sua branch a partir da `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feat/issue-011-cake-calculator
   ```
2. Desenvolva as alterações mantendo commits atômicos e descritivos:
   ```bash
   git commit -m "feat(calculator): adiciona componente de simulador de fatias"
   ```
3. Valide o código localmente antes de enviar:
   ```bash
   npm run lint
   npm run build
   ```
4. Abra o Pull Request apontando para a branch `main`.

---

## 🔀 3. Padrão Obrigatório de Pull Request (PR)

Nenhum PR será aprovado ou enviado para produção sem a estrutura abaixo devidamente preenchida:

```markdown
## 🔗 Issue Relacionada
Fixes #000 - [Título da Tarefa]
Tipo: [Correção | Melhoria | Nova função]

## 📝 O que mudou?
- Descrição concisa e objetiva de todas as alterações feitas.
- Lista de arquivos ou componentes afetados.

## 🧪 Como foi validado?
- [x] Linter executado sem erros (`npm run lint` / `tsc --noEmit`).
- [x] Build de produção compilado com sucesso (`npm run build`).
- [x] Testes visuais responsivos (Desktop, Tablet e Mobile 360px).
- [x] Verificação de links externos e links de conversão do WhatsApp.

## ⚠️ Riscos e Limitações
- Possíveis impactos colaterais ou dependências externas identificadas.
- Limitações conhecidas da solução proposta.

## 🚀 Próximos Passos
- Tarefas de acompanhamento ou melhorias futuras planejadas.
```

---

## 🛠️ 4. Padrões de Código e Diretrizes de Design

1. **Mobile-First & Anti-Overflow**:
   - O container raiz deve sempre manter `w-full max-w-full overflow-x-hidden`.
   - Elementos interativos devem ter área de toque mínima de `44px` no mobile.

2. **Identidade Visual Maurevite**:
   - Fundo principal: Linho / Off-white (`#FAFAF8`)
   - Primária de texto e botões: Grafite Carvão (`#1E2024`)
   - Acento artesanal: Caramelo Dourado (`#C49A6C` / `#B48250`)
   - Tipografia: *Playfair Display* (títulos e destaques) + *Plus Jakarta Sans* (textos e dados).

3. **Foco em Conversão (WhatsApp)**:
   - Todo fluxo de produto deve alimentar o WhatsApp `(15) 99786-3391` em Capão Bonito - SP com mensagens limpas e formatadas.

---

## 🧪 5. Checklist de Pré-Merge / Validação

Antes de solicitar revisão ou concluir uma entrega:
- [ ] O código compila com zero erros no TypeScript (`tsc --noEmit`);
- [ ] O bundle de produção é gerado com sucesso (`npm run build`);
- [ ] Não há vazamentos de layout em larguras de tela de `360px`, `768px` e `1280px`;
- [ ] Modais e gavetas fecham corretamente via botão `X`, backdrop e tecla `Escape`;
- [ ] O arquivo `ISSUES.md` foi atualizado com o status correspondente da tarefa.
