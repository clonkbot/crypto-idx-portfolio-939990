import React from 'react';

interface PortfolioSummaryProps {
  total: number;
  change: number;
  changePercent: number;
  cryptoTotal: number;
  idxTotal: number;
}

export function PortfolioSummary({
  total,
  change,
  changePercent,
  cryptoTotal,
  idxTotal,
}: PortfolioSummaryProps) {
  const isPositive = change >= 0;
  const cryptoPercent = (cryptoTotal / total) * 100;
  const idxPercent = (idxTotal / total) * 100;

  const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="mb-10 md:mb-16">
      {/* Total Value */}
      <div className="mb-6 md:mb-8">
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#555] font-mono mb-2">
          Total Value
        </p>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          <span className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight font-mono">
            {formatUSD(total)}
          </span>
          <span
            className={`text-sm md:text-base lg:text-lg font-mono ${
              isPositive ? 'text-[#00d9c4]' : 'text-[#e85d5d]'
            }`}
          >
            {isPositive ? '+' : ''}{formatUSD(change)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* Allocation Bar */}
      <div className="space-y-3">
        <div className="flex justify-between text-[10px] md:text-xs font-mono tracking-wide text-[#666]">
          <span>ALLOCATION</span>
          <span className="hidden sm:inline">CRYPTO {cryptoPercent.toFixed(1)}% · IDX {idxPercent.toFixed(1)}%</span>
        </div>

        <div className="h-1.5 md:h-2 bg-[#141414] rounded-full overflow-hidden flex">
          <div
            className="h-full bg-[#00d9c4] transition-all duration-1000 ease-out"
            style={{ width: `${cryptoPercent}%` }}
          />
          <div
            className="h-full bg-[#d4af37] transition-all duration-1000 ease-out"
            style={{ width: `${idxPercent}%` }}
          />
        </div>

        {/* Mobile allocation text */}
        <div className="flex justify-between text-[10px] font-mono tracking-wide sm:hidden">
          <span className="text-[#00d9c4]">Crypto {cryptoPercent.toFixed(1)}%</span>
          <span className="text-[#d4af37]">IDX {idxPercent.toFixed(1)}%</span>
        </div>

        {/* Sub-totals */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00d9c4]" />
            <span className="text-[10px] md:text-xs font-mono text-[#888]">
              Crypto: {formatUSD(cryptoTotal)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
            <span className="text-[10px] md:text-xs font-mono text-[#888]">
              IDX: {formatUSD(idxTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
