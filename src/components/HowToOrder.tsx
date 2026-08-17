import React from 'react';
import { ORDER_STEPS, BUSINESS_INFO } from '../data/products';
import { MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface HowToOrderProps {
  onExploreMenu: () => void;
}

export const HowToOrder: React.FC<HowToOrderProps> = ({ onExploreMenu }) => {
  return (
    <section id="como-pedir" className="py-16 md:py-24 bg-white border-t border-zinc-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-4 border-b border-zinc-200 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-sans tracking-[0.25em] uppercase font-semibold text-[#B48250]">
              Passo a Passo Simples
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-zinc-900 font-normal">
              Como Funciona Sua Encomenda
            </h2>
          </div>
          <p className="text-sm text-zinc-600 font-light max-w-md">
            Processo ágil, acolhedor e transparente direto pelo WhatsApp da nossa confeitaria.
          </p>
        </div>

        {/* 3 Steps Horizontal / Vertical Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {ORDER_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-7 rounded-2xl bg-[#FAFAF8] border border-zinc-200/90 flex flex-col justify-between space-y-4 hover:border-zinc-400/80 transition-all duration-300 shadow-2xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl text-zinc-400 font-light">
                    {step.step}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#B48250]" />
                </div>

                <h3 className="font-serif text-lg text-zinc-900 font-normal leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[11px] text-zinc-400 font-light">
                  {idx === 0 && 'Consulte fotos e valores online'}
                  {idx === 1 && 'Atendimento personalizado'}
                  {idx === 2 && 'Pontualidade e cuidado'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action CTA Container */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={
              BUSINESS_INFO.whatsappBaseUrl +
              '?text=' +
              encodeURIComponent(
                'Olá! Gostaria de consultar as datas disponíveis para encomendar um bolo/doce.'
              )
            }
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1E2024] hover:bg-zinc-800 text-white text-xs font-medium tracking-wide transition-all shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-[#C49A6C]" />
            <span>Falar no WhatsApp ({BUSINESS_INFO.phoneDisplay})</span>
          </a>

          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-medium cursor-pointer"
          >
            <span>Ver Cardápio Novamente</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
          </button>
        </div>

      </div>
    </section>
  );
};
