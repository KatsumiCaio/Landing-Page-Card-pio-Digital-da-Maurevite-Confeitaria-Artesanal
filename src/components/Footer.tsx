import React from 'react';
import { BUSINESS_INFO } from '../data/products';
import { Logo } from './Logo';
import { MessageCircle, Instagram, MapPin, Clock, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenLegalModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#18191B] text-zinc-300 pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-800">
          
          {/* Brand & Identity Column */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="lg" dark={true} />
            
            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm pt-2">
              Confeitaria artesanal afetiva em Capão Bonito - SP. Bolos comemorativos desenhados à mão, cones trufados e sobremesas feitas com ingredientes nobres para os seus momentos especiais.
            </p>

            {/* Social Icons & WhatsApp */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-[#C49A6C] hover:text-white transition-colors border border-zinc-700"
                aria-label="Instagram da Maurevite"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={
                  BUSINESS_INFO.whatsappBaseUrl +
                  '?text=' +
                  encodeURIComponent(BUSINESS_INFO.defaultWhatsappMessage)
                }
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-[#C49A6C] hover:text-white transition-colors border border-zinc-700"
                aria-label="WhatsApp da Maurevite"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <span className="text-xs text-zinc-400 font-light pl-1">
                {BUSINESS_INFO.instagram}
              </span>
            </div>
          </div>

          {/* Direct Contact & Hours */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-sans tracking-[0.2em] uppercase font-semibold text-[#C49A6C]">
              Atendimento & Localização
            </h4>

            <div className="space-y-2.5 text-xs text-zinc-400 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C49A6C] shrink-0 mt-0.5" />
                <span>
                  <strong className="font-medium text-zinc-200">{BUSINESS_INFO.city}</strong>
                  <br />
                  Retirada no ateliê ou entrega programada na cidade.
                </span>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-[#C49A6C] shrink-0 mt-0.5" />
                <span>
                  <strong className="font-medium text-zinc-200">Horário de Bancada:</strong>
                  <br />
                  {BUSINESS_INFO.hours}
                </span>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MessageCircle className="w-4 h-4 text-[#C49A6C] shrink-0 mt-0.5" />
                <span>
                  <strong className="font-medium text-zinc-200">WhatsApp Oficial:</strong>
                  <br />
                  {BUSINESS_INFO.phoneDisplay}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-sans tracking-[0.2em] uppercase font-semibold text-[#C49A6C]">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-light">
              <li>
                <a href="#cardapio" className="hover:text-white transition-colors">
                  • Cardápio Completo
                </a>
              </li>
              <li>
                <a href="#destaques" className="hover:text-white transition-colors">
                  • Vitrine de Destaques
                </a>
              </li>
              <li>
                <a href="#cuidado" className="hover:text-white transition-colors">
                  • O Cuidado Artesanal
                </a>
              </li>
              <li>
                <a href="#como-pedir" className="hover:text-white transition-colors">
                  • Como Funciona a Encomenda
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  • Perguntas Frequentes
                </a>
              </li>
              {onOpenLegalModal && (
                <li>
                  <button
                    onClick={onOpenLegalModal}
                    className="hover:text-[#C49A6C] transition-colors cursor-pointer text-left"
                  >
                    • Termos de Uso & LGPD
                  </button>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-light">
          <div className="flex flex-wrap items-center gap-1.5 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Maurevite Confeitaria Artesanal.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Feito com <Heart className="w-3 h-3 text-[#C49A6C] fill-[#C49A6C]" /> em Capão Bonito - SP
            </span>
            {onOpenLegalModal && (
              <>
                <span className="hidden sm:inline">•</span>
                <button
                  onClick={onOpenLegalModal}
                  className="hover:text-zinc-300 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Termos & Privacidade
                </button>
              </>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
