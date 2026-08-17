/**
 * Camada Unificada de Observabilidade, Telemetria & Monitoramento de Conversão
 * Maurevite Confeitaria Artesanal
 * 
 * Suporta integração com:
 * - Sentry (VITE_SENTRY_DSN)
 * - Datadog RUM (VITE_DATADOG_APPLICATION_ID, VITE_DATADOG_CLIENT_TOKEN, etc.)
 * - OpenTelemetry / Google Analytics / Meta Pixel (agnóstico)
 * - Funil de Conversão Nativo de Pedidos via WhatsApp
 */

export interface TelemetryEvent {
  name: string;
  category: 'conversion' | 'ux' | 'error' | 'performance';
  properties?: Record<string, string | number | boolean | undefined | null>;
  timestamp?: number;
}

export interface WebVitalsMetric {
  name: 'FCP' | 'LCP' | 'CLS' | 'FID' | 'INP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export type FunnelStep =
  | 'catalog_view'
  | 'product_detail_view'
  | 'cake_calculator_use'
  | 'add_to_bag'
  | 'open_order_drawer'
  | 'whatsapp_checkout_click'
  | 'direct_whatsapp_contact'
  | 'faq_view';

export interface WhatsAppCheckoutPayload {
  itemsCount: number;
  totalValue: number;
  deliveryType: 'retirada' | 'entrega';
  productsList: string[];
  hasDeliveryDate: boolean;
  hasCustomNotes: boolean;
}

export interface FunnelMetrics {
  catalogViews: number;
  productViews: number;
  calculatorInteractions: number;
  bagAdditions: number;
  drawerOpens: number;
  whatsappCheckouts: number;
  directContacts: number;
  totalEstimatedRevenue: number;
  conversionRatePercent: number;
}

// Interface global para interoperabilidade com SDKs de terceiros caso sejam carregados
declare global {
  interface Window {
    Sentry?: {
      captureException: (error: Error, extra?: Record<string, unknown>) => string;
      captureMessage: (msg: string, extra?: Record<string, unknown>) => string;
      init?: (options: Record<string, unknown>) => void;
    };
    DD_RUM?: {
      addAction: (name: string, context?: Record<string, unknown>) => void;
      addError: (error: Error | string, context?: Record<string, unknown>) => void;
      init?: (options: Record<string, unknown>) => void;
    };
  }
}

class ObservabilityService {
  private isInitialized = false;
  private sampleRate = 1.0;
  private sentryDsn = '';
  private datadogAppId = '';
  private datadogClientToken = '';

  // Contadores do funil em memória na sessão
  private funnelCounters: Record<FunnelStep, number> = {
    catalog_view: 0,
    product_detail_view: 0,
    cake_calculator_use: 0,
    add_to_bag: 0,
    open_order_drawer: 0,
    whatsapp_checkout_click: 0,
    direct_whatsapp_contact: 0,
    faq_view: 0,
  };

  private totalEstimatedRevenue = 0;

  public init(config?: { sampleRate?: number }) {
    if (this.isInitialized) return;
    this.sampleRate = config?.sampleRate ?? 1.0;
    this.isInitialized = true;

    // Leitura segura de variáveis de ambiente do cliente
    try {
      if (typeof import.meta !== 'undefined' && import.meta.env) {
        this.sentryDsn = (import.meta.env.VITE_SENTRY_DSN as string) || '';
        this.datadogAppId = (import.meta.env.VITE_DATADOG_APPLICATION_ID as string) || '';
        this.datadogClientToken = (import.meta.env.VITE_DATADOG_CLIENT_TOKEN as string) || '';
      }
    } catch {
      // Ignora erro em ambientes de teste que não possuem import.meta.env
    }

    // Inicializa observadores no navegador
    if (typeof window !== 'undefined') {
      this.initGlobalErrorHandlers();
      this.initPerformanceObserver();
      this.restoreSessionMetrics();

      if (this.sentryDsn) {
        this.initSentryIntegration();
      }

      if (this.datadogAppId && this.datadogClientToken) {
        this.initDatadogIntegration();
      }
    }
  }

