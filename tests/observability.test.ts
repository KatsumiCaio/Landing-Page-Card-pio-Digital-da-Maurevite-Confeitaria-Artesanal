import test from 'node:test';
import assert from 'node:assert/strict';
import { observability } from '../src/lib/observability';

test('Observabilidade: inicialização idempotente e sem falhas em runtime', () => {
  assert.doesNotThrow(() => {
    observability.init({ sampleRate: 1.0 });
    observability.init(); // segunda chamada não deve quebrar
  });
});

test('Observabilidade: rastreamento de eventos genéricos e métricas Web Vitals', () => {
  assert.doesNotThrow(() => {
    observability.trackEvent({
      name: 'test_navigation_interaction',
      category: 'ux',
      properties: { section: 'cardapio', device: 'desktop' },
    });

    observability.trackMetric({
      name: 'LCP',
      value: 1200,
      rating: 'good',
    });
  });
});

test('Observabilidade: rastreamento de passos do funil de conversão e cálculo de taxa', () => {
  // Simula passos do funil
  observability.trackConversionStep('catalog_view', { category: 'bolos' });
  observability.trackConversionStep('product_detail_view', { productId: 'bolo-red-velvet' });
  observability.trackConversionStep('cake_calculator_use', { guestCount: 25 });
  observability.trackConversionStep('add_to_bag', { productId: 'bolo-red-velvet', quantity: 1 });
  observability.trackConversionStep('open_order_drawer', { itemsCount: 1 });

  // Simula conversão final via WhatsApp
  observability.trackWhatsAppCheckout({
    itemsCount: 1,
    totalValue: 128.0,
    deliveryType: 'retirada',
    productsList: ['1x Red Velvet Clássico'],
    hasDeliveryDate: true,
    hasCustomNotes: false,
  });

  const metrics = observability.getFunnelMetrics();

  assert.ok(metrics.catalogViews >= 1, 'Deve ter contabilizado visualização de catálogo');
  assert.ok(metrics.productViews >= 1, 'Deve ter contabilizado visualização de produto');
  assert.ok(metrics.calculatorInteractions >= 1, 'Deve ter contabilizado uso da calculadora');
  assert.ok(metrics.whatsappCheckouts >= 1, 'Deve ter contabilizado conversão WhatsApp');
  assert.ok(metrics.totalEstimatedRevenue >= 128.0, 'Receita estimada deve ser somada');
  assert.ok(metrics.conversionRatePercent > 0, 'Taxa de conversão deve ser positiva');
});

test('Observabilidade: captura de erros com sanitização de campos confidenciais', () => {
  const error = new Error('Falha simulada de rede');
  const sensitiveContext = {
    userId: '123',
    password: 'secret_password_123',
    creditCard: '4111222233334444',
  };

  assert.doesNotThrow(() => {
    observability.trackError(error, sensitiveContext);
  });
});

test('Observabilidade: ações da sacola (adição, alteração, remoção)', () => {
  assert.doesNotThrow(() => {
    observability.trackCartAction('add', {
      id: 'cone-ninho-nutella',
      name: 'Cone Trufado Ninho',
      price: 16.0,
      quantity: 2,
    });

    observability.trackCartAction('quantity_change', {
      id: 'cone-ninho-nutella',
      name: 'Cone Trufado Ninho',
      price: 16.0,
      quantity: 3,
    });

    observability.trackCartAction('remove', {
      id: 'cone-ninho-nutella',
      name: 'Cone Trufado Ninho',
      price: 16.0,
      quantity: 0,
    });

    observability.trackCartAction('clear');
  });
});
