import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'badge';
  className?: string;
  dark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  dark = false,
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }[size];

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  }[size];

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[10px] tracking-[0.22em]',
    lg: 'text-xs tracking-[0.25em]',
    xl: 'text-sm tracking-[0.28em]',
  }[size];

  // Artisanal stand mixer vector illustration matching the hand-drawn badge from the brand logo
  const MixerIcon = (
    <div
      className={`relative rounded-full flex items-center justify-center border transition-all duration-300 ${
        dark
          ? 'bg-zinc-800 border-zinc-700 text-zinc-100'
          : 'bg-[#EAE8E3] border-zinc-300/80 text-zinc-900 shadow-xs'
      } ${iconDimensions}`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3/4 h-3/4 stroke-current"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Top Motor Head */}
        <path d="M28 32 C28 26, 34 22, 44 22 L72 22 C78 22, 82 26, 82 32 L82 40 C82 42, 80 44, 76 44 L40 44 C34 44, 28 40, 28 35 Z" />
        {/* Speed Knob / Top Detail */}
        <path d="M78 28 L86 28 C87 28, 88 29, 88 31 C88 33, 87 34, 86 34 L78 34" />
        {/* Vertical Stand Column */}
        <path d="M32 44 L28 72 C28 76, 32 80, 38 80 L76 80 C80 80, 84 76, 84 72 L82 70" />
        {/* Mixing Bowl with Whisk/Beater */}
        <path d="M42 46 L76 46 C76 46, 76 66, 59 66 C42 66, 42 46, 42 46 Z" />
        {/* Whisk wire inside bowl */}
        <ellipse cx="59" cy="55" rx="5" ry="8" strokeWidth="2" />
        <path d="M59 44 L59 63" strokeWidth="2" />
        {/* Heavy Base Plate */}
        <path d="M22 80 L88 80" strokeWidth="3" />
        {/* Fine artisanal shading hatch marks */}
        <path d="M34 30 L38 26" strokeWidth="1.5" />
        <path d="M38 32 L42 28" strokeWidth="1.5" />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{MixerIcon}</div>;
  }

  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex flex-col items-center justify-center p-4 rounded-full border text-center ${
          dark
            ? 'bg-zinc-900 border-zinc-700 text-zinc-100'
            : 'bg-[#F2EFE9] border-zinc-300 text-zinc-900'
        } ${className}`}
        style={{ width: size === 'xl' ? '180px' : '140px', height: size === 'xl' ? '180px' : '140px' }}
      >
        <div className="w-12 h-12 mb-1 flex items-center justify-center">{MixerIcon}</div>
        <span className="font-serif font-medium text-lg leading-tight tracking-tight">Maurevite</span>
        <span className="text-[8px] font-sans tracking-[0.2em] uppercase font-semibold text-zinc-600">
          Confeitaria Artesanal
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {MixerIcon}
      <div className="flex flex-col text-left">
        <span
          className={`font-serif font-normal leading-none text-zinc-900 ${titleSizes} ${
            dark ? 'text-zinc-100' : 'text-zinc-900'
          }`}
        >
          Maurevite
        </span>
        <span
          className={`font-sans font-medium uppercase text-zinc-500 mt-1 ${subtitleSizes} ${
            dark ? 'text-zinc-400' : 'text-zinc-600'
          }`}
        >
          Confeitaria Artesanal
        </span>
      </div>
    </div>
  );
};
