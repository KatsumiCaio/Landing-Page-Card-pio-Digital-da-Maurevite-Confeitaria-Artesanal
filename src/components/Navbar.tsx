import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { BUSINESS_INFO } from '../data/products';
import { ShoppingBag, MessageCircle, Menu, X, Clock, MapPin } from 'lucide-react';

interface NavbarProps {
  orderCount: number;
  onOpenOrderDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ orderCount, onOpenOrderDrawer }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Cardápio', href: '#cardapio' },
    { label: 'Calculadora de Bolo', href: '#calculadora' },
    { label: 'Destaques', href: '#destaques' },
    { label: 'O Cuidado', href: '#cuidado' },
    { label: 'Como Pedir', href: '#como-pedir' },
    { label: 'Dúvidas', href: '#faq' },
  ];

  return (
    <>
      {/* Top Subtle Info Banner */}
      <div className="bg-[#1E2024] text-zinc-300 text-xs py-2 px-4 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-light tracking-wide text-zinc-200">
              Bancada em Produção • Encomendas Abertas para a Semana
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-zinc-400 text-[11px] tracking-wider">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C49A6C]" />
              {BUSINESS_INFO.city}
            </span>
            <span className="text-zinc-600">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#C49A6C]" />
              Retirada ou Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAFAF8]/95 backdrop-blur-md shadow-xs border-b border-zinc-200/80 py-3.5'
            : 'bg-[#FAFAF8] border-b border-zinc-200/50 py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="focus:outline-hidden" aria-label="Maurevite Confeitaria Artesanal">
            <Logo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-700 hover:text-zinc-950 transition-colors tracking-wide relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C49A6C] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Order Basket Pill */}
            <button
              onClick={onOpenOrderDrawer}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-zinc-300/90 text-xs font-medium text-zinc-800 bg-white hover:bg-zinc-50 transition-all shadow-2xs cursor-pointer"
              title="Ver resumo de itens selecionados"
            >
              <ShoppingBag className="w-4 h-4 text-[#C49A6C]" />
              <span>Meu Pedido</span>
              {orderCount > 0 && (
                <span className="ml-0.5 inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white bg-[#1E2024] rounded-full">
                  {orderCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={BUSINESS_INFO.whatsappBaseUrl + '?text=' + encodeURIComponent(BUSINESS_INFO.defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E2024] hover:bg-zinc-800 text-white text-xs font-medium tracking-wide transition-all shadow-xs hover:shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#C49A6C]" />
              <span>Pedir no WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button & Cart icon */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenOrderDrawer}
              className="relative p-2 rounded-full border border-zinc-300 bg-white text-zinc-800"
              aria-label="Ver pedido"
            >
              <ShoppingBag className="w-4 h-4 text-[#C49A6C]" />
              {orderCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold text-white bg-[#1E2024] rounded-full flex items-center justify-center">
                  {orderCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-800 hover:bg-zinc-100 transition-colors focus:outline-hidden"
              aria-label="Menu de Navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 bg-[#FAFAF8] px-4 pt-4 pb-6 mt-3 space-y-3 shadow-lg">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-medium text-zinc-800 rounded-lg hover:bg-zinc-100 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-zinc-200 flex flex-col gap-2.5">
              <a
                href={BUSINESS_INFO.whatsappBaseUrl + '?text=' + encodeURIComponent(BUSINESS_INFO.defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1E2024] text-white text-sm font-medium shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#C49A6C]" />
                <span>Conversar no WhatsApp ({BUSINESS_INFO.phoneDisplay})</span>
              </a>
              <p className="text-center text-xs text-zinc-500 font-light pt-1">
                Atendimento em {BUSINESS_INFO.city}
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
