import React, { useState, useEffect } from 'react';

interface Asset {
  symbol: string;
  name: string;
  amount: number;
  price: number;
  change24h: number;
}

interface AssetCardProps {
  asset: Asset;
  currency: 'USD' | 'IDR';
  index: number;
  accentColor: string;
}

export function AssetCard({ asset, currency, index, accentColor }: AssetCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const isPositive = asset.change24h >= 0;
  const value = asset.amount * asset.price;

  const formatPrice = (price: number) => {
    if (currency === 'IDR') {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatValue = (val: number) => {
    if (currency === 'IDR') {
      // Show IDR value but also USD equivalent
      const usdEquiv = val * 0.000063;
      return (
        <div className="flex flex-col items-end">
          <span>{new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(val)}</span>
          <span className="text-[10px] text-[#555]">
            ~{new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(usdEquiv)}
          </span>
        </div>
      );
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div
      className={`group relative bg-[#0f0f0f] border border-[#1a1a1a] p-4 md:p-5 transition-all duration-500 hover:border-[#2a2a2a] hover:bg-[#111111] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Hover accent line */}
      <div
        className="absolute left-0 top-0 w-0 h-full transition-all duration-300 group-hover:w-0.5"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex items-start justify-between gap-3">
        {/* Left: Symbol & Name */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 md:gap-3 mb-1">
            <span
              className="text-base md:text-lg font-mono font-medium tracking-wide"
              style={{ color: accentColor }}
            >
              {asset.symbol}
            </span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-sm ${
                isPositive
                  ? 'bg-[#00d9c4]/10 text-[#00d9c4]'
                  : 'bg-[#e85d5d]/10 text-[#e85d5d]'
              }`}
            >
              {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%
            </span>
          </div>
          <p className="text-[10px] md:text-xs text-[#555] font-mono truncate">{asset.name}</p>
        </div>

        {/* Right: Value */}
        <div className="text-right shrink-0">
          <div className="text-sm md:text-base font-mono tracking-wide">
            {formatValue(value)}
          </div>
        </div>
      </div>

      {/* Bottom row: Holdings & Price */}
      <div className="flex justify-between items-end mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#1a1a1a]">
        <div>
          <span className="text-[10px] text-[#444] font-mono tracking-wide uppercase block mb-0.5">
            Holdings
          </span>
          <span className="text-xs md:text-sm font-mono text-[#888]">
            {asset.amount.toLocaleString()} {asset.symbol}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-[#444] font-mono tracking-wide uppercase block mb-0.5">
            Price
          </span>
          <span className="text-xs md:text-sm font-mono text-[#888]">
            {formatPrice(asset.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
