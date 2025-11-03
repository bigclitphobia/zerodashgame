import React, { useState } from 'react';

/**
 * CharacterMarketplace Component - FIXED VERSION
 * Shows available characters for purchase with ETH prices
 * Features:
 * - Working scroll functionality
 * - Interactive click with modal
 * - Ready for blockchain integration
 * - Better visual feedback
 */
export default function CharacterMarketplace() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // 28 unique characters with names, prices, and emojis
  const characters = [
    { id: 1, name: 'Runner', price: 0.001, emoji: '🏃', rarity: 'common' },
    { id: 2, name: 'Ninja', price: 0.002, emoji: '🥷', rarity: 'common' },
    { id: 3, name: 'Knight', price: 0.003, emoji: '⚔️', rarity: 'common' },
    { id: 4, name: 'Wizard', price: 0.004, emoji: '🧙', rarity: 'rare' },
    { id: 5, name: 'Robot', price: 0.005, emoji: '🤖', rarity: 'rare' },
    { id: 6, name: 'Alien', price: 0.006, emoji: '👽', rarity: 'rare' },
    { id: 7, name: 'Pirate', price: 0.007, emoji: '🏴‍☠️', rarity: 'rare' },
    { id: 8, name: 'Astronaut', price: 0.008, emoji: '👨‍🚀', rarity: 'epic' },
    { id: 9, name: 'Samurai', price: 0.009, emoji: '🗾', rarity: 'epic' },
    { id: 10, name: 'Vampire', price: 0.01, emoji: '🧛', rarity: 'epic' },
    { id: 11, name: 'Zombie', price: 0.011, emoji: '🧟', rarity: 'epic' },
    { id: 12, name: 'Ghost', price: 0.012, emoji: '👻', rarity: 'epic' },
    { id: 13, name: 'Demon', price: 0.015, emoji: '😈', rarity: 'legendary' },
    { id: 14, name: 'Angel', price: 0.015, emoji: '😇', rarity: 'legendary' },
    { id: 15, name: 'Dragon', price: 0.02, emoji: '🐉', rarity: 'legendary' },
    { id: 16, name: 'Phoenix', price: 0.02, emoji: '🔥', rarity: 'legendary' },
    { id: 17, name: 'Cyborg', price: 0.013, emoji: '🦾', rarity: 'epic' },
    { id: 18, name: 'Mage', price: 0.014, emoji: '🔮', rarity: 'epic' },
    { id: 19, name: 'Archer', price: 0.004, emoji: '🏹', rarity: 'rare' },
    { id: 20, name: 'Warrior', price: 0.005, emoji: '🛡️', rarity: 'rare' },
    { id: 21, name: 'Thief', price: 0.003, emoji: '🗡️', rarity: 'common' },
    { id: 22, name: 'Monk', price: 0.006, emoji: '🙏', rarity: 'rare' },
    { id: 23, name: 'Paladin', price: 0.016, emoji: '⚡', rarity: 'legendary' },
    { id: 24, name: 'Necro', price: 0.018, emoji: '💀', rarity: 'legendary' },
    { id: 25, name: 'Elf', price: 0.007, emoji: '🧝', rarity: 'rare' },
    { id: 26, name: 'Dwarf', price: 0.008, emoji: '⛏️', rarity: 'epic' },
    { id: 27, name: 'Titan', price: 0.025, emoji: '⚔️', rarity: 'mythic' },
    { id: 28, name: 'God', price: 0.05, emoji: '⚡', rarity: 'mythic' },
  ];

  const getRarityColor = (rarity) => {
    const colors = {
      common: 'border-gray-400 bg-gray-400/10',
      rare: 'border-blue-400 bg-blue-400/10',
      epic: 'border-purple-400 bg-purple-400/10',
      legendary: 'border-yellow-400 bg-yellow-400/10',
      mythic: 'border-red-400 bg-red-400/10',
    };
    return colors[rarity] || colors.common;
  };

  const getRarityBadge = (rarity) => {
    const badges = {
      common: '⚪',
      rare: '🔵',
      epic: '🟣',
      legendary: '🟡',
      mythic: '🔴',
    };
    return badges[rarity] || badges.common;
  };

  const handleBuyClick = (character) => {
    setSelectedCharacter(character);
    setShowPurchaseModal(true);
    console.log('Character selected:', character.name);
  };

  const handleConfirmPurchase = async () => {
    // TODO: Add your blockchain logic here
    console.log('Purchasing:', selectedCharacter.name, 'for', selectedCharacter.price, 'ETH');
    
    /* EXAMPLE BLOCKCHAIN INTEGRATION:
    
    try {
      // Using ethers.js
      const tx = await contract.buyCharacter(
        selectedCharacter.id, 
        { value: ethers.utils.parseEther(selectedCharacter.price.toString()) }
      );
      
      // Wait for confirmation
      await tx.wait();
      
      alert(`✅ Success! You now own ${selectedCharacter.name}!`);
      
      // Update user's owned characters
      // fetchOwnedCharacters();
      
    } catch (error) {
      console.error('Purchase failed:', error);
      alert(`❌ Purchase failed: ${error.message}`);
    }
    
    */
    
    // For now, just show alert
    alert(`✅ Purchase initiated!\n\nCharacter: ${selectedCharacter.name}\nPrice: ${selectedCharacter.price} ETH\n\n💡 Add your blockchain logic in handleConfirmPurchase()`);
    
    setShowPurchaseModal(false);
  };

  const handleCancelPurchase = () => {
    setShowPurchaseModal(false);
    setSelectedCharacter(null);
  };

  return (
    <>
      <div className="fixed left-4 top-24 bottom-4 w-72 z-[100] hidden lg:block">
        <div
          className="h-full bg-zerion-blue-dark/95 border-4 border-zerion-yellow rounded-lg overflow-hidden flex flex-col"
          style={{
            boxShadow: '0 8px 32px rgba(255, 215, 0, 0.2)',
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-zerion-blue to-zerion-blue-dark p-4 border-b-4 border-zerion-yellow flex-shrink-0">
            <h3 className="text-sm font-pixel text-zerion-yellow font-bold text-center">
              🛒 CHARACTER SHOP
            </h3>
            <p className="text-xs font-pixel text-zerion-blue-light text-center mt-1">
              28 Unique Heroes • Click to Buy
            </p>
          </div>

          {/* Character Grid - FIXED SCROLLING */}
          <div 
            className="flex-1 overflow-y-auto p-3"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#3b82f6 rgba(0,0,0,0.3)',
            }}
          >
            <div className="grid grid-cols-2 gap-2">
              {characters.map((character) => (
                <button
                  key={character.id}
                  onClick={() => handleBuyClick(character)}
                  className={`
                    relative rounded-lg border-2 p-2 
                    transition-all duration-200 cursor-pointer
                    hover:scale-105 hover:shadow-xl
                    active:scale-95
                    ${getRarityColor(character.rarity)}
                  `}
                  style={{
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Rarity Badge */}
                  <div className="absolute -top-1 -right-1 text-xs">
                    {getRarityBadge(character.rarity)}
                  </div>

                  {/* Character Emoji */}
                  <div className="text-3xl text-center mb-1 transition-transform duration-200 hover:scale-110">
                    {character.emoji}
                  </div>

                  {/* Character Name */}
                  <p className="text-xs font-pixel text-center text-white font-bold truncate mb-1">
                    {character.name}
                  </p>

                  {/* Price */}
                  <div className="bg-black/60 rounded px-2 py-1 border border-zerion-yellow/50">
                    <p className="text-xs font-pixel text-zerion-yellow text-center font-bold">
                      {character.price} ETH
                    </p>
                  </div>

                  {/* Click indicator overlay */}
                  <div className="absolute inset-0 bg-zerion-yellow/0 hover:bg-zerion-yellow/20 rounded-lg transition-all duration-200 pointer-events-none flex items-center justify-center opacity-0 hover:opacity-100">
                    <span className="text-xs font-pixel text-white font-bold bg-black/80 px-3 py-1 rounded-full border-2 border-zerion-yellow">
                      CLICK TO BUY
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-zerion-blue-dark/80 p-3 border-t-4 border-zerion-blue flex-shrink-0">
            <div className="flex items-center justify-between text-xs font-pixel mb-2">
              <span className="text-white font-bold">Rarity Legend:</span>
            </div>
            <div className="grid grid-cols-5 gap-1 text-xs">
              <div className="text-center">
                <span className="text-gray-400">⚪</span>
              </div>
              <div className="text-center">
                <span className="text-blue-400">🔵</span>
              </div>
              <div className="text-center">
                <span className="text-purple-400">🟣</span>
              </div>
              <div className="text-center">
                <span className="text-yellow-400">🟡</span>
              </div>
              <div className="text-center">
                <span className="text-red-400">🔴</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Scrollbar Styles */}
        <style jsx>{`
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 4px;
          }
          div::-webkit-scrollbar-thumb {
            background: #3b82f6;
            border-radius: 4px;
            border: 2px solid rgba(0, 0, 0, 0.3);
          }
          div::-webkit-scrollbar-thumb:hover {
            background: #60a5fa;
          }
        `}</style>
      </div>

      {/* Purchase Confirmation Modal */}
      {showPurchaseModal && selectedCharacter && (
        <div 
          className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4"
          onClick={handleCancelPurchase}
        >
          <div 
            className="bg-zerion-blue-dark border-4 border-zerion-yellow rounded-lg p-6 max-w-md w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 0 50px rgba(255, 215, 0, 0.4)',
            }}
          >
            {/* Modal Header */}
            <div className="text-center mb-4">
              <div className="text-6xl mb-3 animate-bounce">{selectedCharacter.emoji}</div>
              <h3 className="text-xl font-pixel text-zerion-yellow font-bold mb-2">
                {selectedCharacter.name}
              </h3>
              <div className={`inline-block px-3 py-1 rounded-lg border-2 ${getRarityColor(selectedCharacter.rarity)}`}>
                <span className="text-xs font-pixel text-white uppercase">
                  {selectedCharacter.rarity}
                </span>
              </div>
            </div>

            {/* Price Display */}
            <div className="bg-zerion-blue-medium/50 border-2 border-zerion-blue rounded-lg p-4 mb-4">
              <p className="text-xs font-pixel text-zerion-blue-light text-center mb-2">
                PURCHASE PRICE
              </p>
              <p className="text-3xl font-pixel text-zerion-yellow text-center font-bold">
                {selectedCharacter.price} ETH
              </p>
              <p className="text-xs font-pixel text-zerion-light text-center mt-2">
                ≈ ${(selectedCharacter.price * 2000).toFixed(2)} USD
              </p>
            </div>

            {/* Character Benefits */}
            <div className="bg-green-900/20 border-2 border-green-500/30 rounded-lg p-3 mb-6">
              <p className="text-xs font-pixel text-green-400 mb-2">✨ UNLOCKS:</p>
              <ul className="text-xs font-pixel text-white space-y-1">
                <li>✅ Unique character skin</li>
                <li>✅ Special abilities</li>
                <li>✅ Exclusive animations</li>
                <li>✅ Profile badge</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancelPurchase}
                className="flex-1 pixel-button-secondary text-xs py-3"
              >
                ❌ CANCEL
              </button>
              <button
                onClick={handleConfirmPurchase}
                className="flex-1 pixel-button-primary text-xs py-3"
              >
                ✅ BUY NOW
              </button>
            </div>

            {/* Blockchain Integration Note */}
            <div className="mt-4 bg-blue-900/20 border border-blue-500/30 rounded p-2">
              <p className="text-xs font-pixel text-center text-blue-300">
                💡 Blockchain Integration Point
              </p>
              <p className="text-xs font-pixel text-center text-zerion-light mt-1">
                Add your smart contract logic in handleConfirmPurchase()
              </p>
            </div>
          </div>

          {/* Modal Animation */}
          <style jsx>{`
            @keyframes scale-in {
              from {
                opacity: 0;
                transform: scale(0.8);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            .animate-scale-in {
              animation: scale-in 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
          `}</style>
        </div>
      )}
    </>
  );
}