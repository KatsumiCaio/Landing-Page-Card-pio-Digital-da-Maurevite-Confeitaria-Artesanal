import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, Check, Heart, MessageSquare, ArrowRight, Clock, MessageCircle, ShoppingBag } from 'lucide-react';
import { SEASONAL_KITS, SEASONAL_THEMES, CARD_MESSAGES_OPTIONS } from '../data/seasonalKits';
import { SeasonalKitItem, ProductItem } from '../types';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { BUSINESS_INFO } from '../data/products';

interface SeasonalKitsProps {
  onAddToCart: (product: ProductItem) => void;
  addedProductId: string | null;
}

export const SeasonalKits: React.FC<SeasonalKitsProps> = ({ onAddToCart, addedProductId }) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('todos');
  const [selectedCardMessages, setSelectedCardMessages] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    SEASONAL_KITS.forEach((kit) => {
      initial[kit.id] = kit.defaultCardMessage;
    });
    return initial;
  });
  const [expandedKitId, setExpandedKitId] = useState<string | null>(null);

  const filteredKits =
    selectedTheme === 'todos'
      ? SEASONAL_KITS
      : SEASONAL_KITS.filter((kit) => kit.theme === selectedTheme);

  const handleMessageChange = (kitId: string, message: string) => {
    setSelectedCardMessages((prev) => ({
      ...prev,
      [kitId]: message,
    }));
  };

  const handleAddKitToBag = (kit: SeasonalKitItem) => {
    const chosenMessage = selectedCardMessages[kit.id] || kit.defaultCardMessage;
    
    // Adapt SeasonalKitItem to ProductItem structure for seamless bag integration
    const productItem: ProductItem = {
      id: kit.id,
      name: kit.name,
      category: 'doces',
      categoryLabel: 'Kits Comemorativos & Mimos',
      description: `${kit.tagline} • Acompanha Cartão: "${chosenMessage}"`,
      longDescription: kit.description,
      flavorHighlights: kit.itemsIncluded,
      priceFormatted: kit.priceFormatted,
      priceValue: kit.priceValue,
      unit: 'kit completo',
      image: kit.image,
      badge: 'Kit Presente',
      prepTime: kit.leadTime,
      servings: 'Pronto para presentear',
    };

    onAddToCart(productItem);
  };

  const generateWhatsappUrl = (kit: SeasonalKitItem) => {
    const chosenMessage = selectedCardMessages[kit.id] || kit.defaultCardMessage;
    const text = `Olá! Gostaria de encomendar o *${kit.name}* (${kit.priceFormatted}).\n\n💌 *Mensagem do Cartão:* "${chosenMessage}"\n📍 *Cidade:* Capão Bonito - SP\n\nPodem me informar a disponibilidade para a data do meu evento?`;
    return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="kits-especiais" className="py-16 md:py-24 bg-[#F5F3EF] relative border-y border-zinc-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 shadow-2xs">
            <Gift className="w-3.5 h-3.5 text-[#B48250]" />
            <span className="text-xs font-sans tracking-[0.25em] uppercase font-semibold text-zinc-900">
              Kits & Mimos Sazonais
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif text-zinc-900 font-normal">
            Presentes Doces Feitos para Emocionar
          </h2>

          <p className="text-sm text-zinc-600 font-light leading-relaxed">
            Caixas rígidas requintadas, laços artesanais e cartões caligrafados para transformar qualquer momento em uma memória inesquecível.
          </p>
        </div>

        {/* Theme Pills Navigation */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none no-scrollbar">
          {SEASONAL_THEMES.map((theme) => {
            const isSelected = selectedTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'text-white bg-[#1E2024] shadow-xs'
                    : 'text-zinc-700 bg-white border border-zinc-200 hover:border-zinc-300 hover:text-zinc-950'
                }`}
              >
                {theme.label}
              </button>
            );
          })}
        </div>

        {/* Kits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredKits.map((kit) => {
              const currentMessage = selectedCardMessages[kit.id] || kit.defaultCardMessage;
              const isAdded = addedProductId === kit.id;
              const isExpanded = expandedKitId === kit.id;

              return (
                <motion.div
                  key={kit.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Top Decorative Gold Accent Line */}
                  <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#C49A6C]/40 to-transparent" />

                  <div>
                    {/* Image & Main Specs Header */}
                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      {/* Image Container with Skeleton */}
                      <div className="w-full sm:w-44 h-48 sm:h-44 rounded-2xl overflow-hidden shrink-0 border border-zinc-100 relative bg-zinc-100">
                        <ImageWithSkeleton
                          src={kit.image}
                          alt={kit.name}
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                          containerClassName="w-full h-full"
                        />
                        {kit.isFeatured && (
                          <div className="absolute top-2 left-2 bg-[#1E2024] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                            <Sparkles className="w-2.5 h-2.5 text-[#C49A6C]" />
                            Destaque
                          </div>
                        )}
                      </div>

                      {/* Content Right */}
                      <div className="flex-1 space-y-2">
                        {/* Micro-selos Decorativos (Tags / Badges) */}
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {kit.microBadges.map((badge, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E8DFC8]/70 text-[10px] font-medium text-[#8C6239] tracking-tight"
                            >
                              <span className="w-1 h-1 rounded-full bg-[#B48250]" />
                              {badge.label}
                            </span>
                          ))}
                        </div>

                        <h3 className="font-serif text-xl sm:text-2xl text-zinc-900 font-normal leading-snug pt-1">
                          {kit.name}
                        </h3>

                        <p className="text-xs text-zinc-600 font-light leading-relaxed">
                          {kit.tagline}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-zinc-500 font-light pt-1">
                          <Clock className="w-3.5 h-3.5 text-[#B48250]" />
                          <span>{kit.leadTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Included Items Accordion / List */}
                    <div className="mt-5 p-4 rounded-2xl bg-zinc-50/80 border border-zinc-100 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
                          <Gift className="w-3 h-3 text-[#B48250]" />
                          O que vem dentro da caixa:
                        </span>
                        <button
                          onClick={() => setExpandedKitId(isExpanded ? null : kit.id)}
                          className="text-[11px] text-[#B48250] hover:text-[#916235] font-medium underline underline-offset-2 cursor-pointer"
                        >
                          {isExpanded ? 'Recolher detalhes' : 'Ver todos os itens'}
                        </button>
                      </div>

                      <ul className="space-y-1.5 text-xs text-zinc-700">
                        {(isExpanded ? kit.itemsIncluded : kit.itemsIncluded.slice(0, 3)).map(
                          (item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#B48250] shrink-0 mt-0.5" />
                              <span className="leading-snug">{item}</span>
                            </li>
                          )
                        )}
                        {!isExpanded && kit.itemsIncluded.length > 3 && (
                          <li className="text-[11px] text-zinc-600 italic pl-5">
                            + {kit.itemsIncluded.length - 3} outros mimos inclusos...
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Interactive Card Message Selector */}
                    <div className="mt-4 space-y-1.5">
                      <label className="text-[11px] font-medium text-zinc-700 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-zinc-800">
                          <MessageSquare className="w-3 h-3 text-[#B48250]" />
                          Dedicatória no Cartão Caligrafado:
                        </span>
                        <span className="text-[10px] text-zinc-600 italic">Incluso sem custo</span>
                      </label>
                      
                      <div className="relative">
                        <select
                          value={currentMessage}
                          onChange={(e) => handleMessageChange(kit.id, e.target.value)}
                          className="w-full text-xs bg-white border border-zinc-200 rounded-xl px-3.5 py-2 text-zinc-800 focus:outline-hidden focus:border-[#B48250] focus:ring-1 focus:ring-[#B48250] transition-colors cursor-pointer appearance-none pr-8"
                        >
                          {CARD_MESSAGES_OPTIONS.map((msgOption, idx) => (
                            <option key={idx} value={msgOption}>
                              {msgOption}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                          <Heart className="w-3.5 h-3.5 text-[#C49A6C]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Price & Actions */}
                  <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-zinc-600 uppercase tracking-wider block">
                        Valor do Kit Completo
                      </span>
                      <span className="text-lg sm:text-xl font-serif text-zinc-900 font-medium">
                        {kit.priceFormatted}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Add to Bag Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddKitToBag(kit)}
                        className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-medium transition-all shadow-2xs cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white border border-zinc-300 text-zinc-800 hover:bg-zinc-50'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Adicionado!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-[#B48250]" />
                            <span>Adicionar à Sacola</span>
                          </>
                        )}
                      </motion.button>

                      {/* Direct WhatsApp CTA */}
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        href={generateWhatsappUrl(kit)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#1E2024] hover:bg-zinc-800 text-white text-xs font-medium tracking-wide transition-all shadow-xs cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#C49A6C]" />
                        <span>Pedir no WhatsApp</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Editorial Quote */}
        <div className="mt-12 text-center">
          <p className="text-xs text-zinc-600 font-light max-w-md mx-auto">
            ✨ Deseja montar uma caixa com combinações exclusivas ou lembrancinhas corporativas? Fale diretamente com nossa confeiteira no WhatsApp.
          </p>
        </div>

      </div>
    </section>
  );
};
