import test from 'node:test';
import assert from 'node:assert/strict';
import { securityService } from '../src/lib/security';

test('Segurança: sanitização de entrada e prevenção de XSS', () => {
  const dirtyInput = '<script>alert("hack")</script> Parabéns pelo seu dia! <b>Amor</b>';
  const clean = securityService.sanitizeInput(dirtyInput, 100);

  assert.ok(!clean.includes('<script>'), 'Tags de script devem ser removidas');
  assert.ok(!clean.includes('<b>'), 'Tags HTML devem ser removidas');
  assert.ok(clean.includes('Parabéns pelo seu dia! Amor'));
});

test('Segurança: corte de limite máximo de caracteres', () => {
  const longText = 'A'.repeat(500);
  const truncated = securityService.sanitizeInput(longText, 50);
  assert.equal(truncated.length, 50);
});

test('Segurança: validação de payload de pedido', () => {
  const emptyValidation = securityService.validateOrderPayload(0);
  assert.equal(emptyValidation.valid, false);

  const normalValidation = securityService.validateOrderPayload(3, 'Sem nozes, por favor');
  assert.equal(normalValidation.valid, true);

  const abuseValidation = securityService.validateOrderPayload(150);
  assert.equal(abuseValidation.valid, false);
});

test('Segurança: rate limiter contra spam de cliques repetidos', () => {
  const key = 'test-action-spam';
  
  // 3 chamadas rápidas permitidas
  assert.equal(securityService.checkRateLimit(key, 3, 2000).allowed, true);
  assert.equal(securityService.checkRateLimit(key, 3, 2000).allowed, true);
  assert.equal(securityService.checkRateLimit(key, 3, 2000).allowed, true);
  
  // 4ª chamada deve ser bloqueada
  const blocked = securityService.checkRateLimit(key, 3, 2000);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterMs! > 0);
});
