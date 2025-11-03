import React, { useState } from 'react';
import { useWallet } from './hooks/useWallet';
import WalletConnect from './components/WalletConnect';
import Leaderboard from './components/Leaderboard';
import GameCanvas from './components/GameCanvas';
import RealTimeLeaderboardSidebar from './components/RealTimeLeaderboardSidebar';
import UserProfileSidebar from './components/UserProfileSidebar';
import CharacterMarketplace from './components/CharacterMarketplace';
import DailyMissions from './components/DailyMissions';
import NFTPassStatus from './components/NFTPassStatus';
import Particles from './components/Particles';

/**
 * Main App Component
 * Manages application state and screen flow:
 * 1. Splash Screen (Connect Wallet)
 * 2. Enhanced Menu Screen (Marketplace + Ready + Missions + NFT Status)
 * 3. Game Screen (Unity Canvas + Live Sidebars)
 * 4. Leaderboard Modal (Overlay)
 */
function App() {
  // Wallet state from custom hook
  const {
    walletAddress,
    truncatedAddress,
    isConnecting,
    isConnected,
    error: walletError,
    connectWallet,
  } = useWallet();

  // Screen state
  const [currentScreen, setCurrentScreen] = useState('splash'); // 'splash' | 'menu' | 'game'
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  /**
   * Handle wallet connection
   */
  const handleConnect = async () => {
    const address = await connectWallet();
    if (address) {
      // Transition to menu screen after successful connection
      setTimeout(() => {
        setCurrentScreen('menu');
      }, 300);
    }
  };

  /**
   * Handle game start
   */
  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  /**
   * Handle back to menu from game
   */
  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };

  /**
   * Handle leaderboard open
   */
  const handleOpenLeaderboard = () => {
    setShowLeaderboard(true);
  };

  /**
   * Handle leaderboard close
   */
  const handleCloseLeaderboard = () => {
    setShowLeaderboard(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Particle Animation Background */}
      <Particles />

      {/* Wallet Address Display (Top Right) */}
      {isConnected && (
        <div
          className={`fixed top-5 right-5 z-[1000] px-5 py-3 text-xs font-bold
                      transition-all duration-400
                      ${currentScreen !== 'splash' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}
          style={{
            background: 'linear-gradient(135deg, #0A1628 0%, #1a2d4d 100%)',
            border: '4px solid #ffd700',
            color: '#ffd700',
            textShadow: '2px 2px 0 rgba(0, 0, 0, 0.8)',
            boxShadow: '0 4px 0 #f59e0b, 0 8px 20px rgba(255, 215, 0, 0.4)',
            imageRendering: 'pixelated',
          }}
        >
          {truncatedAddress}
        </div>
      )}

      {/* Splash Screen: Connect Wallet */}
      {currentScreen === 'splash' && (
        <WalletConnect
          onConnect={handleConnect}
          isConnecting={isConnecting}
          error={walletError}
        />
      )}

      {/* Enhanced Menu Screen: NFT Status + Marketplace + Ready + Missions */}
      {currentScreen === 'menu' && (
        <>
          {/* Top: NFT Pass Status */}
          <NFTPassStatus walletAddress={walletAddress} />

          {/* Left: Character Marketplace */}
          <CharacterMarketplace />

          {/* Center: Ready Buttons */}
          <div className="fixed inset-0 flex items-center justify-center p-5 z-[100]">
            <div className="max-w-md w-full flex flex-col items-center gap-6 fade-in">
              {/* Title */}
              <h2
                className="text-4xl md:text-5xl font-pixel text-zerion-yellow"
                style={{ 
                  textShadow: '4px 4px 0 rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.6)' 
                }}
              >
                READY?
              </h2>

              {/* Start Game Button */}
              <button
                onClick={handleStartGame}
                className="pixel-button-primary w-full text-lg"
              >
                🎮 START GAME
              </button>

              {/* Leaderboard Button */}
              <button
                onClick={handleOpenLeaderboard}
                className="pixel-button-secondary w-full"
              >
                🏆 LEADERBOARD
              </button>

              {/* Quick Stats */}
              <div className="mt-4 grid grid-cols-3 gap-3 w-full">
                <div className="bg-zerion-blue-dark/60 border-2 border-zerion-blue rounded-lg p-3 text-center">
                  <p className="text-xs font-pixel text-zerion-blue-light mb-1">BEST</p>
                  <p className="text-lg font-pixel text-zerion-yellow font-bold">12.5K</p>
                </div>
                <div className="bg-zerion-blue-dark/60 border-2 border-zerion-blue rounded-lg p-3 text-center">
                  <p className="text-xs font-pixel text-zerion-blue-light mb-1">COINS</p>
                  <p className="text-lg font-pixel text-zerion-yellow font-bold">45.6K</p>
                </div>
                <div className="bg-zerion-blue-dark/60 border-2 border-zerion-blue rounded-lg p-3 text-center">
                  <p className="text-xs font-pixel text-zerion-blue-light mb-1">RANK</p>
                  <p className="text-lg font-pixel text-zerion-yellow font-bold">#156</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Daily Missions */}
          <DailyMissions />
        </>
      )}

      {/* Game Screen: Unity Canvas with Sidebars */}
      {currentScreen === 'game' && (
        <>
          {/* Left Sidebar: Real-time Leaderboard */}
          <RealTimeLeaderboardSidebar
            isVisible={currentScreen === 'game'}
            currentUserAddress={truncatedAddress}
          />

          {/* Center: Game Canvas */}
          <GameCanvas
            walletAddress={walletAddress}
            isVisible={currentScreen === 'game'}
            onBack={handleBackToMenu}
          />

          {/* Right Sidebar: User Profile */}
          <UserProfileSidebar
            isVisible={currentScreen === 'game'}
            walletAddress={walletAddress}
          />
        </>
      )}

      {/* Leaderboard Modal (can be opened from menu) */}
      <Leaderboard
        isOpen={showLeaderboard}
        onClose={handleCloseLeaderboard}
      />

      {/* Debug Info (Development Only) */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-2 left-2 text-xs opacity-50 font-mono bg-black/50 p-2 rounded z-[9999]">
          <div>Screen: {currentScreen}</div>
          <div>Wallet: {isConnected ? '✅' : '❌'}</div>
          <div>Address: {truncatedAddress || 'Not connected'}</div>
        </div>
      )}
    </div>
  );
}

export default App;