  private initGlobalErrorHandlers() {
    window.addEventListener('error', (event) => {
      this.trackError(event.error || new Error(event.message), {
        source: 'window.onerror',
        filename: event.filename,
        lineno: event.lineno,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.trackError(
        event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
        { source: 'unhandledrejection' }
      );
    });
  }

  private initSentryIntegration() {
    if (typeof window !== 'undefined' && window.Sentry?.init) {
      try {
        window.Sentry.init({
          dsn: this.sentryDsn,
          tracesSampleRate: this.sampleRate,
          environment: process.env.NODE_ENV || 'production',
        });
      } catch (err) {
        console.warn('[Observability:Sentry] Falha ao inicializar SDK Sentry:', err);
      }
    }
  }

  private initDatadogIntegration() {
    if (typeof window !== 'undefined' && window.DD_RUM?.init) {
      try {
        window.DD_RUM.init({
          applicationId: this.datadogAppId,
          clientToken: this.datadogClientToken,
          site: (import.meta.env.VITE_DATADOG_SITE as string) || 'datadoghq.com',
          service: (import.meta.env.VITE_DATADOG_SERVICE as string) || 'maurevite-confeitaria',
          env: (import.meta.env.VITE_DATADOG_ENV as string) || 'production',
          sessionSampleRate: 100,
          sessionReplaySampleRate: 20,
          trackUserInteractions: true,
          trackResources: true,
          trackLongTasks: true,
          defaultPrivacyLevel: 'mask-user-input',
        });
      } catch (err) {
        console.warn('[Observability:Datadog] Falha ao inicializar SDK Datadog:', err);
      }
    }
  }

  private initPerformanceObserver() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    try {
      // Observer para Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const lcpValue = lastEntry.startTime;
          this.trackMetric({
            name: 'LCP',
            value: Math.round(lcpValue),
            rating: lcpValue < 2500 ? 'good' : lcpValue < 4000 ? 'needs-improvement' : 'poor',
          });
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // Observer para Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // @ts-expect-error - hadRecentInput é padrão da API CLS
          if (!entry.hadRecentInput) {
            // @ts-expect-error - value é padrão da API CLS
            clsValue += entry.value;
          }
        }
        this.trackMetric({
          name: 'CLS',
          value: Number(clsValue.toFixed(3)),
          rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
        });
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch {
      // Ignora falhas em navegadores sem suporte
    }
  }

  private restoreSessionMetrics() {
    try {
      const saved = sessionStorage.getItem('maurevite_funnel_metrics');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.funnelCounters = { ...this.funnelCounters, ...parsed.counters };
        this.totalEstimatedRevenue = parsed.totalEstimatedRevenue || 0;
      }
    } catch {
      // Ignora erro em sessionStorage bloqueado
    }
  }

