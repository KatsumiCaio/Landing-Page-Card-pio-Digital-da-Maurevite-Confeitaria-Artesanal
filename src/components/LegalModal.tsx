import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, CheckCircle2, Lock, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#FAFAF8] rounded-3xl border border-zinc-200/90 shadow-2xl overflow-hidden flex flex-col max-h-[88vh] z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-[#B48250]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-zinc-900 font-normal">
                    Termos de Uso & Política de Privacidade
                  </h3>
                  <span className="text-[11px] text-zinc-500 font-light">
                    Maurevite Confeitaria Artesanal • Capão Bonito - SP
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                aria-label="Fechar termos"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-zinc-700 font-light leading-relaxed">
              
              {/* Section 1 */}
              <div className="space-y-2">
                <h4 className="text-sm font-serif font-medium text-zinc-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#B48250]" />
                  1. Natureza do Serviço e Encomendas Artesanais
                </h4>
                <p>
                  A <strong>Maurevite Confeitaria Artesanal</strong> é um ateliê gastronômico dedicado à produção manual sob encomenda de bolos comemorativos, doces finos, cones trufados e sobremesas em Capão Bonito - SP.
                </p>
                <p>
                  Todos os itens são produzidos com matérias-primas frescas e selecionadas. Os prazos de produção variam conforme a complexidade do pedido (mínimo de 24h a 48h para bolos artísticos).
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-2">
                <h4 className="text-sm font-serif font-medium text-zinc-900 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#B48250]" />
                  2. Proteção de Dados e Privacidade (LGPD)
                </h4>
                <p>
                  Respeitamos integralmente a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). As informações fornecidas durante a montagem do pedido (nome, endereço para entrega, telefone e dedicatória) são utilizadas <strong>exclusivamente para a formalização e atendimento da encomenda</strong> via WhatsApp.
                </p>
                <p>
                  Não compartilhamos, vendemos ou transferimos dados de clientes para quaisquer terceiros ou ferramentas externas de marketing não solicitadas.
                </p>
              </div>

              {/* Section 3 */}
              <div className="space-y-2">
                <h4 className="text-sm font-serif font-medium text-zinc-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B48250]" />
                  3. Confirmação, Pagamento e Política de Cancelamento
                </h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>
                    <strong>Sinal de Confirmação:</strong> Encomendas de bolos personalizados são confirmadas mediante sinal de 50% do valor orçado.
                  </li>
                  <li>
                    <strong>Cancelamentos:</strong> Por se tratarem de produtos perecíveis e personalizados, cancelamentos devem ser comunicados com no mínimo 48h de antecedência para reembolso integral do sinal.
                  </li>
                  <li>
                    <strong>Retirada & Entrega:</strong> A retirada deve ocorrer no horário previamente combinado no ateliê. Em caso de entrega local em Capão Bonito, é necessária a presença de um responsável no local.
                  </li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="space-y-2">
                <h4 className="text-sm font-serif font-medium text-zinc-900 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-[#B48250]" />
                  4. Atendimento e Contato Oficial
                </h4>
                <p>
                  Para quaisquer dúvidas, alterações ou esclarecimentos adicionais, entre em contato direto pelo WhatsApp oficial <strong>{BUSINESS_INFO.phoneDisplay}</strong> ou presencialmente em nosso ateliê em Capão Bonito - SP.
                </p>
              </div>

            </div>

            {/* Footer with Close Button */}
            <div className="p-4 border-t border-zinc-200 bg-white flex items-center justify-between">
              <span className="text-[11px] text-zinc-500 font-light">
                Última atualização: {new Date().getFullYear()}
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#1E2024] hover:bg-zinc-800 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Entendi e Concordo
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
