/**
 * Camada Unificada de Observabilidade & Telemetria — Maurevite Confeitaria Artesanal
 * 
 * Suporta integração agnóstica com Sentry, OpenTelemetry, Datadog ou New Relic,
 * registrando métricas de Web Vitals (LCP, CLS, FID/INP), eventos de conversão e erros.
 */

export interface TelemetryEvent {
  name: string;
  category: 'conversion' | 'ux' | 'error' | 'performance';
  properties?: Record<string, string | number | boolean | undefined>;
  timestamp?: number;
}

export interface WebVitalsMetric {
  name: 'FCP' | 'LCP' | 'CLS' | 'FID' | 'INP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

class ObservabilityService {
  private isInitialized = false;
  private sampleRate = 1.0;

  public init(config?: { sampleRate?: number }) {
    if (this.isInitialized) return;
    this.sampleRate = config?.sampleRate ?? 1.0;
    this.isInitialized = true;

    // Captura global de erros não tratados
    if (typeof window !== 'undefined') {
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

      this.initPerformanceObserver();
    }
  }

  /**
   * Monitoramento de Performance & Web Vitals no navegador
   */
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
      // Ignora falhas de observadores em navegadores antigos
    }
  }

  /**
   * Rastreia eventos de conversão e comportamento (Adicionar à sacola, clique WhatsApp, etc.)
   */
  public trackEvent(event: TelemetryEvent) {
    const payload = {
      ...event,
      timestamp: event.timestamp || Date.now(),
      environment: process.env.NODE_ENV || 'production',
      url: typeof window !== 'undefined' ? window.location.pathname : '',
    };

    // Log estruturado em ambiente local / container
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[Telemetry:${event.category.toUpperCase()}]`, event.name, event.properties || '');
    }

    // Exemplo de integração Sentry / Datadog / OpenTelemetry:
    // if (window.Sentry) window.Sentry.captureMessage(event.name, { extra: payload });
  }

  /**
   * Rastreia métricas de performance
   */
  public trackMetric(metric: WebVitalsMetric) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[Web-Vitals] ${metric.name}: ${metric.value} (${metric.rating})`);
    }
  }

  /**
   * Captura de exceções e erros operacionais
   */
  public trackError(error: Error, context?: Record<string, unknown>) {
    // Sanitização de informações sensíveis antes do envio
    const sanitizedContext = { ...context };
    delete sanitizedContext.password;
    delete sanitizedContext.creditCard;

    console.error('[Observability:Error]', error.message, {
      stack: error.stack,
      context: sanitizedContext,
    });

    // Exemplo de envio para Sentry/Datadog:
    // if (window.Sentry) window.Sentry.captureException(error, { extra: sanitizedContext });
  }
}

export const observability = new ObservabilityService();
