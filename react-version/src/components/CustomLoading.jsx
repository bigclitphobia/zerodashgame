import React, { useEffect, useState } from 'react';

/**
 * CustomLoading Component - RESPONSIVE VERSION
 * Interactive pixel-art loading screen for Unity game
 * Features: Animated runner, particles, loading tips, progress bar
 * Adapts layout for mobile (portrait) and desktop (landscape)
 */
export default function CustomLoading({ progress, isMobile = false }) {
  const [tipIndex, setTipIndex] = useState(0);
  const [runnerPosition, setRunnerPosition] = useState(0);

  // Loading tips that cycle during load
  const loadingTips = [
    'Collect coins to boost your score!',
    'Avoid obstacles',
    'Connect your Zerion wallet for rewards',
    'Jump over gaps to stay alive',
    'Zero Dash NFT give you special level',
    'Compete on the leaderboard!',
    'Temple treasures await...',
  ];

  // Cycle through tips every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % loadingTips.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animate runner position based on progress
  useEffect(() => {
    setRunnerPosition(progress);
  }, [progress]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zerion-blue-dark z-[1000]">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isMobile ? 15 : 20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-zerion-yellow rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      {/* Main loading content */}
      <div className={`relative z-10 text-center px-4 md:px-8 w-full ${isMobile ? 'max-w-sm' : 'max-w-2xl'}`}>
        {/* Logo */}
        <h1
          className={`${isMobile ? 'text-4xl' : 'text-5xl md:text-6xl'} font-pixel text-zerion-yellow mb-4 animate-pulse`}
          style={{
            textShadow: `
              4px 4px 0 #f59e0b,
              0 0 20px rgba(255, 215, 0, 0.8),
              0 0 40px rgba(255, 215, 0, 0.4)
            `,
          }}
        >
          ZERO DASH
        </h1>

        {/* Loading text */}
        <p className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} font-pixel text-zerion-blue-light mb-6 md:mb-8`}>
          Loading Game...
        </p>

        {/* Runner track */}
        <div className="relative mb-6 md:mb-8">
          {/* Track background */}
          <div 
            className={`${isMobile ? 'h-16' : 'h-20'} bg-zerion-blue-medium rounded-lg border-4 border-zerion-blue relative overflow-hidden`}
            style={{
              boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Track lines (like a road) */}
            <div className="absolute inset-0 flex justify-around items-center opacity-20">
              {[...Array(isMobile ? 6 : 10)].map((_, i) => (
                <div key={i} className={`w-1 ${isMobile ? 'h-6' : 'h-8'} bg-zerion-yellow`} />
              ))}
            </div>

            {/* Runner character (pixel block) */}
            <div
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
              style={{ left: `${runnerPosition}%` }}
            >
              {/* Character body */}
              <div className="relative">
                {/* Main body */}
                <div
                  className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} bg-zerion-yellow border-2 border-zerion-yellow-dark`}
                  style={{
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                    animation: 'bounce 0.5s infinite',
                  }}
                />
                {/* Trail effect */}
                <div
                  className="absolute inset-0 bg-zerion-yellow opacity-50 blur-sm"
                  style={{ transform: `translateX(-${isMobile ? 6 : 8}px)` }}
                />
              </div>
            </div>

            {/* Finish line */}
            <div className="absolute right-2 top-0 bottom-0 w-4 flex flex-col justify-around">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 ${i % 2 === 0 ? 'bg-zerion-yellow' : 'bg-white'}`}
                />
              ))}
            </div>
          </div>

          {/* Coins along the track */}
          {[25, 50, 75].map((pos) => (
            <div
              key={pos}
              className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                runnerPosition > pos ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ left: `${pos}%` }}
            >
              <div
                className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} bg-zerion-yellow rounded-full border-2 border-zerion-yellow-dark`}
                style={{
                  boxShadow: '0 0 10px rgba(255, 215, 0, 0.6)',
                  animation: 'spin 2s linear infinite',
                }}
              />
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-4 md:mb-6">
          <div className={`${isMobile ? 'h-5' : 'h-6'} bg-zerion-blue-medium rounded border-4 border-zerion-blue overflow-hidden`}>
            <div
              className="h-full transition-all duration-300 ease-out relative"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #2563eb 0%, #ffd700 100%)',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
              }}
            >
              {/* Shimmer effect */}
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                  animation: 'shimmer 2s infinite',
                }}
              />
            </div>
          </div>

          {/* Percentage */}
          <p className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-pixel text-zerion-yellow mt-3 md:mt-4 font-bold`}>
            {Math.round(progress)}%
          </p>
        </div>

        {/* Loading tip */}
        <div
          className="bg-zerion-blue-medium/50 border-3 border-zerion-blue px-4 md:px-6 py-3 md:py-4 rounded-lg"
          style={{
            borderWidth: '3px',
            minHeight: isMobile ? '70px' : '80px',
          }}
        >
          <p className="text-xs font-pixel text-zerion-blue-light mb-2 opacity-70">
            TIP:
          </p>
          <p
            className={`${isMobile ? 'text-xs' : 'text-sm'} font-pixel text-zerion-light leading-relaxed animate-fade-in`}
            key={tipIndex}
          >
            {loadingTips[tipIndex]}
          </p>
        </div>

        {/* Spinning loader (subtle) */}
        {progress < 100 && (
          <div className="mt-4 md:mt-6 flex justify-center">
            <div
              className={`${isMobile ? 'w-6 h-6 border-3' : 'w-8 h-8 border-4'} border-zerion-blue border-t-zerion-yellow rounded-full`}
              style={{ animation: 'spin 1s linear infinite' }}
            />
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}