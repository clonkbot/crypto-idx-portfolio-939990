import React, { useState, useEffect } from 'react';
import { PortfolioHeader } from './components/PortfolioHeader';
import { AssetCard } from './components/AssetCard';
import { PortfolioSummary } from './components/PortfolioSummary';
import { MarketIndicator } from './components/MarketIndicator';

// Mock portfolio data
const cryptoAssets = [
  { symbol: 'BTC', name: 'Bitcoin', amount: 0.5, price: 67420.50, change24h: 2.34 },
  { symbol: 'ETH', name: 'Ethereum', amount: 3.2, price: 3891.20, change24h: -1.12 },
  { symbol: 'SOL', name: 'Solana', amount: 25, price: 172.45, change24h: 5.67 },
  { symbol: 'AVAX', name: 'Avalanche', amount: 40, price: 38.92, change24h: 3.21 },
];

const idxAssets = [
  { symbol: 'BBCA', name: 'Bank Central Asia', amount: 500, price: 9875, change24h: 1.25 },
  { symbol: 'TLKM', name: 'Telkom Indonesia', amount: 1000, price: 3450, change24h: -0.58 },
  { symbol: 'BBRI', name: 'Bank Rakyat Indonesia', amount: 800, price: 5125, change24h: 2.10 },
  { symbol: 'ASII', name: 'Astra International', amount: 300, price: 4950, change24h: -1.85 },
];

const IDR_TO_USD = 0.000063;

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeView, setActiveView] = useState<'all' | 'crypto' | 'idx'>('all');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cryptoTotal = cryptoAssets.reduce((sum, asset) => sum + asset.amount * asset.price, 0);
  const idxTotalIDR = idxAssets.reduce((sum, asset) => sum + asset.amount * asset.price, 0);
  const idxTotalUSD = idxTotalIDR * IDR_TO_USD;
  const portfolioTotal = cryptoTotal + idxTotalUSD;

  const cryptoChange = cryptoAssets.reduce((sum, asset) => {
    const value = asset.amount * asset.price;
    return sum + (value * asset.change24h / 100);
  }, 0);

  const idxChangeIDR = idxAssets.reduce((sum, asset) => {
    const value = asset.amount * asset.price;
    return sum + (value * asset.change24h / 100);
  }, 0);

  const totalChange = cryptoChange + (idxChangeIDR * IDR_TO_USD);
  const totalChangePercent = (totalChange / (portfolioTotal - totalChange)) * 100;

  // Check if IDX market is open (Jakarta time: GMT+7, 9:00-16:00, Mon-Fri)
  const jakartaTime = new Date(currentTime.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
  const hour = jakartaTime.getHours();
  const day = jakartaTime.getDay();
  const idxOpen = day >= 1 && day <= 5 && hour >= 9 && hour < 16;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0] selection:bg-[#d4af37] selection:text-[#0a0a0a]">
      {/* Subtle grid texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, #f5f5f0 50px, #f5f5f0 51px),
                           repeating-linear-gradient(90deg, transparent, transparent 50px, #f5f5f0 50px, #f5f5f0 51px)`
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-12">
        <PortfolioHeader currentTime={currentTime} />

        {/* Market Status Bar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-8 md:mb-12">
          <MarketIndicator
            market="CRYPTO"
            status="24/7"
            isOpen={true}
            color="#00d9c4"
          />
          <MarketIndicator
            market="IDX"
            status={idxOpen ? 'OPEN' : 'CLOSED'}
            isOpen={idxOpen}
            color="#d4af37"
          />
        </div>

        {/* Portfolio Summary */}
        <PortfolioSummary
          total={portfolioTotal}
          change={totalChange}
          changePercent={totalChangePercent}
          cryptoTotal={cryptoTotal}
          idxTotal={idxTotalUSD}
        />

        {/* View Toggle */}
        <div className="flex gap-1 mb-6 md:mb-8 bg-[#141414] p-1 rounded-sm w-fit">
          {(['all', 'crypto', 'idx'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-4 md:px-6 py-2 md:py-2.5 text-xs tracking-[0.2em] uppercase font-mono transition-all duration-300 min-h-[44px] ${
                activeView === view
                  ? 'bg-[#1a1a1a] text-[#f5f5f0]'
                  : 'text-[#666] hover:text-[#999]'
              }`}
            >
              {view === 'all' ? 'All' : view === 'crypto' ? 'Crypto' : 'IDX'}
            </button>
          ))}
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Crypto Section */}
          {(activeView === 'all' || activeView === 'crypto') && (
            <div className={`space-y-3 ${activeView === 'all' ? '' : 'lg:col-span-2'}`}>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-2 h-2 rounded-full bg-[#00d9c4] animate-pulse" />
                <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#666] font-mono">Cryptocurrency</span>
              </div>
              {cryptoAssets.map((asset, index) => (
                <AssetCard
                  key={asset.symbol}
                  asset={asset}
                  currency="USD"
                  index={index}
                  accentColor="#00d9c4"
                />
              ))}
            </div>
          )}

          {/* IDX Section */}
          {(activeView === 'all' || activeView === 'idx') && (
            <div className={`space-y-3 ${activeView === 'all' ? '' : 'lg:col-span-2'}`}>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className={`w-2 h-2 rounded-full bg-[#d4af37] ${idxOpen ? 'animate-pulse' : 'opacity-50'}`} />
                <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#666] font-mono">Indonesia Stock Exchange</span>
              </div>
              {idxAssets.map((asset, index) => (
                <AssetCard
                  key={asset.symbol}
                  asset={asset}
                  currency="IDR"
                  index={index}
                  accentColor="#d4af37"
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 md:mt-24 pt-6 md:pt-8 border-t border-[#1a1a1a]">
          <p className="text-[10px] md:text-xs text-[#444] font-mono tracking-wide text-center">
            Requested by @0xgusion666 · Built by @clonkbot
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
