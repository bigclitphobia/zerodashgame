import React, { useEffect, useState } from 'react';

/**
 * UserProfileSidebar Component
 * Displays current user's stats and progress during gameplay
 * Shows: Best Score, Total Coins, Games Played, Win Rate, etc.
 */
export default function UserProfileSidebar({ isVisible, walletAddress }) {
  const [userStats, setUserStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetch user stats
   * TODO: Replace with actual API call
   */
  const fetchUserStats = async () => {
    setIsLoading(true);
    
    // Simulated data - replace with actual API
    const mockStats = {
      bestScore: 12450,
      totalCoins: 45670,
      gamesPlayed: 127,
      totalPlayTime: '8h 32m',
      averageScore: 8920,
      rank: 156,
      achievements: 12,
      streakDays: 5,
      level: 18,
      xp: 3250,
      xpToNextLevel: 5000,
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    setUserStats(mockStats);
    setIsLoading(false);
  };

  /**
   * Initial load
   */
  useEffect(() => {
    if (isVisible && walletAddress) {
      fetchUserStats();
    }
  }, [isVisible, walletAddress]);

  /**
   * Format wallet address
   */
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  /**
   * Calculate XP percentage
   */
  const xpPercentage = userStats 
    ? Math.round((userStats.xp / userStats.xpToNextLevel) * 100)
    : 0;

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 w-64 z-[400] hidden lg:block">
      <div
        className="bg-zerion-blue-dark/95 border-4 border-zerion-yellow rounded-lg overflow-hidden"
        style={{
          boxShadow: '0 8px 32px rgba(255, 215, 0, 0.2)',
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-zerion-blue to-zerion-blue-dark p-4 border-b-4 border-zerion-yellow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-zerion-yellow to-orange-500 rounded-lg flex items-center justify-center text-2xl border-2 border-zerion-yellow-dark">
              👤
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-pixel text-zerion-blue-light">PLAYER</p>
              <p className="text-sm font-pixel text-zerion-yellow font-bold truncate">
                {truncateAddress(walletAddress)}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Content */}
        <div className="custom-scrollbar overflow-y-auto" style={{ maxHeight: '500px' }}>
          {isLoading ? (
            <div className="p-8 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-4 border-zerion-yellow border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-pixel text-zerion-blue-light">Loading stats...</p>
            </div>
          ) : userStats ? (
            <div className="p-4 space-y-4">
              {/* Level & XP */}
              <div className="bg-zerion-blue-medium/50 border-2 border-zerion-blue rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-pixel text-zerion-blue-light">LEVEL</span>
                  <span className="text-lg font-pixel text-zerion-yellow font-bold">
                    {userStats.level}
                  </span>
                </div>
                <div className="relative h-3 bg-zerion-blue-dark rounded-full overflow-hidden border-2 border-zerion-blue">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-zerion-yellow transition-all duration-500"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
                <p className="text-xs font-pixel text-zerion-blue-light mt-1 text-center">
                  {userStats.xp} / {userStats.xpToNextLevel} XP
                </p>
              </div>

              {/* Best Score */}
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-zerion-yellow rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">🏆</span>
                  <span className="text-xs font-pixel text-zerion-blue-light">BEST SCORE</span>
                </div>
                <p className="text-2xl font-pixel text-zerion-yellow font-bold text-center">
                  {userStats.bestScore.toLocaleString()}
                </p>
              </div>

              {/* Total Coins */}
              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-2 border-zerion-yellow rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">💰</span>
                  <span className="text-xs font-pixel text-zerion-blue-light">TOTAL COINS</span>
                </div>
                <p className="text-2xl font-pixel text-zerion-yellow font-bold text-center">
                  {userStats.totalCoins.toLocaleString()}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2">
                {/* Games Played */}
                <div className="bg-zerion-blue-medium/50 border-2 border-zerion-blue rounded-lg p-2">
                  <p className="text-xs font-pixel text-zerion-blue-light text-center mb-1">
                    GAMES
                  </p>
                  <p className="text-lg font-pixel text-zerion-light font-bold text-center">
                    {userStats.gamesPlayed}
                  </p>
                </div>

                {/* Global Rank */}
                <div className="bg-zerion-blue-medium/50 border-2 border-zerion-blue rounded-lg p-2">
                  <p className="text-xs font-pixel text-zerion-blue-light text-center mb-1">
                    RANK
                  </p>
                  <p className="text-lg font-pixel text-zerion-light font-bold text-center">
                    #{userStats.rank}
                  </p>
                </div>

                {/* Average Score */}
                <div className="bg-zerion-blue-medium/50 border-2 border-zerion-blue rounded-lg p-2">
                  <p className="text-xs font-pixel text-zerion-blue-light text-center mb-1">
                    AVG
                  </p>
                  <p className="text-sm font-pixel text-zerion-light font-bold text-center">
                    {userStats.averageScore.toLocaleString()}
                  </p>
                </div>

                {/* Achievements */}
                <div className="bg-zerion-blue-medium/50 border-2 border-zerion-blue rounded-lg p-2">
                  <p className="text-xs font-pixel text-zerion-blue-light text-center mb-1">
                    🎯 ACH
                  </p>
                  <p className="text-lg font-pixel text-zerion-light font-bold text-center">
                    {userStats.achievements}
                  </p>
                </div>
              </div>

              {/* Streak */}
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔥</span>
                    <div>
                      <p className="text-xs font-pixel text-orange-300">STREAK</p>
                      <p className="text-sm font-pixel text-white">
                        {userStats.streakDays} days
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-pixel text-orange-300">PLAYTIME</p>
                    <p className="text-sm font-pixel text-white">
                      {userStats.totalPlayTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-xs font-pixel text-zerion-blue-light">
                No stats available
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-zerion-blue-dark/80 p-3 border-t-4 border-zerion-blue">
          <button
            onClick={fetchUserStats}
            className="w-full text-xs font-pixel text-zerion-yellow hover:text-white transition-colors"
          >
            🔄 REFRESH STATS
          </button>
        </div>
      </div>
    </div>
  );
}