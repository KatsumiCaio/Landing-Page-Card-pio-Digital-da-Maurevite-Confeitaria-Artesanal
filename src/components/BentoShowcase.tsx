import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight, Star, Gift } from 'lucide-react';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface BentoShowcaseProps {
  onSelectCategory: (category: 'todos' | 'bolos' | 'cones' | 'fatias' | 'doces') => void;
}

export const BentoShowcase: React.FC<BentoShowcaseProps> = ({ onSelectCategory }) => {
  return (
    <section id="destaques" className="py-16 md:py-24 bg-[#FAFAF8] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-zinc-200/80 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-sans tracking-[0.25em] uppercase font-semibold text-[#B48250]">
              Vitrine de Criações
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-zinc-900 font-normal">
              Especialidades da Nossa Bancada
            </h2>
          </div>
          <p className="text-sm text-zinc-600 font-light max-w-md">
            Do bolo de festa inesquecível ao doce da sua tarde: cada criação é elaborada com equilíbrio estético e sabor autêntico.
          </p>
        </div>

        {/* Bento Grid Layout (Bento Grid Minimalista) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
          
          {/* Bento Card 1 (Large Feature / 7 Col Span on Desktop) */}
          <div className="md:col-span-12 lg:col-span-7 group relative rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xs hover:border-zinc-400/80 transition-all duration-300">
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E2024] text-white text-[11px] font-medium tracking-wide">
                  <Sparkles className="w-3 h-3 text-[#C49A6C]" />
                  Grande Destaque
                </span>
                <span className="text-xs text-zinc-600 font-medium">
                  Sob Medida • 48h
                </span>
              </div>

              <div className="pt-2">
                <h3 className="text-2xl sm:text-3xl font-serif text-zinc-900 font-normal leading-snug">
                  Bolos Comemorativos & Artísticos
                </h3>
                <p className="text-sm text-zinc-600 font-light leading-relaxed mt-2 max-w-lg">
                  Massas amanteigadas ultraleves, recheios equilibrados na panela e acabamento clássico em flores naturais, frutas frescas ou decorações personalizadas para o seu momento.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 text-xs text-zinc-600 font-medium">
                <span className="bg-zinc-100 px-2.5 py-1 rounded-md">Red Velvet Ninho</span>
                <span className="bg-zinc-100 px-2.5 py-1 rounded-md">Belga 54% com Crispearls</span>
                <span className="bg-zinc-100 px-2.5 py-1 rounded-md">Doce de Leite com Nozes</span>
              </div>
            </div>

            {/* Cake Showcase Image with Skeleton */}
            <div className="relative mt-6 aspect-16/9 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-100">
              <ImageWithSkeleton
                src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1000&q=80"
                alt="Bolos Comemorativos Maurevite"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bottom Action */}
            <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-900">
                A partir de R$ 92,00 / kg
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectCategory('bolos')}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1E2024] hover:text-[#B48250] transition-colors cursor-pointer group-hover:underline underline-offset-4"
              >
                <span>Ver opções de bolos</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>
            </div>
          </div>

          {/* Right Column Bento Cards */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-5 lg:gap-6">
            
            {/* Bento Card 2: Cones Trufados Artesanais */}
            <div className="group rounded-3xl border border-zinc-200/90 bg-white p-6 flex flex-col justify-between shadow-2xs hover:border-zinc-400/80 transition-all duration-300">
              <div className="flex gap-4 items-start">
                <ImageWithSkeleton
                  src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80"
                  alt="Cones Trufados Artesanais"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shrink-0 border border-zinc-100"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#B48250]">
                      Crocância & Recheio
                    </span>
                    <Star className="w-3 h-3 fill-[#C49A6C] text-[#C49A6C]" />
                  </div>
                  <h4 className="font-serif text-lg text-zinc-900 font-normal">
                    Cones Trufados Artesanais
                  </h4>
                  <p className="text-xs text-zinc-600 font-light leading-relaxed">
                    Casquinha blindada com chocolate nobre por dentro e recheios fartos até a pontinha.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-800">
                  A partir de R$ 14,00
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectCategory('cones')}
                  className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 hover:text-[#B48250] cursor-pointer"
                >
                  <span>Explorar sabores</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>

            {/* Bento Card 3: Fatias & Sobremesas do Dia */}
            <div className="group rounded-3xl border border-zinc-200/90 bg-white p-6 flex flex-col justify-between shadow-2xs hover:border-zinc-400/80 transition-all duration-300">
              <div className="flex gap-4 items-start">
                <ImageWithSkeleton
                  src="https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=400&q=80"
                  alt="Fatias Gourmet e Sobremesas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  containerClassName="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shrink-0 border border-zinc-100"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                      Pronta-Entrega Diária
                    </span>
                  </div>
                  <h4 className="font-serif text-lg text-zinc-900 font-normal">
                    Fatias Gourmet & Sobremesas
                  </h4>
                  <p className="text-xs text-zinc-600 font-light leading-relaxed">
                    Cheesecake com frutas do bosque, Banoffee fresca e copos repletos de sabor para adocicar seu dia.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-800">
                  Fatias a partir de R$ 16,00
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectCategory('fatias')}
                  className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 hover:text-[#B48250] cursor-pointer"
                >
                  <span>Ver disponíveis</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>

            {/* Bento Card 4: Doces Finos & Lembranças */}
            <div className="group rounded-3xl border border-zinc-200/90 bg-[#F5F3EF] p-6 flex flex-col justify-between shadow-2xs hover:border-zinc-400/80 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#B48250]" />
                  <span className="text-xs font-serif italic text-zinc-700">Para Presentear ou Celebrar</span>
                </div>
                <span className="text-xs text-zinc-500 font-medium">Caixas & Centos</span>
              </div>
              
              <div className="my-2">
                <h4 className="font-serif text-lg text-zinc-900 font-normal">
                  Doces Finos & Caixas de Mimos
                </h4>
                <p className="text-xs text-zinc-600 font-light mt-1">
                  Brigadeiros artesanais enrolados à mão em embalagens requintadas para presentear quem você ama.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-800">
                  Caixas a partir de R$ 48,00
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectCategory('doces')}
                  className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 hover:text-[#B48250] cursor-pointer"
                >
                  <span>Ver caixas</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
