import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { ProductItem } from '../types';

interface ToastFeedbackProps {
  product: ProductItem | null;
  onOpenOrderDrawer: () => void;
  onDismiss: () => void;
}

export const ToastFeedback: React.FC<ToastFeedbackProps> = ({
  product,
  onOpenOrderDrawer,
  onDismiss,
}) => {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 26,
          }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md pointer-events-auto"
          role="status"
          aria-live="polite"
        >
          <div className="bg-[#1E2024]/95 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl border border-zinc-700/80 flex items-center justify-between gap-3">
            
            {/* Left: Icon & Product Text */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">
                  Adicionado ao pedido
                </p>
                <p className="text-xs font-serif text-zinc-100 truncate font-normal">
                  {product.name}
                </p>
              </div>
            </div>

            {/* Right: Action Button */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  onDismiss();
                  onOpenOrderDrawer();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C49A6C] hover:bg-[#b58b5e] text-zinc-950 rounded-full text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Ver Sacola</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
