import React from 'react';
import { CRAFTSMANSHIP_PILLARS } from '../data/products';
import { Heart, Sparkles, Feather } from 'lucide-react';
import { Logo } from './Logo';

export const CraftsmanshipManifesto: React.FC = () => {
  return (
    <section id="cuidado" className="py-16 md:py-24 bg-[#FAFAF8] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Manifesto Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 text-[#B48250]">
            <Feather className="w-4 h-4" />
            <span className="text-xs font-sans tracking-[0.25em] uppercase font-semibold">
              Filosofia & Manifesto
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-zinc-900 font-normal leading-tight">
            O Cuidado em Cada Detalhe
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed">
            Acreditamos que a verdadeira confeitaria não tem pressa. Cada receita é executada respeitando a técnica manual, o ponto exato dos cremes e a nobreza de cada ingrediente.
          </p>
        </div>

        {/* 3 Pillars Grid with Fine Dividing Lines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative">
          {CRAFTSMANSHIP_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="relative bg-white rounded-2xl p-7 sm:p-8 border border-zinc-200/90 shadow-2xs flex flex-col justify-between space-y-6 hover:border-zinc-400/80 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Number & Accent */}
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl text-[#B48250] font-light">
                    {pillar.number}
                  </span>
                  <span className="w-8 h-px bg-zinc-200" />
                </div>

                {/* Pillar Title */}
                <h3 className="font-serif text-xl text-zinc-900 font-normal leading-snug">
                  {pillar.title}
                </h3>

                {/* Short Manifesto Description */}
                <p className="text-xs sm:text-sm text-zinc-700 font-normal leading-relaxed">
                  {pillar.description}
                </p>

                {/* Extended Details */}
                <p className="text-xs text-zinc-500 font-light leading-relaxed pt-2 border-t border-zinc-100">
                  {pillar.details}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-[11px] text-[#B48250] font-medium uppercase tracking-wider">
                <span>Padrão Maurevite</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sensory Quote Box */}
        <div className="mt-14 max-w-3xl mx-auto text-center border-t border-b border-zinc-200 py-8 px-4">
          <blockquote className="font-serif italic text-lg sm:text-xl text-zinc-800 leading-relaxed">
            "Um bolo não é apenas farinha, ovos e açúcar. É o centro das memórias afetivas que você vai guardar para sempre."
          </blockquote>
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-zinc-500 font-medium block mt-3">
            — Maurevite Confeitaria Artesanal • Capão Bonito
          </span>
        </div>

      </div>
    </section>
  );
};
