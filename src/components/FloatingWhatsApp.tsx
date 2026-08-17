import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_INFO } from '../data/products';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Small notification bubble with smooth entrance/exit */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md border border-zinc-200/90 py-1.5 px-3.5 rounded-full shadow-md text-xs text-zinc-800"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-zinc-700">
              Atendimento Online • Capão Bonito
            </span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-zinc-400 hover:text-zinc-700 p-0.5 cursor-pointer ml-1"
              aria-label="Fechar balão"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Floating Action Button */}
      <motion.a
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.94 }}
        href={
          BUSINESS_INFO.whatsappBaseUrl +
          '?text=' +
          encodeURIComponent(BUSINESS_INFO.defaultWhatsappMessage)
        }
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 bg-[#1E2024] hover:bg-zinc-800 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-700/50 cursor-pointer"
        aria-label="Conversar no WhatsApp da Maurevite"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-[#C49A6C]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#1E2024]" />
        </div>
        <span className="hidden sm:inline text-xs font-medium tracking-wide">
          Pedir no WhatsApp
        </span>
      </motion.a>
    </div>
  );
};
