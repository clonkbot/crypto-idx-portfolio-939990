import React from 'react';

interface PortfolioHeaderProps {
  currentTime: Date;
}

export function PortfolioHeader({ currentTime }: PortfolioHeaderProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).toUpperCase();
  };

  return (
    <header className="mb-8 md:mb-16">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight mb-2">
            Portfolio
          </h1>
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#666] font-mono">
            Crypto & Indonesian Equities
          </p>
        </div>

        <div className="text-left sm:text-right">
          <div className="font-mono text-lg md:text-xl lg:text-2xl tracking-wider text-[#d4af37]">
            {formatTime(currentTime)}
          </div>
          <div className="text-[10px] md:text-xs tracking-[0.2em] text-[#555] font-mono mt-1">
            {formatDate(currentTime)}
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="mt-6 md:mt-8 h-px bg-gradient-to-r from-[#d4af37] via-[#1a1a1a] to-transparent" />
    </header>
  );
}
