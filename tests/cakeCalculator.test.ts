import test from 'node:test';
import assert from 'node:assert/strict';

/**
 * Testes Unitários de Regras de Negócio — Calculadora de Rendimento de Bolo
 * Padrão Maurevite: ~100g a 110g por pessoa, mínimo de 1.0kg, aro proporcional.
 */

function calculateCakeSpecs(people: number) {
  // ~110g por convidado
  const rawWeight = people * 0.11;
  const weightKg = Math.max(1.0, Math.round(rawWeight * 10) / 10);
  
  // Sugestão de aro
  let panSize = '15cm de diâmetro (Mini / P)';
  let docinhosSugestao = '20 a 30 brigadeiros de apoio';

  if (people <= 10) {
    panSize = '15cm de diâmetro (Aro P)';
    docinhosSugestao = '15 a 25 brigadeiros';
  } else if (people <= 20) {
    panSize = '20cm de diâmetro (Aro M)';
    docinhosSugestao = '30 a 45 brigadeiros';
  } else if (people <= 35) {
    panSize = '25cm de diâmetro (Aro G)';
    docinhosSugestao = '50 a 80 brigadeiros';
  } else {
    panSize = 'Bolo de 2 Andares (25cm + 15cm)';
    docinhosSugestao = '90 a 140 brigadeiros';
  }

  return {
    weightKg,
    panSize,
    docinhosSugestao,
  };
}

test('Calculadora de Bolo: evento pequeno (8 pessoas)', () => {
  const result = calculateCakeSpecs(8);
  assert.equal(result.weightKg, 1.0, 'Deve ter piso mínimo de 1.0kg');
  assert.match(result.panSize, /15cm/, 'Aro P para até 10 pessoas');
});

test('Calculadora de Bolo: festa média (20 pessoas)', () => {
  const result = calculateCakeSpecs(20);
  assert.equal(result.weightKg, 2.2, '20 pessoas * 0.11kg = 2.2kg');
  assert.match(result.panSize, /20cm/, 'Aro M para 20 pessoas');
  assert.equal(result.docinhosSugestao, '30 a 45 brigadeiros');
});

test('Calculadora de Bolo: grande celebração (50 pessoas)', () => {
  const result = calculateCakeSpecs(50);
  assert.equal(result.weightKg, 5.5, '50 pessoas * 0.11kg = 5.5kg');
  assert.match(result.panSize, /2 Andares/, 'Bolo de 2 andares para grandes festas');
});
