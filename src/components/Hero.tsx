import React from 'react';
import { motion } from 'motion/react';
import { BUSINESS_INFO } from '../data/products';
import { observability } from '../lib/observability';
import { MessageCircle, Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { Logo } from './Logo';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface HeroProps {
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu }) => {
  const handleHeroWhatsAppClick = () => {
    observability.trackDirectContact('hero', 'hero_primary_cta');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-zinc-200/70">
      {/* Background Subtle Noise / Texture Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#E5E3DC_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            
            {/* Subtle Brand Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-300/80 bg-white/80 backdrop-blur-xs text-xs font-medium text-zinc-700 shadow-2xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49A6C]"></span>
              <span className="tracking-wide">Ateliê Doce em {BUSINESS_INFO.city}</span>
            </motion.div>

            {/* Main Editorial Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-normal text-zinc-900 leading-[1.18] tracking-tight">
              Confeitaria artesanal feita com <span className="italic font-serif text-[#1E2024] underline decoration-[#C49A6C]/50 decoration-1 underline-offset-8">tempo</span>, afeto e ingredientes nobres.
            </h1>

            {/* Subtitle with Local Context */}
            <p className="text-base sm:text-lg text-zinc-600 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Bolos comemorativos desenhados sob medida, cones trufados crocantes e sobremesas que transformam qualquer momento em uma doce memória em <strong className="font-medium text-zinc-800">Capão Bonito e região</strong>.
            </p>

            {/* Clean Minimalist Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 pt-1 text-xs text-zinc-600 font-medium">
              <span className="px-3 py-1 rounded-md border border-zinc-200 bg-white/60">
                Entrega & Retirada
              </span>
              <span className="text-zinc-300 hidden sm:inline">•</span>
              <span className="px-3 py-1 rounded-md border border-zinc-200 bg-white/60">
                Produção Sob Medida
              </span>
              <span className="text-zinc-300 hidden sm:inline">•</span>
              <span className="px-3 py-1 rounded-md border border-zinc-200 bg-white/60">
                100% Artesanal
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <motion.a
                whileTap={{ scale: 0.96 }}
                onClick={handleHeroWhatsAppClick}
                href={BUSINESS_INFO.whatsappBaseUrl + '?text=' + encodeURIComponent('Olá! Gostaria de consultar a disponibilidade para uma encomenda na Maurevite.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1E2024] hover:bg-zinc-800 text-white text-sm font-medium tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#C49A6C]" />
                <span>Pedir pelo WhatsApp</span>
              </motion.a>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={onExploreMenu}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 text-sm font-medium tracking-wide transition-all shadow-2xs cursor-pointer"
              >
                <span>Consultar Cardápio</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </motion.button>
            </div>

            {/* Micro Social Proof / Location reassurance */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-5 text-xs text-zinc-500 font-light border-t border-zinc-200/60 mt-6">
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#C49A6C]" />
                <span>Feito à mão sob encomenda</span>
              </div>
              <span className="text-zinc-300">|</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C49A6C]" />
                <span>Ingredientes puros selecionados</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Editorial Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Elegant Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-zinc-200/80 bg-white p-2.5 shadow-sm">
                
                {/* Main Food Photo with Skeleton */}
                <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-zinc-100">
                  <ImageWithSkeleton
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85"
                    alt="Bolo comemorativo artesanal Maurevite"
                    className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                    containerClassName="w-full h-full"
                    loading="eager"
                  />
                  
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Overlay Artisan Badge */}
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10 pointer-events-none">
                    <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#E5C9A6] block mb-1">
                      Destaque da Bancada
                    </span>
                    <h3 className="font-serif text-lg font-normal text-white">
                      Bolo de Puro Cacau Belga & Frutas Nobres
                    </h3>
                    <p className="text-xs text-zinc-300 font-light mt-0.5">
                      Montagem fresca e finalização delicada
                    </p>
                  </div>
                </div>

                {/* Floating Artisan Seal */}
                <div className="absolute -top-4 -right-3 bg-white/95 backdrop-blur-sm border border-zinc-200/90 rounded-full p-2.5 shadow-md flex items-center gap-2 z-20">
                  <div className="w-8 h-8 rounded-full bg-[#1E2024] flex items-center justify-center text-[#C49A6C]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="pr-2 text-left">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-900 leading-none">
                      100% Artesanal
                    </p>
                    <p className="text-[9px] text-zinc-500 font-medium">Capão Bonito</p>
                  </div>
                </div>

              </div>

              {/* Decorative mini badge with Logo */}
              <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -left-4 bg-[#FAFAF8] border border-zinc-300/80 rounded-2xl px-4 py-2.5 shadow-sm z-20">
                <Logo size="sm" variant="icon" />
                <div className="text-left">
                  <p className="text-xs font-serif font-medium text-zinc-900">Maurevite</p>
                  <p className="text-[9px] text-zinc-500 tracking-wider uppercase font-semibold">
                    Afeto em cada fatia
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
