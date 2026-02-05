import React from 'react';

interface MarketIndicatorProps {
  market: string;
  status: string;
  isOpen: boolean;
  color: string;
}

export function MarketIndicator({ market, status, isOpen, color }: MarketIndicatorProps) {
  return (
    <div className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-2.5 bg-[#0f0f0f] border border-[#1a1a1a] rounded-sm">
      <div
        className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'animate-pulse' : 'opacity-40'}`}
        style={{ backgroundColor: color }}
      />
      <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-[#888]">
        {market}
      </span>
      <span
        className="text-[10px] md:text-xs font-mono tracking-wider font-medium"
        style={{ color: isOpen ? color : '#555' }}
      >
        {status}
      </span>
    </div>
  );
}
