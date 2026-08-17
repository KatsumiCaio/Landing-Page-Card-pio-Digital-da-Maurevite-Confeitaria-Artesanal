# 🏛️ Guia de Arquitetura & Contratos de Qualidade — Maurevite

Este documento formaliza as diretrizes arquiteturais, de engenharia de software e os contratos de qualidade para o projeto da **Maurevite Confeitaria Artesanal**.

---

## 🧭 1. Princípios Arquiteturais Fundamentais

### 1.1. Anti-Overengineering (Simplicidade Pragmática)
- **Zero Abstrações Prematuras**: Não criar camadas genéricas ou factories para lógicas que são usadas em um único local.
- **Transparência de Código**: Código legível e direto é preferível a metaprogramação complexa.
- **Sem Infraestrutura Fantasma**: O frontend consome diretamente os dados estruturados de `src/data/` e gera links diretos para a API oficial do WhatsApp, sem intermediários desnecessários.

### 1.2. Componentização desde o Início & Catálogo Único
- Toda peça de interface com responsabilidade coesa reside em `/src/components/`.
- **Regra de Não-Duplicação**: Antes de criar qualquer novo componente, **é obrigatório verificar os componentes existentes**:
  - `Logo.tsx`: Identidade e logotipo vetorial da batedeira vintage;
  - `ImageWithSkeleton.tsx`: Carregador de imagens com efeito *shimmer* e transição suave;
  - `OrderDrawer.tsx`: Sacola e gerador de mensagem estruturada de WhatsApp;
  - `ProductModal.tsx`: Modal detalhado de produtos;
  - `CakeCalculator.tsx`: Calculadora de rendimento e dimensionamento de bolos;
  - `SeasonalKits.tsx`: Módulo comemorativo e kits de presentes;
  - `BentoShowcase.tsx`: Vitrine editorial em Bento Grid;
  - `ToastFeedback.tsx`: Notificação tátil não-obstrutiva;
  - `LegalModal.tsx`: Termos de uso, LGPD e cancelamento;
  - `ErrorBoundary.tsx`: Captura de erros com fallback amigável e observabilidade.

### 1.3. DRY com Critério (Don't Repeat Yourself)
- Compartilhe funções puras (como sanitização, formatação de moeda BRL e cálculo de rendimento) em `src/lib/` ou `tests/`.
- **Atenção**: Duas telas que se parecem visualmente mas possuem fluxos de negócios distintos NÃO devem ser forçadas em uma abstração única e acoplada.

### 1.4. Separação Estrita Frontend vs. Backend
- **Frontend (SPA React / Vite)**: Camada de apresentação e interação visual imediata do cliente.
- **Backend / Secrets**: Caso sejam adicionadas chaves de API secretas (Gemini API, Stripe, etc.), estas devem residir **estritamente em rotas `/api/*`** no servidor, nunca expostas no bundle do cliente.

---

## 📊 2. Estratégia de Observabilidade & Telemetria de Conversão

- **Módulo Central**: `src/lib/observability.ts` centraliza a captura de erros, métricas de Core Web Vitals e o funil de conversão nativo de pedidos.
- **Configuração em Nuvem**:
  - **Sentry DSN**: Configurado via variável de ambiente `VITE_SENTRY_DSN`. Quando presente, integra `window.Sentry` para captura de exceções e rastreamento de transações.
  - **Datadog RUM**: Configurado via `VITE_DATADOG_APPLICATION_ID`, `VITE_DATADOG_CLIENT_TOKEN`, `VITE_DATADOG_SITE`, `VITE_DATADOG_SERVICE` e `VITE_DATADOG_ENV`. Monitora sessões, performance e Web Vitals em tempo real.
  - **Fallback Gracioso**: Caso nenhuma chave esteja configurada, a camada de observabilidade mantém a telemetria ativa localmente em memória e no console de desenvolvimento sem lançar erros em runtime.
- **Funil de Conversão WhatsApp**:
  - `catalog_view` -> Visualização das categorias do cardápio;
  - `product_detail_view` -> Abertura de modal com detalhes e fotos do doce/bolo;
  - `cake_calculator_use` -> Interação e simulação na calculadora de fatias/kg;
  - `add_to_bag` -> Inserção de itens na sacola de encomendas;
  - `open_order_drawer` -> Visualização do resumo do pedido;
  - `whatsapp_checkout_click` -> Disparo da mensagem estruturada para o WhatsApp comercial da Maurevite;
  - `direct_whatsapp_contact` -> Cliques nos botões de atendimento direto (Hero, botão flutuante e rodapé).
- **Error Boundary**: Toda a aplicação é protegida por `ErrorBoundary.tsx` para evitar tela branca em caso de falha de renderização e despachar o log de erro para a observabilidade.

---

## 🧪 3. Pirâmide de Testes & Qualidade

```
      /\
     /  \     E2E (Playwright: fluxos de checkout, calculadora e modais)
    /----\
   /      \   Integração (Validação de payload e link de WhatsApp)
  /--------\
 /          \ Testes Unitários (Rendimento de bolo, formatação, sanitização)
/------------\
```

- **Execução dos Testes**: `npm test` (executa nativamente via `tsx --test`).
- **Cobertura**: Acompanhamento via Codecov.
- **Testes de Mutação**: Recomendado uso de Stryker em pipelines de release crítica para validar assertividade dos testes.

---

## 🔒 4. Segurança & Performance Budget

- **Rate Limiting do Cliente**: `securityService.checkRateLimit()` impede envios em rajada ou spam de disparos no WhatsApp.
- **Sanitização de Entradas**: `securityService.sanitizeInput()` remove tags HTML e scripts maliciosos de dedicatórias e campos de texto.
- **LGPD & Termos**: Modal informativo com transparência sobre uso de dados pessoais estritamente para entrega local e produção de encomendas.
- **Performance Budget**:
  - CSS/JS Gzip inicial < 120kb;
  - Carregamento de imagens com `loading="lazy"` e `ImageWithSkeleton`;
  - LCP alvo < 2.5s em redes 4G móveis.
