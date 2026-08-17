import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductItem } from '../types';
import { PRODUCTS_DATA, BUSINESS_INFO } from '../data/products';
import { Search, Sparkles, MessageCircle, Plus, Eye, Check } from 'lucide-react';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface MenuSectionProps {
  selectedCategory: 'todos' | 'bolos' | 'cones' | 'fatias' | 'doces';
  onCategoryChange: (cat: 'todos' | 'bolos' | 'cones' | 'fatias' | 'doces') => void;
  onOpenProductModal: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  addedProductId: string | null;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  selectedCategory,
  onCategoryChange,
  onOpenProductModal,
  onAddToCart,
  addedProductId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'todos', label: 'Todos os Itens' },
    { id: 'bolos', label: 'Bolos Comemorativos' },
    { id: 'cones', label: 'Cones Trufados' },
    { id: 'fatias', label: 'Fatias & Sobremesas' },
    { id: 'doces', label: 'Doces & Presentes' },
  ] as const;

  const filteredProducts = PRODUCTS_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.flavorHighlights.some((flavor) =>
        flavor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="cardapio" className="py-16 md:py-24 bg-white border-t border-b border-zinc-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-sans tracking-[0.25em] uppercase font-semibold text-[#B48250]">
            Cardápio Selecionado
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-zinc-900">
            Nossas Criações Artesanais
          </h2>
          <p className="text-sm text-zinc-600 font-light leading-relaxed">
            Feito à mão sob encomenda ou pronta-entrega diária em Capão Bonito. Escolha os itens para montar seu pedido direto no WhatsApp.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Pills with Layout Animated Indicator */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none relative">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-colors cursor-pointer select-none ${
                    isActive ? 'text-white' : 'text-zinc-700 hover:text-zinc-950 bg-[#FAFAF8] border border-zinc-200/80 hover:bg-zinc-100'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="categoryActivePill"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-[#1E2024] rounded-full shadow-xs -z-10"
                    />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input with smooth focus */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar sabor ou item..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAFAF8] border border-zinc-200/90 rounded-full focus:outline-hidden focus:border-zinc-500 focus:bg-white transition-all text-zinc-800 placeholder:text-zinc-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                Limpar
              </button>
            )}
          </div>

        </div>

        {/* Products Grid with Smooth Transitions */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-[#FAFAF8] rounded-3xl border border-zinc-200/80 p-8"
          >
            <p className="font-serif text-lg text-zinc-800">Nenhuma criação encontrada para "{searchQuery}"</p>
            <p className="text-xs text-zinc-500 mt-1">Tente buscar por "cacau", "ninho", "cone", "bolo" ou limpe os filtros.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                onCategoryChange('todos');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium bg-[#1E2024] text-white rounded-full hover:bg-zinc-800 cursor-pointer transition-colors"
            >
              Ver Cardápio Completo
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const isAddedJustNow = addedProductId === product.id;
                const whatsappOrderUrl = `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
                  `Olá! Gostaria de encomendar: *${product.name}* (${product.priceFormatted}). Poderia me informar a disponibilidade?`
                )}`;

                return (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.28,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="group rounded-3xl border border-zinc-200/90 bg-[#FAFAF8] overflow-hidden flex flex-col justify-between hover:border-zinc-400/80 hover:shadow-xs transition-all duration-300"
                  >
                    {/* Card Header & Image with Skeleton */}
                    <div className="relative">
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-zinc-100">
                        <ImageWithSkeleton
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                          containerClassName="w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                      </div>

                      {/* Category / Badge Tags */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                        {product.badge && (
                          <span className="px-2.5 py-1 rounded-full bg-[#1E2024]/90 backdrop-blur-xs text-[10px] uppercase font-bold tracking-wider text-[#E5C9A6] border border-white/20">
                            {product.badge}
                          </span>
                        )}
                        <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-medium tracking-wide text-zinc-800 border border-zinc-200/50">
                          {product.categoryLabel}
                        </span>
                      </div>

                      {/* Quick view button */}
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onOpenProductModal(product)}
                        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-xs text-zinc-700 hover:text-zinc-950 hover:bg-white shadow-xs transition-all cursor-pointer"
                        title="Ver detalhes e ingredientes"
                        aria-label={`Ver detalhes de ${product.name}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="font-serif text-lg text-zinc-900 font-normal leading-snug group-hover:text-[#B48250] transition-colors">
                            {product.name}
                          </h3>
                        </div>

                        <p className="text-xs text-zinc-600 font-light line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>

                        {/* Flavor Highlights Chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {product.flavorHighlights.slice(0, 3).map((flavor, index) => (
                            <span
                              key={index}
                              className="text-[10px] bg-white border border-zinc-200 px-2 py-0.5 rounded-md text-zinc-600 font-normal"
                            >
                              {flavor}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price and Action Footer */}
                      <div className="pt-3 border-t border-zinc-200/80 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-zinc-500 block uppercase tracking-wider font-semibold">
                              {product.unit}
                            </span>
                            <span className="font-serif text-base text-zinc-900 font-medium">
                              {product.priceFormatted}
                            </span>
                          </div>
                          {product.servings && (
                            <span className="text-[11px] text-zinc-600 bg-zinc-200/60 px-2 py-0.5 rounded-md font-medium">
                              {product.servings}
                            </span>
                          )}
                        </div>

                        {/* Dual Action Buttons: Add to Bag + Fast WhatsApp */}
                        <div className="grid grid-cols-2 gap-2">
                          <motion.button
                            whileTap={{ scale: 0.94 }}
                            onClick={() => onAddToCart(product)}
                            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-medium transition-all cursor-pointer select-none ${
                              isAddedJustNow
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : 'bg-white border border-zinc-300 text-zinc-800 hover:bg-zinc-100 hover:border-zinc-400'
                            }`}
                          >
                            {isAddedJustNow ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Adicionado!</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5 text-[#B48250]" />
                                <span>Meu Pedido</span>
                              </>
                            )}
                          </motion.button>

                          <motion.a
                            whileTap={{ scale: 0.94 }}
                            href={whatsappOrderUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1E2024] hover:bg-zinc-800 text-white text-xs font-medium transition-colors shadow-2xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-[#C49A6C]" />
                            <span>Pedir Agora</span>
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Custom Order Banner */}
        <div className="mt-14 rounded-3xl bg-[#FAFAF8] border border-zinc-300/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#B48250]">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-semibold">
                Sob Medida para sua Data Especial
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-zinc-900 font-normal">
              Deseja um Bolo ou Caixa Personalizada?
            </h3>
            <p className="text-xs text-zinc-600 font-light max-w-xl">
              Criamos decorações exclusivas, topos em chocolate, doces finos para casamento e presentes comemorativos sob demanda.
            </p>
          </div>

          <motion.a
            whileTap={{ scale: 0.96 }}
            href={`${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
              'Olá! Gostaria de encomendar um bolo ou presente personalizado sob medida.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E2024] hover:bg-zinc-800 text-white text-xs font-medium tracking-wide transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#C49A6C]" />
            <span>Falar com a Confeiteira</span>
          </motion.a>
        </div>

      </div>
    </section>
  );
};
