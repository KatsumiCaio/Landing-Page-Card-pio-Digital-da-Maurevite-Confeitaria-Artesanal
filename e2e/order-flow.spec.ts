import { test, expect } from '@playwright/test';

test.describe('Fluxo Principal de Conversão — Maurevite Confeitaria', () => {
  test('deve carregar a página inicial com Hero e título da Confeitaria', async ({ page }) => {
    await page.goto('/');
    
    // Verifica título principal da confeitaria
    await expect(page.locator('h1')).toContainText('Confeitaria Artesanal');
    
    // Verifica presença da vitrine de produtos e calculadoras
    await expect(page.locator('#cardapio')).toBeVisible();
    await expect(page.locator('#calculadora')).toBeVisible();
  });

  test('deve permitir interagir com a calculadora de bolo', async ({ page }) => {
    await page.goto('/');
    
    // Localiza e ajusta o slider de pessoas
    const slider = page.locator('input[type="range"]');
    if (await slider.isVisible()) {
      await slider.fill('25');
      // Deve recomendar peso e aro correspondente
      await expect(page.locator('#calculadora')).toContainText('2.8');
    }
  });

  test('deve abrir o modal de Termos de Uso & Privacidade', async ({ page }) => {
    await page.goto('/');
    
    // Clica no link de termos do rodapé
    const termsBtn = page.getByRole('button', { name: /Termos/i }).first();
    if (await termsBtn.isVisible()) {
      await termsBtn.click();
      await expect(page.getByText('Termos de Uso & Política de Privacidade')).toBeVisible();
    }
  });
});
