import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OrderItem } from '../types';
import { BUSINESS_INFO } from '../data/products';
import { observability } from '../lib/observability';
import { securityService } from '../lib/security';
import { X, Trash2, Plus, Minus, MessageCircle, Calendar, MapPin, Sparkles, ShoppingBag, Loader2, AlertCircle } from 'lucide-react';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearOrder: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
}) => {
  const [deliveryType, setDeliveryType] = useState<'retirada' | 'entrega'>('retirada');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rateLimitWarning, setRateLimitWarning] = useState<string | null>(null);

  const totalEstimate = items.reduce((acc, curr) => acc + curr.product.priceValue * curr.quantity, 0);

  const handleSendWhatsAppOrder = () => {
    // 1. Rate Limit & Anti-Spam Check
    const rateCheck = securityService.checkRateLimit('whatsapp_checkout_action', 4, 8000);
    if (!rateCheck.allowed) {
      setRateLimitWarning(rateCheck.message || 'Por favor, aguarde alguns segundos antes de reenviar.');
      return;
    }
    setRateLimitWarning(null);

    // 2. Sanitização de entradas
    const cleanName = securityService.sanitizeInput(customerName, 80);
    const cleanDate = securityService.sanitizeInput(deliveryDate, 30);
    const cleanNotes = securityService.sanitizeInput(customerNotes, 400);

    setIsSubmitting(true);

    let text = `*NOVA ENCOMENDA - MAUREVITE CONFEITARIA*\n\n`;

    if (cleanName) {
      text += `*Cliente:* ${cleanName}\n`;
    }

    text += `*Modalidade:* ${
      deliveryType === 'retirada'
        ? 'Retirada no Ateliê (Capão Bonito)'
        : 'Entrega por Delivery em Capão Bonito - SP'
    }\n`;

    if (cleanDate) {
      text += `*Data Desejada:* ${cleanDate}\n`;
    }

    text += `\n*ITENS SELECIONADOS:*\n`;
    items.forEach((item, idx) => {
      text += `${idx + 1}. ${item.quantity}x *${item.product.name}* (${item.product.priceFormatted})\n`;
    });

    text += `\n*Estimativa Total:* R$ ${totalEstimate.toFixed(2).replace('.', ',')}\n`;

    if (cleanNotes) {
      text += `\n*Observações / Personalização:* ${cleanNotes}\n`;
    }

    text += `\n_Gostaria de confirmar a disponibilidade e os detalhes para pagamento!_`;

    // 3. Telemetria de Conversão do Funil
    observability.trackWhatsAppCheckout({
      itemsCount: items.reduce((acc, curr) => acc + curr.quantity, 0),
      totalValue: totalEstimate,
      deliveryType,
      productsList: items.map((i) => `${i.quantity}x ${i.product.name}`),
      hasDeliveryDate: Boolean(cleanDate),
      hasCustomNotes: Boolean(cleanNotes),
    });

    const url = `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 450);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Slide-in Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="relative w-full max-w-md bg-[#FAFAF8] h-full shadow-2xl flex flex-col border-l border-zinc-200/90 z-10 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
          >
            {/* Drawer Header */}
            <div className="p-5 bg-white border-b border-zinc-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#1E2024] text-[#C49A6C] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="drawer-title" className="font-serif text-lg text-zinc-900 font-normal">
                    Meu Pedido
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-light">Maurevite Confeitaria Artesanal</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-700 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="Fechar resumo do pedido"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 mx-auto flex items-center justify-center text-zinc-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="font-serif text-lg text-zinc-800">Sua lista de pedido está vazia</p>
                  <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                    Explore nosso cardápio e adicione os bolos, cones e fatias desejados para enviar tudo pronto ao WhatsApp.
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="mt-2 px-5 py-2.5 rounded-full bg-[#1E2024] text-white text-xs font-medium hover:bg-zinc-800 cursor-pointer"
                  >
                    Voltar ao Cardápio
                  </motion.button>
                </div>
              ) : (
                <>
                  {/* Items List with Layout Animations */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-xs font-semibold text-zinc-800 uppercase tracking-wider">
                        Itens Adicionados ({items.reduce((acc, i) => acc + i.quantity, 0)})
                      </span>
                      <button
                        onClick={onClearOrder}
                        className="text-xs text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        Limpar lista
                      </button>
                    </div>

                    <AnimatePresence mode="popLayout">
                      {items.map((item) => (
                        <motion.div
                          layout
                          key={item.product.id}
                          initial={{ opacity: 0, y: 12, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          className="p-3.5 bg-white rounded-2xl border border-zinc-200/90 flex gap-3 items-center shadow-2xs"
                        >
                          <ImageWithSkeleton
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-14 h-14 rounded-xl object-cover"
                            containerClassName="w-14 h-14 rounded-xl shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-medium text-zinc-900 truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-[11px] text-zinc-500 font-light">
                              {item.product.priceFormatted}
                            </p>
                            <span className="text-[10px] text-[#B48250] font-medium">
                              Subtotal: R$ {(item.product.priceValue * item.quantity).toFixed(2).replace('.', ',')}
                            </span>
                          </div>

                          {/* Quantity Controls with Emil Kowalski snappy feedback */}
                          <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 rounded-lg p-1">
                            <motion.button
                              whileTap={{ scale: 0.82 }}
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="p-1 hover:bg-zinc-200 rounded-sm text-zinc-700 transition-colors cursor-pointer"
                              aria-label="Diminuir quantidade"
                            >
                              {item.quantity === 1 ? (
                                <Trash2 className="w-3 h-3 text-red-500" />
                              ) : (
                                <Minus className="w-3 h-3" />
                              )}
                            </motion.button>
                            
                            <motion.span
                              key={item.quantity}
                              initial={{ scale: 1.25, color: '#C49A6C' }}
                              animate={{ scale: 1, color: '#18181b' }}
                              transition={{ duration: 0.18 }}
                              className="text-xs font-semibold w-4 text-center select-none"
                            >
                              {item.quantity}
                            </motion.span>

                            <motion.button
                              whileTap={{ scale: 0.82 }}
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="p-1 hover:bg-zinc-200 rounded-sm text-zinc-700 transition-colors cursor-pointer"
                              aria-label="Aumentar quantidade"
                            >
                              <Plus className="w-3 h-3" />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Delivery & Date Preferences */}
                  <div className="space-y-4 pt-2 border-t border-zinc-200">
                    <span className="text-xs font-semibold text-zinc-800 uppercase tracking-wider block">
                      Informações de Entrega
                    </span>

                    {/* Delivery Option Toggle */}
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        onClick={() => setDeliveryType('retirada')}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          deliveryType === 'retirada'
                            ? 'border-zinc-900 bg-white shadow-xs text-zinc-900 ring-1 ring-zinc-900/10'
                            : 'border-zinc-200 bg-zinc-50/50 text-zinc-600 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <MapPin className="w-3.5 h-3.5 text-[#C49A6C]" />
                          <span className="text-xs font-semibold">Retirada no Ateliê</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-light">Capão Bonito (Sem taxa)</p>
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        type="button"
                        onClick={() => setDeliveryType('entrega')}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          deliveryType === 'entrega'
                            ? 'border-zinc-900 bg-white shadow-xs text-zinc-900 ring-1 ring-zinc-900/10'
                            : 'border-zinc-200 bg-zinc-50/50 text-zinc-600 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-[#C49A6C]" />
                          <span className="text-xs font-semibold">Entrega / Delivery</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-light">Em Capão Bonito - SP</p>
                      </motion.button>
                    </div>

                    {/* Name field */}
                    <div>
                      <label className="text-[11px] font-medium text-zinc-700 block mb-1">
                        Seu Nome (opcional):
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ex: Mariana Silva"
                        className="w-full px-3 py-2 text-xs bg-white border border-zinc-300 rounded-xl text-zinc-800 focus:outline-hidden focus:border-zinc-600 transition-colors"
                      />
                    </div>

                    {/* Desired Date */}
                    <div>
                      <label className="text-[11px] font-medium text-zinc-700 block mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C49A6C]" />
                        Data ou Prazo Desejado:
                      </label>
                      <input
                        type="text"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        placeholder="Ex: Sábado às 16h / Imediato no delivery"
                        className="w-full px-3 py-2 text-xs bg-white border border-zinc-300 rounded-xl text-zinc-800 focus:outline-hidden focus:border-zinc-600 transition-colors"
                      />
                    </div>

                    {/* Notes & Customizations */}
                    <div>
                      <label className="text-[11px] font-medium text-zinc-700 block mb-1">
                        Observações ou Personalizações:
                      </label>
                      <textarea
                        rows={2}
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        placeholder="Ex: Escrita na placa do bolo, preferência de laço, sem nozes..."
                        className="w-full px-3 py-2 text-xs bg-white border border-zinc-300 rounded-xl text-zinc-800 focus:outline-hidden focus:border-zinc-600 resize-none transition-colors"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer */}
            {items.length > 0 && (
              <div className="p-5 bg-white border-t border-zinc-200/90 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-zinc-500 font-light">Estimativa dos Itens:</span>
                  <motion.span
                    key={totalEstimate}
                    initial={{ opacity: 0.6, y: -2 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-serif text-xl font-medium text-zinc-900"
                  >
                    R$ {totalEstimate.toFixed(2).replace('.', ',')}
                  </motion.span>
                </div>

                {rateLimitWarning && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-2 text-xs text-amber-800">
                    <AlertCircle className="w-4 h-4 text-[#B48250] shrink-0" />
                    <span>{rateLimitWarning}</span>
                  </div>
                )}

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={handleSendWhatsAppOrder}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#1E2024] hover:bg-zinc-800 disabled:bg-zinc-600 text-white rounded-full text-xs font-medium tracking-wide transition-all shadow-sm cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 text-[#C49A6C] animate-spin" />
                      <span>Preparando mensagem...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 text-[#C49A6C]" />
                      <span>Enviar Pedido via WhatsApp</span>
                    </>
                  )}
                </motion.button>

                <p className="text-center text-[10px] text-zinc-400 font-light">
                  Você será direcionado para o WhatsApp da Maurevite ({BUSINESS_INFO.phoneDisplay}) com a mensagem pronta.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
