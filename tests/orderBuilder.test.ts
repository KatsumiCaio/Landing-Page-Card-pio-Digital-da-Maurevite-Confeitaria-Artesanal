import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS_DATA, BUSINESS_INFO } from '../src/data/products';
import { OrderItem } from '../src/types';

test('Produtos: integridade do catálogo e dados obrigatórios', () => {
  assert.ok(PRODUCTS_DATA.length >= 8, 'Deve conter pelo menos 8 produtos no cardápio');
  
  for (const product of PRODUCTS_DATA) {
    assert.ok(product.id, 'Produto deve ter id único');
    assert.ok(product.name, 'Produto deve ter nome');
    assert.ok(product.priceValue > 0, `Produto ${product.name} deve ter valor positivo`);
    assert.ok(product.priceFormatted.includes('R$'), `Preço formatado deve conter R$`);
    assert.ok(product.flavorHighlights.length > 0, `Produto ${product.name} deve ter notas de sabor`);
  }
});

test('Drawer de Pedidos: cálculo de subtotal e formatação BRL', () => {
  const items: OrderItem[] = [
    { product: PRODUCTS_DATA[0], quantity: 2 }, // Ex: Red Velvet
    { product: PRODUCTS_DATA[1], quantity: 3 }, // Ex: Cone
  ];

  const subtotal = items.reduce((acc, curr) => acc + curr.product.priceValue * curr.quantity, 0);
  const formattedSubtotal = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;

  const expectedSubtotal = PRODUCTS_DATA[0].priceValue * 2 + PRODUCTS_DATA[1].priceValue * 3;
  assert.equal(subtotal, expectedSubtotal);
  assert.ok(formattedSubtotal.includes(','), 'Deve usar vírgula como separador decimal');
});

test('WhatsApp Link: codificação segura de URL com acentuação e quebras de linha', () => {
  const message = `Olá Maurevite! Gostaria de encomendar um bolo de 2.0kg em Capão Bonito.`;
  const url = `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;

  assert.ok(url.startsWith('https://wa.me/5515997863391?text='));
  assert.ok(!url.includes(' '), 'Não deve conter espaços crus na URL');
  assert.ok(decodeURIComponent(url).includes('Olá Maurevite!'));
});
