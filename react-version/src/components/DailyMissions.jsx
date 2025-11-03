import React, { useState, useEffect } from 'react';

/**
 * DailyMissions Component
 * Shows daily tasks/objectives with rewards
 * Displays on the menu screen (right side)
 */
export default function DailyMissions() {
  const [missions, setMissions] = useState([]);
  const [timeUntilReset, setTimeUntilReset] = useState('');

  // Daily missions with objectives and rewards
  const dailyMissions = [
    {
      id: 1,
      title: 'Speed Demon',
      description: 'Complete 5 runs',
      progress: 2,
      total: 5,
      reward: '100 Coins',
      icon: '⚡',
      completed: false,
    },
    {
      id: 2,
      title: 'Coin Collector',
      description: 'Collect 500 coins',
      progress: 320,
      total: 500,
      reward: '50 Coins',
      icon: '💰',
      completed: false,
    },
    {
      id: 3,
      title: 'High Score',
      description: 'Score 10,000 points',
      progress: 7500,
      total: 10000,
      reward: '0.001 ETH',
      icon: '🏆',
      completed: false,
    },
    {
      id: 4,
      title: 'Marathon',
      description: 'Play for 30 minutes',
      progress: 18,
      total: 30,
      reward: '75 Coins',
      icon: '⏱️',
      completed: false,
    },
    {
      id: 5,
      title: 'Perfect Run',
      description: 'Complete without dying',
      progress: 0,
      total: 1,
      reward: '200 Coins',
      icon: '✨',
      completed: false,
    },
    {
      id: 6,
      title: 'Social',
      description: 'Share on Twitter',
      progress: 0,
      total: 1,
      reward: '25 Coins',
      icon: '🐦',
      completed: false,
    },
  ];

  useEffect(() => {
    // Initialize missions (in real app, fetch from API)
    setMissions(dailyMissions);

    // Calculate time until daily reset (midnight UTC)
    const updateResetTimer = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setUTCHours(24, 0, 0, 0);
      
      const diff = midnight - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilReset(`${hours}h ${minutes}m`);
    };

    updateResetTimer();
    const interval = setInterval(updateResetTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleClaimReward = (missionId) => {
    const mission = missions.find(m => m.id === missionId);
    if (mission && mission.progress >= mission.total && !mission.completed) {
      setMissions(missions.map(m => 
        m.id === missionId ? { ...m, completed: true } : m
      ));
      alert(`Claimed reward: ${mission.reward}! 🎉`);
    }
  };

  const getProgressPercentage = (progress, total) => {
    return Math.min((progress / total) * 100, 100);
  };

  return (
    <div className="fixed right-4 top-24 bottom-4 w-72 z-[100] hidden lg:block">
      <div
        className="h-full bg-zerion-blue-dark/95 border-4 border-zerion-yellow rounded-lg overflow-hidden flex flex-col"
        style={{
          boxShadow: '0 8px 32px rgba(255, 215, 0, 0.2)',
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-zerion-blue to-zerion-blue-dark p-4 border-b-4 border-zerion-yellow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-pixel text-zerion-yellow font-bold">
              📋 DAILY MISSIONS
            </h3>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-pixel">ACTIVE</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-pixel text-zerion-blue-light">
              Complete to earn rewards
            </p>
            <p className="text-xs font-pixel text-orange-400">
              ⏰ {timeUntilReset}
            </p>
          </div>
        </div>

        {/* Missions List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
          <div className="space-y-3">
            {missions.map((mission) => {
              const progressPercent = getProgressPercentage(mission.progress, mission.total);
              const isComplete = mission.progress >= mission.total;
              const isClaimed = mission.completed;

              return (
                <div
                  key={mission.id}
                  className={`
                    rounded-lg border-2 p-3 transition-all duration-200
                    ${isClaimed 
                      ? 'bg-green-900/20 border-green-500/50 opacity-60' 
                      : isComplete 
                        ? 'bg-yellow-500/10 border-zerion-yellow animate-pulse' 
                        : 'bg-zerion-blue-medium/50 border-zerion-blue hover:bg-zerion-blue-medium/70'
                    }
                  `}
                >
                  {/* Mission Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{mission.icon}</span>
                      <div>
                        <h4 className="text-xs font-pixel text-white font-bold">
                          {mission.title}
                        </h4>
                        <p className="text-xs font-pixel text-zerion-blue-light">
                          {mission.description}
                        </p>
                      </div>
                    </div>
                    {isClaimed && (
                      <span className="text-lg">✅</span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-pixel text-zerion-light">
                        {mission.progress} / {mission.total}
                      </span>
                      <span className="text-xs font-pixel text-zerion-yellow">
                        {Math.round(progressPercent)}%
                      </span>
                    </div>
                    <div className="h-2 bg-zerion-blue-dark rounded-full overflow-hidden border border-zerion-blue">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isComplete 
                            ? 'bg-gradient-to-r from-green-400 to-green-600' 
                            : 'bg-gradient-to-r from-blue-400 to-blue-600'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Reward & Action */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-pixel text-zerion-blue-light">
                        Reward:
                      </span>
                      <span className="text-xs font-pixel text-zerion-yellow font-bold">
                        {mission.reward}
                      </span>
                    </div>
                    
                    {!isClaimed && isComplete && (
                      <button
                        onClick={() => handleClaimReward(mission.id)}
                        className="text-xs font-pixel bg-zerion-yellow text-black px-3 py-1 rounded font-bold hover:bg-yellow-300 transition-colors"
                      >
                        CLAIM
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="bg-zerion-blue-dark/80 p-3 border-t-4 border-zerion-blue">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-zerion-blue-medium/50 rounded p-2">
              <p className="text-xs font-pixel text-zerion-blue-light">Completed</p>
              <p className="text-lg font-pixel text-green-400 font-bold">
                {missions.filter(m => m.completed).length}/{missions.length}
              </p>
            </div>
            <div className="bg-zerion-blue-medium/50 rounded p-2">
              <p className="text-xs font-pixel text-zerion-blue-light">Total Earned</p>
              <p className="text-lg font-pixel text-zerion-yellow font-bold">
                {missions.filter(m => m.completed).length * 50}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}