# 📋 Backlog de Issues — Maurevite Confeitaria Artesanal

Este documento cataloga todas as tarefas do projeto divididas nas três categorias obrigatórias: **Correção**, **Melhoria** e **Nova função**.

---

## 🐛 1. Correções (`[Correção]`)

- [x] **Issue #001 — `[Correção]` Prevenção de quebra e overflow horizontal em telas pequenas (Mobile 360px)**
  - **Status:** Concluído
  - **Escopo:** Garantir `w-full max-w-full overflow-x-hidden` no contêiner principal e ajuste da escala tipográfica nos títulos do Hero e Bento Grid.

- [x] **Issue #002 — `[Correção]` Fechamento correto de Modais e Drawer com tecla ESC e backdrop**
  - **Status:** Concluído
  - **Escopo:** Tratar listener global para tecla `Escape` no `ProductModal` e no `OrderDrawer`.

- [x] **Issue #003 — `[Correção]` Formatação de moeda consistente em centavos no Drawer de Pedidos**
  - **Status:** Concluído
  - **Escopo:** Validar que todos os cálculos de subtotal e total exibam sempre duas casas decimais com vírgula padrão BRL (`R$ 00,00`).

---

## ⚡ 2. Melhorias (`[Melhoria]`)

- [x] **Issue #004 — `[Melhoria]` Otimização da busca do cardápio com suporte a notas de sabor e ingredientes**
  - **Status:** Concluído
  - **Escopo:** Permitir que termos como "pistache", "belga", "ninho", "crocante" retornem os itens correspondentes sem depender apenas do nome exato do produto.

- [x] **Issue #005 — `[Melhoria]` Refinamento da paleta cromática e microinterações editoriais**
  - **Status:** Concluído
  - **Escopo:** Aplicação das cores do logotipo (fundo linho `#FAFAF8`, carvão `#1E2024` e acento dourado `#C49A6C`) com estados de hover e transições suaves.

- [x] **Issue #006 — `[Melhoria]` Acessibilidade de contraste WCAG AA e atributos ARIA nos acordeões de FAQ**
  - **Status:** Concluído
  - **Escopo:** Adicionar `aria-controls`, `aria-labelledby`, `role="region"` e estados de foco visíveis (`focus-visible:ring-2`) em todos os acordeões de FAQ com contraste WCAG AA.

- [x] **Issue #007 — `[Melhoria]` Pré-carregamento de fontes e Lazy Loading de imagens da vitrine**
  - **Status:** Concluído
  - **Escopo:** Inclusão de `preconnect` para Google Fonts e `loading="lazy"` nas fotos de produtos.

- [x] **Issue #013 — `[Melhoria]` Implementação de Motion Principles (Kyle Zantos, Emil Kowalski e Jakub Krehel): Skeletons, AnimatePresence e Feedback Visual Tátil**
  - **Status:** Concluído
  - **Escopo:** Criação do componente `ImageWithSkeleton.tsx` com shimmer gradient e transição suave de carregamento; animação com `AnimatePresence` e spring physics para Modais, Drawer e FAQ; microinterações táteis de toque (`whileTap: 0.94-0.96`); `layoutId` nas abas de categoria; componente `ToastFeedback.tsx` com feedback visual imediato ao adicionar produtos à sacola; e estados de progresso no envio ao WhatsApp.

- [x] **Issue #014 — `[Melhoria]` Esteira de Qualidade (Quality Gate Pré-Merge), Observabilidade, Testes Unitários/E2E, Segurança e Termos de Uso (LGPD)**
  - **Status:** Concluído
  - **Escopo:** Configuração da esteira de CI (`.github/workflows/quality-gate.yml`) com validação estática de tipagem, Commitlint, Knip e Playwright; implementação da camada de observabilidade (`src/lib/observability.ts`) com ErrorBoundary (`src/components/ErrorBoundary.tsx`); serviço de segurança e rate limiting (`src/lib/security.ts`); modal de Termos de Uso e Privacidade LGPD (`src/components/LegalModal.tsx`); suíte de testes unitários e de integração (`tests/`); e formalização de contratos de arquitetura (`ARCHITECTURE.md`).

- [x] **Issue #015 — `[Melhoria]` Observabilidade em Produção (Sentry / Datadog DSN) e Telemetria do Funil de Conversão WhatsApp**
  - **Status:** Concluído
  - **Escopo:** Configuração de variáveis de ambiente para Sentry DSN (`VITE_SENTRY_DSN`) e Datadog RUM (`VITE_DATADOG_*`) em `.env.example`; integração da camada de telemetria `src/lib/observability.ts` com o funil completo de conversão de encomendas (`trackWhatsAppCheckout`, `trackCartAction`, `trackConversionStep`, `trackDirectContact`); proteção com rate limiting e sanitização no drawer de checkout; cálculo de métricas de conversão e receita estimada; e suíte de testes automatizados em `tests/observability.test.ts`.

---

## ✨ 3. Novas Funções (`[Nova função]`)

- [x] **Issue #008 — `[Nova função]` Identidade visual com Logotipo Vetorial Artesanal da batedeira**
  - **Status:** Concluído
  - **Escopo:** Criação do componente `Logo.tsx` reproduzindo a batedeira vintage e assinatura tipográfica da Maurevite.

- [x] **Issue #009 — `[Nova função]` Drawer "Monte seu Pedido" com gerador de mensagem estruturada para WhatsApp**
  - **Status:** Concluído
  - **Escopo:** Componente `OrderDrawer.tsx` que permite ao cliente somar itens, escolher entrega ou retirada em Capão Bonito, especificar data e enviar pedido formatado.

- [x] **Issue #010 — `[Nova função]` Vitrine Bento Grid Minimalista com destaques de Bolos, Cones e Fatias**
  - **Status:** Concluído
  - **Escopo:** Seção `BentoShowcase.tsx` com arquitetura visual hierárquica e links diretos para cada categoria.

- [x] **Issue #011 — `[Nova função]` Calculadora interativa de tamanho de bolo por número de convidados**
  - **Status:** Concluído
  - **Escopo:** Componente `CakeCalculator.tsx` permitindo ajustar quantidade de pessoas (5 a 60+), recomendando peso em kg (~110g/pessoa), diâmetro do aro/forma, quantidade de docinhos de apoio e orçamento direto via WhatsApp.

- [x] **Issue #012 — `[Nova função]` Seletor rápido de kits e mensagens comemorativas sazonais com micro-selos decorativos**
  - **Status:** Concluído
  - **Escopo:** Seção comemorativa `SeasonalKits.tsx` com catálogo temático de presentes (Mimos & Afeto, Aniversários, Românticos, Celebrações em Família), micro-selos decorativos artesanais ("Mais Escolhido", "Caixa Visor Luxo", "Cartão Incluso", "Selo de Cera"), seletor interativo de dedicatórias caligrafadas sem custo adicional, adição direta à sacola e link de encomenda no WhatsApp.

- [x] **Issue #016 — `[Nova função]` Favicon Vetorial Artesanal e Ícones de Navegação da Barra Superior**
  - **Status:** Concluído
  - **Escopo:** Criação do favicon vetorial de alta definição (`public/favicon.svg`) com o emblema da batedeira artesanal e gradiente dourado sobre fundo carvão; inclusão de meta tags (`<link rel="icon">`, `<link rel="apple-touch-icon">`, `<meta name="theme-color">`) em `index.html`; e inclusão de ícones semânticos da biblioteca Lucide em cada rota e item da barra de navegação desktop e menu mobile (`Navbar.tsx`).

