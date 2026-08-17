import React from 'react';
import { ProductItem } from '../types';
import { BUSINESS_INFO } from '../data/products';
import { X, MessageCircle, Plus, Check, Sparkles, Clock, Users, ShieldCheck } from 'lucide-react';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem) => void;
  isAdded: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isAdded,
}) => {
  if (!product) return null;

  const whatsappDirectUrl = `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
    `Olá! Gostaria de mais informações e encomendar o *${product.name}* (${product.priceFormatted}).`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-xs text-zinc-600 hover:text-zinc-950 border border-zinc-200/80 shadow-xs transition-colors cursor-pointer"
          aria-label="Fechar detalhes do produto"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Image Column */}
          <div className="md:col-span-6 relative aspect-4/3 md:aspect-auto bg-zinc-100 min-h-[260px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1E2024]/90 text-[10px] uppercase font-bold tracking-wider text-[#E5C9A6] border border-white/20">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details Column */}
          <div className="md:col-span-6 p-6 md:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-semibold text-[#B48250]">
                {product.categoryLabel}
              </span>
              
              <h3 className="font-serif text-2xl text-zinc-900 font-normal leading-snug">
                {product.name}
              </h3>

              <p className="text-xs text-zinc-600 font-light leading-relaxed">
                {product.longDescription || product.description}
              </p>

              {/* Flavor Profile */}
              <div className="pt-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 block mb-1.5">
                  Notas de Sabor & Destaques:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.flavorHighlights.map((flavor, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#FAFAF8] border border-zinc-200 px-2.5 py-1 rounded-md text-zinc-700 font-normal"
                    >
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>

              {/* Servings & Prep Info */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-zinc-600">
                {product.servings && (
                  <div className="flex items-center gap-1.5 bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                    <Users className="w-3.5 h-3.5 text-[#C49A6C]" />
                    <span className="text-[11px]">{product.servings}</span>
                  </div>
                )}
                {product.prepTime && (
                  <div className="flex items-center gap-1.5 bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                    <Clock className="w-3.5 h-3.5 text-[#C49A6C]" />
                    <span className="text-[11px]">{product.prepTime}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price & Actions */}
            <div className="pt-4 border-t border-zinc-100 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-zinc-400 font-light">Valor por {product.unit}:</span>
                <span className="font-serif text-xl font-medium text-zinc-900">
                  {product.priceFormatted}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => onAddToCart(product)}
                  className={`flex items-center justify-center gap-1.5 py-3 px-3 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white border border-zinc-300 text-zinc-800 hover:bg-zinc-50'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Adicionado!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-[#B48250]" />
                      <span>Adicionar ao Pedido</span>
                    </>
                  )}
                </button>

                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-full bg-[#1E2024] hover:bg-zinc-800 text-white text-xs font-medium transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#C49A6C]" />
                  <span>Pedir no WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
