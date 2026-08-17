# Diretrizes de Desenvolvimento e Gestão de Tarefas — Maurevite

Este arquivo estabelece os padrões obrigatórios de processo, versionamento e engenharia para **qualquer agente de IA (qualquer modelo)** ou desenvolvedor que atue neste projeto.

---

## 📌 1. Regra de Ouro: Gestão por Issues e Pull Requests

Todo trabalho no projeto deve ser rastreado e organizado rigorosamente através de **Issues** e **Pull Requests (PRs)**.

### Categorização Obrigatória de Issues:
Toda tarefa deve ser criada e rotulada em uma das três categorias:
1. **`[Correção]` (Bug Fix)**: Ajustes de bugs, falhas visuais, erros de digitação, quebras de layout mobile ou comportamentos inesperados.
2. **`[Melhoria]` (Enhancement)**: Otimizações de performance, melhorias de UX/UI, acessibilidade, SEO, refatoração de código sem alteração funcional de escopo.
3. **`[Nova função]` (Feature)**: Novas seções, novos fluxos de conversão, novas integrações ou componentes não existentes previamente.

---

## 🔀 2. Padrão Obrigatório para Pull Requests (PRs)

Nenhuma alteração deve ser mesclada ou enviada para deploy sem a estrutura padrão de Pull Request. Em todo PR, o agente/desenvolvedor deve obrigatoriamente preencher:

```markdown
## 🔗 Issue Relacionada
Fixes / Relacionado à Issue #[número] - [Título da Issue]
Tipo: [Correção | Melhoria | Nova função]

## 📝 O que mudou?
- Descrição clara, concisa e objetiva de todas as alterações feitas.
- Arquivos ou componentes afetados.

## 🧪 Como foi validado?
- [x] Linter executado sem erros (`npm run lint` / `tsc --noEmit`).
- [x] Build de produção compilado com sucesso (`npm run build`).
- [x] Testes visuais responsivos (Desktop, Tablet e Mobile 360px).
- [x] Verificação de links externos e links de WhatsApp.

## ⚠️ Riscos e Limitações
- Possíveis impactos colaterais ou dependências externas.
- Limitações conhecidas da solução implementada.

## 🚀 Próximos Passos
- Tarefas de acompanhamento ou melhorias futuras planejadas.
```

---

## 🛠️ 3. Regras de Engenharia e Boas Práticas

1. **Mobile-First & Anti-Overflow**: O container raiz deve sempre manter `w-full max-w-full overflow-x-hidden`.
2. **Validação Obrigatória**: Antes de finalizar qualquer alteração, execute sempre a compilação e o linter (`npm run check:all`).
3. **Identidade Visual Maurevite**:
   - Fundo linho / off-white: `#FAFAF8`
   - Primária grafite: `#1E2024`
   - Acento dourado artesanal: `#C49A6C` / `#B48250`
   - Fontes: *Playfair Display* (títulos e destaque) + *Plus Jakarta Sans* (textos e dados).
4. **Foco em Conversão**: Todos os fluxos de produtos devem facilitar o contato com o WhatsApp `(15) 99786-3391` em Capão Bonito - SP.

---

## 🚦 4. Esteira de Qualidade (Quality Gate Pré-Merge)

Antes de qualquer código ser enviado para a branch principal (`main`), a seguinte suíte deve obrigatoriamente passar com 100% de sucesso:

1. **Lint e Tipagem Estrita**: `npm run lint` (`tsc --noEmit`).
2. **Testes Unitários & Integração**: `npm test` (`tsx --test tests/**/*.test.ts`).
3. **Compilação de Produção**: `npm run build` (`vite build`).
4. **Comando Único de Validação**: `npm run check:all`.
5. **Diretrizes de Arquitetura**: Consulte o arquivo `ARCHITECTURE.md` para contratos de componentização, anti-overengineering, observabilidade e segurança.

---

## 📋 5. Registro de Backlog de Tarefas
Consulte o arquivo `ISSUES.md` para visualizar as tarefas abertas, em progresso e concluídas.

