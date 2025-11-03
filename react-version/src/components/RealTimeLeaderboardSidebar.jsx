import React, { useEffect, useState } from 'react';

/**
 * RealTimeLeaderboardSidebar Component
 * Displays live leaderboard during gameplay
 * Shows top 10 players with their scores
 * Updates in real-time (simulated for now)
 */
export default function RealTimeLeaderboardSidebar({ isVisible, currentUserAddress }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetch leaderboard data
   * TODO: Replace with actual API call
   */
  const fetchLeaderboard = async () => {
    setIsLoading(true);
    
    // Simulated data - replace with actual API
    const mockData = [
      { rank: 1, address: '0x1a2b...3c4d', score: 15420, isOnline: true },
      { rank: 2, address: '0x5e6f...7g8h', score: 14850, isOnline: true },
      { rank: 3, address: '0x9i0j...1k2l', score: 13290, isOnline: false },
      { rank: 4, address: '0x3m4n...5o6p', score: 12100, isOnline: true },
      { rank: 5, address: '0x7q8r...9s0t', score: 11450, isOnline: true },
      { rank: 6, address: '0x1u2v...3w4x', score: 10800, isOnline: false },
      { rank: 7, address: '0x5y6z...7a8b', score: 9950, isOnline: true },
      { rank: 8, address: '0x9c0d...1e2f', score: 9200, isOnline: false },
      { rank: 9, address: '0x3g4h...5i6j', score: 8750, isOnline: true },
      { rank: 10, address: '0x7k8l...9m0n', score: 8100, isOnline: false },
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setLeaderboard(mockData);
    setIsLoading(false);
  };

  /**
   * Initial load and periodic refresh
   */
  useEffect(() => {
    if (isVisible) {
      fetchLeaderboard();
      
      // Refresh every 10 seconds
      const interval = setInterval(fetchLeaderboard, 10000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  /**
   * Get rank color based on position
   */
  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-orange-600';
    return 'text-blue-300';
  };

  /**
   * Get rank icon
   */
  const getRankIcon = (rank) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '•';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 w-64 z-[400] hidden lg:block">
      <div
        className="bg-zerion-blue-dark/95 border-4 border-zerion-yellow rounded-lg overflow-hidden"
        style={{
          boxShadow: '0 8px 32px rgba(255, 215, 0, 0.2)',
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-zerion-blue to-zerion-blue-dark p-4 border-b-4 border-zerion-yellow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-pixel text-zerion-yellow font-bold">
              🏆 LIVE RANKINGS
            </h3>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-pixel">LIVE</span>
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="custom-scrollbar overflow-y-auto" style={{ maxHeight: '500px' }}>
          {isLoading ? (
            <div className="p-8 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-4 border-zerion-yellow border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-pixel text-zerion-blue-light">Loading...</p>
            </div>
          ) : (
            <div className="p-2">
              {leaderboard.map((player) => {
                const isCurrentUser = player.address === currentUserAddress;
                
                return (
                  <div
                    key={player.rank}
                    className={`
                      mb-2 p-3 rounded border-2 transition-all duration-200
                      ${isCurrentUser 
                        ? 'bg-zerion-yellow/20 border-zerion-yellow animate-pulse' 
                        : 'bg-zerion-blue-medium/50 border-zerion-blue hover:bg-zerion-blue-medium/70'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between gap-2">
                      {/* Rank & Icon */}
                      <div className="flex items-center gap-2 min-w-[50px]">
                        <span className="text-lg">{getRankIcon(player.rank)}</span>
                        <span className={`font-pixel text-sm font-bold ${getRankColor(player.rank)}`}>
                          #{player.rank}
                        </span>
                      </div>

                      {/* Address */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-pixel text-zerion-light truncate">
                            {isCurrentUser ? '👤 YOU' : player.address}
                          </p>
                          {player.isOnline && (
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />
                          )}
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <p className="text-xs font-pixel text-zerion-yellow font-bold">
                          {player.score.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-zerion-blue-dark/80 p-3 border-t-4 border-zerion-blue">
          <p className="text-xs font-pixel text-zerion-blue-light text-center">
            Updates every 10s
          </p>
        </div>
      </div>
    </div>
  );
}