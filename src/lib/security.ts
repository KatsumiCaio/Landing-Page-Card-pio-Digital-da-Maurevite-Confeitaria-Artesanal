/**
 * Módulo de Segurança, Sanitização & Rate Limiting — Maurevite Confeitaria Artesanal
 */

export interface RateLimitResult {
  allowed: boolean;
  retryAfterMs?: number;
  message?: string;
}

class ClientSecurityService {
  private actionTimestamps: Map<string, number[]> = new Map();

  /**
   * Sanitiza entradas de texto para evitar XSS e injeção em mensagens estruturadas
   */
  public sanitizeInput(input: string, maxLength: number = 250): string {
    if (!input || typeof input !== 'string') return '';

    return input
      .trim()
      // Remove tags HTML
      .replace(/<[^>]*>?/gm, '')
      // Remove caracteres de controle perigosos
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
      // Limita tamanho
      .slice(0, maxLength);
  }

  /**
   * Limita disparos repetidos de ações críticas (Ex: envio de WhatsApp, adicionar em massa)
   */
  public checkRateLimit(
    actionKey: string,
    limit: number = 5,
    windowMs: number = 10000
  ): RateLimitResult {
    const now = Date.now();
    const timestamps = this.actionTimestamps.get(actionKey) || [];

    // Filtra timestamps fora da janela
    const recent = timestamps.filter((time) => now - time < windowMs);

    if (recent.length >= limit) {
      const oldest = recent[0];
      const retryAfterMs = Math.max(0, windowMs - (now - oldest));
      return {
        allowed: false,
        retryAfterMs,
        message: `Por favor, aguarde alguns segundos antes de tentar novamente.`,
      };
    }

    recent.push(now);
    this.actionTimestamps.set(actionKey, recent);

    return { allowed: true };
  }

  /**
   * Validação de payload de pedido antes de compor o link de WhatsApp
   */
  public validateOrderPayload(itemsCount: number, customNotes?: string): { valid: boolean; error?: string } {
    if (itemsCount <= 0) {
      return { valid: false, error: 'A sacola de pedidos está vazia.' };
    }
    if (itemsCount > 100) {
      return { valid: false, error: 'Quantidade de itens excede o limite por pedido digital.' };
    }
    if (customNotes && customNotes.length > 500) {
      return { valid: false, error: 'As observações excedem o limite de 500 caracteres.' };
    }
    return { valid: true };
  }
}

export const securityService = new ClientSecurityService();
