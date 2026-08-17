import React, { useState } from 'react';
import { Calculator, Users, Sparkles, Cake, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, PRODUCTS_DATA } from '../data/products';

interface CakeCalculatorProps {
  onSelectProductForOrder?: (productId: string) => void;
}

export const CakeCalculator: React.FC<CakeCalculatorProps> = ({ onSelectProductForOrder }) => {
  const [guestCount, setGuestCount] = useState<number>(20);
  const [occasion, setOccasion] = useState<string>('aniversario');
  const [selectedFlavorId, setSelectedFlavorId] = useState<string>('bolo-red-velvet');

  // Bolos filter
  const cakeOptions = PRODUCTS_DATA.filter((p) => p.category === 'bolos');
  const selectedCake = cakeOptions.find((c) => c.id === selectedFlavorId) || cakeOptions[0];

  // Calculations based on confectionery standards (approx 100-110g per slice/guest for celebration cake)
  // Base: 10 guests = 1.2kg | 15 guests = 1.8kg | 20 guests = 2.4kg | 30 guests = 3.5kg | 50 guests = 5.5kg
  const recommendedWeightKg = Math.max(1.0, Math.round((guestCount * 0.11) * 10) / 10);
  
  // Recommended cake pan diameter
  const getPanSize = (weight: number) => {
    if (weight <= 1.3) return '15 cm (Aro Alto)';
    if (weight <= 2.2) return '18 a 20 cm (Aro Alto)';
    if (weight <= 3.2) return '22 a 24 cm (Aro Alto)';
    if (weight <= 4.5) return '26 a 28 cm (Aro Alto)';
    return '2 andares (20cm + 15cm)';
  };

  // Recommended sweet count (4 to 5 doces finos per guest)
  const recommendedSweets = guestCount * 4;

  // Estimated cake price
  const estimatedCakePrice = selectedCake ? selectedCake.priceValue * recommendedWeightKg : 0;

  const occasions = [
    { id: 'aniversario', label: 'Aniversário' },
    { id: 'casamento', label: 'Casamento / Noivado' },
    { id: 'cha-bebe', label: 'Chá de Bebê / Revelação' },
    { id: 'corporativo', label: 'Empresarial / Confraternização' },
    { id: 'almoco-familia', label: 'Almoço em Família' },
  ];

  const handleWhatsAppConsultation = () => {
    const text = `*SIMULAÇÃO DE BOLO - MAUREVITE CONFEITARIA*\n\n` +
      `*Ocasião:* ${occasions.find(o => o.id === occasion)?.label || occasion}\n` +
      `*Número de Convidados:* ${guestCount} pessoas\n` +
      `*Peso Recomendado:* ~${recommendedWeightKg.toFixed(1).replace('.', ',')} kg (${getPanSize(recommendedWeightKg)})\n` +
      `*Sabor Escolhido:* ${selectedCake.name}\n` +
      `*Docinhos Recomendados:* ~${recommendedSweets} unidades\n` +
      `*Estimativa do Bolo:* R$ ${estimatedCakePrice.toFixed(2).replace('.', ',')}\n\n` +
      `_Gostaria de solicitar um orçamento personalizado e verificar a disponibilidade de data em Capão Bonito!_`;

    window.open(`${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="calculadora" className="py-16 md:py-24 bg-white border-t border-zinc-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-[#B48250]">
            <Calculator className="w-4 h-4" />
            <span className="text-xs font-sans tracking-[0.25em] uppercase font-semibold">
              Simulador de Rendimento
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif text-zinc-900 font-normal">
            Calculadora de Tamanho de Bolo
          </h2>

          <p className="text-sm text-zinc-600 font-light max-w-xl mx-auto">
            Planejando uma comemoração em Capão Bonito? Descubra o peso ideal em kg, o diâmetro da forma e a quantidade de docinhos recomendada para os seus convidados.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 bg-[#FAFAF8] p-6 sm:p-8 rounded-3xl border border-zinc-200/90 space-y-8 shadow-2xs">
            
            {/* Step 1: Occasion */}
            <div>
              <label className="text-xs font-semibold text-zinc-900 uppercase tracking-wider block mb-3">
                1. Qual é a ocasião do evento?
              </label>
              <div className="flex flex-wrap gap-2">
                {occasions.map((occ) => (
                  <button
                    key={occ.id}
                    type="button"
                    onClick={() => setOccasion(occ.id)}
                    className={`px-3.5 py-2 rounded-full text-xs transition-all cursor-pointer ${
                      occasion === occ.id
                        ? 'bg-[#1E2024] text-white font-medium shadow-xs'
                        : 'bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    {occ.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Guests Slider */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-xs font-semibold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#C49A6C]" />
                  2. Número de Convidados / Fatias:
                </label>
                <div className="px-3 py-1 bg-white border border-zinc-300 rounded-full text-sm font-semibold text-zinc-900">
                  {guestCount} pessoas
                </div>
              </div>

              <input
                type="range"
                min={5}
                max={60}
                step={5}
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#1E2024]"
                aria-label="Controle de quantidade de convidados"
              />

              <div className="flex justify-between text-[11px] text-zinc-400 mt-2 font-light">
                <span>5 (Íntimo)</span>
                <span>20 (Festa média)</span>
                <span>40 (Grande)</span>
                <span>60+ (Evento)</span>
              </div>
            </div>

            {/* Step 3: Favorite Cake Flavor */}
            <div>
              <label className="text-xs font-semibold text-zinc-900 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <Cake className="w-4 h-4 text-[#C49A6C]" />
                3. Escolha o sabor de bolo favorito:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cakeOptions.map((cake) => {
                  const isSelected = cake.id === selectedFlavorId;
                  return (
                    <button
                      key={cake.id}
                      type="button"
                      onClick={() => setSelectedFlavorId(cake.id)}
                      className={`p-3 rounded-2xl border text-left flex gap-3 items-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-zinc-900 bg-white shadow-xs'
                          : 'border-zinc-200 bg-white/70 hover:border-zinc-300'
                      }`}
                    >
                      <img
                        src={cake.image}
                        alt={cake.name}
                        className="w-11 h-11 rounded-lg object-cover bg-zinc-100 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-medium text-zinc-900 truncate">
                            {cake.name.replace('Bolo ', '')}
                          </p>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A6C] shrink-0" />}
                        </div>
                        <p className="text-[11px] text-zinc-500 font-light">
                          R$ {cake.priceValue},00/kg
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Calculated Results & Summary Card */}
          <div className="lg:col-span-5 bg-[#1E2024] text-white p-7 sm:p-9 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C49A6C]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#C49A6C] font-semibold">
                  Recomendação do Ateliê
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mt-0.5">
                  Seu Bolo Sob Medida
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[#C49A6C]">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            {/* Metrics Bento */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl">
                <span className="text-[11px] text-zinc-400 font-light block">Peso Sugerido</span>
                <span className="font-serif text-2xl text-white font-medium mt-0.5 block">
                  ~{recommendedWeightKg.toFixed(1).replace('.', ',')} kg
                </span>
                <span className="text-[10px] text-zinc-500 mt-1 block">
                  Fartura garantida (~110g/pessoa)
                </span>
              </div>

              <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl">
                <span className="text-[11px] text-zinc-400 font-light block">Estrutura / Aro</span>
                <span className="font-serif text-base text-[#C49A6C] font-medium mt-1 block leading-tight">
                  {getPanSize(recommendedWeightKg)}
                </span>
                <span className="text-[10px] text-zinc-500 mt-1 block">
                  Camadas altas & corte perfeito
                </span>
              </div>

              <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl">
                <span className="text-[11px] text-zinc-400 font-light block">Docinhos de Apoio</span>
                <span className="font-serif text-2xl text-white font-medium mt-0.5 block">
                  ~{recommendedSweets} un.
                </span>
                <span className="text-[10px] text-zinc-500 mt-1 block">
                  Cálculo de 4 doces por convidado
                </span>
              </div>

              <div className="bg-zinc-900/90 border border-zinc-800 p-4 rounded-2xl">
                <span className="text-[11px] text-zinc-400 font-light block">Estimativa Bolo</span>
                <span className="font-serif text-2xl text-[#C49A6C] font-medium mt-0.5 block">
                  R$ {estimatedCakePrice.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-[10px] text-zinc-500 mt-1 block">
                  {selectedCake.name.split(' ')[1] || 'Artesanal'}
                </span>
              </div>
            </div>

            {/* Flavor Note */}
            <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-zinc-800/80 flex items-center gap-3">
              <img
                src={selectedCake.image}
                alt={selectedCake.name}
                className="w-10 h-10 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-medium text-zinc-200 truncate">{selectedCake.name}</p>
                <p className="text-[11px] text-zinc-400 font-light">{selectedCake.prepTime || 'Encomenda com 48h de antecedência'}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppConsultation}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#C49A6C] hover:bg-[#b58b5e] text-zinc-950 font-medium rounded-full text-xs tracking-wide transition-all shadow-md cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir Orçamento Sob Medida no WhatsApp</span>
              </button>

              {onSelectProductForOrder && (
                <button
                  type="button"
                  onClick={() => onSelectProductForOrder(selectedCake.id)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 text-zinc-300 hover:text-white text-xs font-light transition-colors cursor-pointer"
                >
                  <span>Adicionar este bolo ao Meu Pedido</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <p className="text-[10px] text-zinc-400 text-center font-light">
              Entregas em Capão Bonito - SP ou retirada com horário agendado.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