  private persistSessionMetrics() {
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(
          'maurevite_funnel_metrics',
          JSON.stringify({
            counters: this.funnelCounters,
            totalEstimatedRevenue: this.totalEstimatedRevenue,
          })
        );
      }
    } catch {
      // Ignora
    }
  }

  /**
   * Rastreia eventos de conversão e comportamento geral
   */
  public trackEvent(event: TelemetryEvent) {
    const payload = {
      ...event,
      timestamp: event.timestamp || Date.now(),
      environment: process.env.NODE_ENV || 'production',
      url: typeof window !== 'undefined' ? window.location.pathname : '',
    };

    // Log estruturado em ambiente local / preview
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[Telemetry:${event.category.toUpperCase()}]`, event.name, event.properties || '');
    }

    // Encaminhamento para Sentry se ativo
    if (typeof window !== 'undefined' && window.Sentry?.captureMessage) {
      window.Sentry.captureMessage(event.name, { extra: payload });
    }

    // Encaminhamento para Datadog RUM se ativo
    if (typeof window !== 'undefined' && window.DD_RUM?.addAction) {
      window.DD_RUM.addAction(event.name, payload);
    }
  }

  /**
   * Rastreia uma etapa específica do funil de conversão
   */
  public trackConversionStep(
    step: FunnelStep,
    properties?: Record<string, string | number | boolean | undefined | null>
  ) {
    if (this.funnelCounters[step] !== undefined) {
      this.funnelCounters[step] += 1;
      this.persistSessionMetrics();
    }

    this.trackEvent({
      name: `funnel_${step}`,
      category: 'conversion',
      properties: {
        step,
        stepCount: this.funnelCounters[step],
        ...properties,
      },
    });
  }

  /**
   * Rastreia o momento crucial de envio do pedido estruturado no WhatsApp
   */
  public trackWhatsAppCheckout(payload: WhatsAppCheckoutPayload) {
    this.funnelCounters.whatsapp_checkout_click += 1;
    this.totalEstimatedRevenue += payload.totalValue;
    this.persistSessionMetrics();

    this.trackEvent({
      name: 'conversion_whatsapp_order_dispatched',
      category: 'conversion',
      properties: {
        itemsCount: payload.itemsCount,
        totalValueBRL: payload.totalValue,
        deliveryType: payload.deliveryType,
        productsList: payload.productsList.join(', '),
        hasDeliveryDate: payload.hasDeliveryDate,
        hasCustomNotes: payload.hasCustomNotes,
      },
    });
  }

  /**
   * Rastreia adições ou remoções de produtos na sacola
   */
  public trackCartAction(
    action: 'add' | 'remove' | 'quantity_change' | 'clear',
    productDetails?: { id: string; name: string; price: number; quantity: number }
  ) {
    if (action === 'add') {
      this.trackConversionStep('add_to_bag', productDetails);
    } else {
      this.trackEvent({
        name: `cart_${action}`,
        category: 'ux',
        properties: productDetails,
      });
    }
  }

  /**
   * Rastreia contato direto via botões de WhatsApp flutuante ou cabeçalho
   */
  public trackDirectContact(channel: 'floating_button' | 'hero' | 'footer' | 'faq', context?: string) {
    this.trackConversionStep('direct_whatsapp_contact', {
      channel,
      context: context || 'general_inquiry',
    });
  }

  /**
   * Rastreia visualização de detalhes de produto
   */
  public trackProductView(productId: string, productName: string, category: string, price: number) {
    this.trackConversionStep('product_detail_view', {
      productId,
      productName,
      category,
      price,
    });
  }

  /**
   * Rastreia métricas de performance (Web Vitals)
   */
  public trackMetric(metric: WebVitalsMetric) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[Web-Vitals] ${metric.name}: ${metric.value} (${metric.rating})`);
    }

    if (typeof window !== 'undefined' && window.DD_RUM?.addAction) {
      window.DD_RUM.addAction(`web_vital_${metric.name}`, {
        metricName: metric.name,
        value: metric.value,
        rating: metric.rating,
      });
    }
  }

  /**
   * Captura de exceções e erros operacionais
   */
  public trackError(error: Error, context?: Record<string, unknown>) {
    const sanitizedContext = { ...context };
    delete sanitizedContext.password;
    delete sanitizedContext.creditCard;

    console.error('[Observability:Error]', error.message, {
      stack: error.stack,
      context: sanitizedContext,
    });

    if (typeof window !== 'undefined' && window.Sentry?.captureException) {
      window.Sentry.captureException(error, { extra: sanitizedContext });
    }

    if (typeof window !== 'undefined' && window.DD_RUM?.addError) {
      window.DD_RUM.addError(error, sanitizedContext);
    }
  }

  /**
   * Retorna resumo analítico das métricas do funil de conversão da sessão
   */
  public getFunnelMetrics(): FunnelMetrics {
    const totalTop = Math.max(1, this.funnelCounters.catalog_view + this.funnelCounters.product_detail_view);
    const totalConversions = this.funnelCounters.whatsapp_checkout_click + this.funnelCounters.direct_whatsapp_contact;
    const conversionRatePercent = Number(((totalConversions / totalTop) * 100).toFixed(2));

    return {
      catalogViews: this.funnelCounters.catalog_view,
      productViews: this.funnelCounters.product_detail_view,
      calculatorInteractions: this.funnelCounters.cake_calculator_use,
      bagAdditions: this.funnelCounters.add_to_bag,
      drawerOpens: this.funnelCounters.open_order_drawer,
      whatsappCheckouts: this.funnelCounters.whatsapp_checkout_click,
      directContacts: this.funnelCounters.direct_whatsapp_contact,
      totalEstimatedRevenue: this.totalEstimatedRevenue,
      conversionRatePercent,
    };
  }
}

export const observability = new ObservabilityService();
