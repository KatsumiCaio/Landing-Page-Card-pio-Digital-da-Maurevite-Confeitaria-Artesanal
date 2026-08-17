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

- [ ] **Issue #003 — `[Correção]` Formatação de moeda consistente em centavos no Drawer de Pedidos**
  - **Status:** Aberto / Backlog
  - **Escopo:** Validar que todos os cálculos de subtotal e total exibam sempre duas casas decimais com vírgula padrão BRL (`R$ 00,00`).

---

## ⚡ 2. Melhorias (`[Melhoria]`)

- [x] **Issue #004 — `[Melhoria]` Otimização da busca do cardápio com suporte a notas de sabor e ingredientes**
  - **Status:** Concluído
  - **Escopo:** Permitir que termos como "pistache", "belga", "ninho", "crocante" retornem os itens correspondentes sem depender apenas do nome exato do produto.

- [x] **Issue #005 — `[Melhoria]` Refinamento da paleta cromática e microinterações editoriais**
  - **Status:** Concluído
  - **Escopo:** Aplicação das cores do logotipo (fundo linho `#FAFAF8`, carvão `#1E2024` e acento dourado `#C49A6C`) com estados de hover e transições suaves.

- [ ] **Issue #006 — `[Melhoria]` Acessibilidade de contraste WCAG AA e atributos ARIA nos acordeões de FAQ**
  - **Status:** Aberto / Backlog
  - **Escopo:** Adicionar `aria-controls` e estados de foco visíveis em todos os botões de controle e acordeões.

- [ ] **Issue #007 — `[Melhoria]` Pré-carregamento de fontes e Lazy Loading de imagens da vitrine**
  - **Status:** Concluído / Em refinamento
  - **Escopo:** Inclusão de `preconnect` para Google Fonts e `loading="lazy"` nas fotos de produtos.

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

- [ ] **Issue #011 — `[Nova função]` Calculadora interativa de tamanho de bolo por número de convidados**
  - **Status:** Aberto / Backlog
  - **Escopo:** Criar um simulador onde o cliente arrasta o número de fatias/convidados (ex: 10, 20, 30 pessoas) e o app sugere o peso ideal (kg) e os sabores recomendados.

- [ ] **Issue #012 — `[Nova função]` Seletor rápido de mensagem para datas comemorativas (Páscoa, Dia das Mães, Natal)**
  - **Status:** Aberto / Backlog
  - **Escopo:** Adicionar banner sazonal configurável com kits e caixas temáticas em períodos festivos.
