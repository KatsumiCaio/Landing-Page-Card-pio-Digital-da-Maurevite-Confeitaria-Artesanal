import React, { useState } from 'react';
import { OrderItem } from '../types';
import { BUSINESS_INFO } from '../data/products';
import { X, Trash2, Plus, Minus, MessageCircle, Calendar, MapPin, Sparkles, ShoppingBag } from 'lucide-react';

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

  if (!isOpen) return null;

  const totalEstimate = items.reduce((acc, curr) => acc + curr.product.priceValue * curr.quantity, 0);

  const generateWhatsAppUrl = () => {
    let text = `*NOVA ENCOMENDA - MAUREVITE CONFEITARIA*\n\n`;

    if (customerName.trim()) {
      text += `*Cliente:* ${customerName.trim()}\n`;
    }

    text += `*Modalidade:* ${deliveryType === 'retirada' ? 'Retirada no Ateliê (Capão Bonito)' : 'Entrega por Delivery em Capão Bonito - SP'}\n`;
    
    if (deliveryDate) {
      text += `*Data Desejada:* ${deliveryDate}\n`;
    }

    text += `\n*ITENS SELECIONADOS:*\n`;
    items.forEach((item, idx) => {
      text += `${idx + 1}. ${item.quantity}x *${item.product.name}* (${item.product.priceFormatted})\n`;
    });

    text += `\n*Estimativa Total:* R$ ${totalEstimate.toFixed(2).replace('.', ',')}\n`;

    if (customerNotes.trim()) {
      text += `\n*Observações / Personalização:* ${customerNotes.trim()}\n`;
    }

    text += `\n_Gostaria de confirmar a disponibilidade e os detalhes para pagamento!_`;

    return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-zinc-950/60 backdrop-blur-xs flex justify-end transition-opacity">
      <div
        className="w-full max-w-md bg-[#FAFAF8] h-full shadow-2xl flex flex-col border-l border-zinc-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="p-5 bg-white border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1E2024] text-[#C49A6C] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-zinc-900 font-normal">Meu Pedido</h3>
              <p className="text-[11px] text-zinc-500 font-light">Maurevite Confeitaria Artesanal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Fechar resumo do pedido"
          >
            <X className="w-5 h-5" />
          </button>
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
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#1E2024] text-white text-xs font-medium hover:bg-zinc-800 cursor-pointer"
              >
                Voltar ao Cardápio
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
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

                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 bg-white rounded-xl border border-zinc-200/90 flex gap-3 items-center shadow-2xs"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-lg object-cover bg-zinc-100 shrink-0 border border-zinc-100"
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

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="p-1 hover:bg-zinc-200 rounded-sm text-zinc-700 transition-colors cursor-pointer"
                        aria-label="Diminuir quantidade"
                      >
                        {item.quantity === 1 ? (
                          <Trash2 className="w-3 h-3 text-red-500" />
                        ) : (
                          <Minus className="w-3 h-3" />
                        )}
                      </button>
                      <span className="text-xs font-semibold text-zinc-900 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="p-1 hover:bg-zinc-200 rounded-sm text-zinc-700 transition-colors cursor-pointer"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery & Date Preferences */}
              <div className="space-y-4 pt-2 border-t border-zinc-200">
                <span className="text-xs font-semibold text-zinc-800 uppercase tracking-wider block">
                  Informações de Entrega
                </span>

                {/* Delivery Option Toggle */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('retirada')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      deliveryType === 'retirada'
                        ? 'border-zinc-900 bg-white shadow-xs text-zinc-900'
                        : 'border-zinc-200 bg-zinc-50/50 text-zinc-600'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C49A6C]" />
                      <span className="text-xs font-semibold">Retirada no Ateliê</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 font-light">Capão Bonito (Sem taxa)</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('entrega')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      deliveryType === 'entrega'
                        ? 'border-zinc-900 bg-white shadow-xs text-zinc-900'
                        : 'border-zinc-200 bg-zinc-50/50 text-zinc-600'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#C49A6C]" />
                      <span className="text-xs font-semibold">Entrega / Delivery</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 font-light">Em Capão Bonito - SP</p>
                  </button>
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
                    className="w-full px-3 py-2 text-xs bg-white border border-zinc-300 rounded-lg text-zinc-800 focus:outline-hidden focus:border-zinc-600"
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
                    className="w-full px-3 py-2 text-xs bg-white border border-zinc-300 rounded-lg text-zinc-800 focus:outline-hidden focus:border-zinc-600"
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
                    className="w-full px-3 py-2 text-xs bg-white border border-zinc-300 rounded-lg text-zinc-800 focus:outline-hidden focus:border-zinc-600 resize-none"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-zinc-200 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-zinc-500 font-light">Estimativa dos Itens:</span>
              <span className="font-serif text-xl font-medium text-zinc-900">
                R$ {totalEstimate.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#1E2024] hover:bg-zinc-800 text-white rounded-full text-xs font-medium tracking-wide transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#C49A6C]" />
              <span>Enviar Pedido via WhatsApp</span>
            </a>

            <p className="text-center text-[10px] text-zinc-400 font-light">
              Você será direcionado para o WhatsApp da Maurevite ({BUSINESS_INFO.phoneDisplay}) com a mensagem pronta.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
