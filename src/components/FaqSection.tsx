import React, { useState } from 'react';
import { FAQS_DATA, BUSINESS_INFO } from '../data/products';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  // Default first FAQ open for initial clarity
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#FAFAF8] border-t border-zinc-200/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-[#B48250]">
            <HelpCircle className="w-4 h-4" />
            <span className="text-xs font-sans tracking-[0.25em] uppercase font-semibold">
              Tire Suas Dúvidas
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif text-zinc-900 font-normal">
            Perguntas Frequentes
          </h2>

          <p className="text-sm text-zinc-600 font-light max-w-lg mx-auto">
            Tudo o que você precisa saber sobre prazos de encomenda, entregas em Capão Bonito e formas de pagamento.
          </p>
        </div>

        {/* FAQ Accordion Items */}
        <div className="space-y-3" role="region" aria-label="Lista de Perguntas Frequentes">
          {FAQS_DATA.map((faq) => {
            const isOpen = openFaqId === faq.id;
            const headerId = `faq-header-${faq.id}`;
            const panelId = `faq-panel-${faq.id}`;

            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-zinc-200/90 bg-white overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  id={headerId}
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C49A6C] focus-visible:ring-offset-2 hover:bg-zinc-50/70 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-zinc-900 font-medium">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#1E2024] text-white' : 'bg-zinc-100 text-zinc-700'
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-5 pb-6 sm:px-6 pt-1 text-xs sm:text-sm text-zinc-700 font-normal leading-relaxed border-t border-zinc-100"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-zinc-200/80 text-center space-y-3">
          <p className="text-xs sm:text-sm text-zinc-700">
            Ficou com alguma dúvida específica sobre sabores personalizados ou alergênicos?
          </p>
          <a
            href={
              BUSINESS_INFO.whatsappBaseUrl +
              '?text=' +
              encodeURIComponent(
                'Olá! Gostaria de tirar uma dúvida sobre os ingredientes e encomendas da Maurevite.'
              )
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E2024] hover:bg-zinc-800 text-white text-xs font-medium transition-colors shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#C49A6C]" />
            <span>Falar com a Confeiteira no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
