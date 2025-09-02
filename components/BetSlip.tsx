
import React, { useState } from 'react';
import { PropBet } from '../types';

interface BetSlipProps {
  bets: PropBet[];
  onRemoveBet: (betId: string) => void;
  onNavigateToSubscription: () => void;
  onPurchase: () => void;
}

const BetSlip: React.FC<BetSlipProps> = ({ bets, onRemoveBet, onNavigateToSubscription, onPurchase }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const betCount = bets.length;
  const isFull = betCount === 3;

  if (betCount === 0 && !isExpanded) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-sm border-t-2 border-lime-500/50 shadow-2xl shadow-black transition-all duration-500 ease-in-out ${isExpanded ? 'h-3/4' : 'h-24'}`}>
      <div className="container mx-auto px-4 h-full flex flex-col">
        <div 
          className="flex justify-between items-center py-3 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-3">
            <span className="bg-lime-500 text-gray-900 font-bold rounded-full h-8 w-8 flex items-center justify-center">
              {betCount}
            </span>
            <h3 className="text-xl font-bold">
              Bet Slip <span className="font-normal text-gray-400">({betCount}/3 Selected)</span>
            </h3>
          </div>
          <button className="text-2xl text-gray-300 transform transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}}>
            ▲
          </button>
        </div>

        {isExpanded && (
          <div className="flex-grow overflow-y-auto pt-2 pb-20">
            {bets.length > 0 ? (
              bets.map(bet => (
                <div key={bet.id} className="bg-gray-700/50 rounded-lg p-3 mb-2 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{bet.player.name}</p>
                    <p className="text-sm text-gray-300">{bet.type} {bet.line} {bet.stat}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-400">{bet.odds}</p>
                    <button onClick={() => onRemoveBet(bet.id)} className="text-xs text-red-400 hover:text-red-300">
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-400">
                <p>Your bet slip is empty.</p>
                <p>Add up to 3 bets to get started.</p>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-gray-900/50 border border-blue-500/30 rounded-lg text-center">
                <p className="text-gray-300">Want more bets?</p>
                <button 
                    onClick={onNavigateToSubscription} 
                    className="font-bold text-blue-400 hover:text-blue-300 transition-colors"
                >
                    Unlock unlimited access
                </button>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-700">
          <button
            onClick={onPurchase}
            disabled={!isFull}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
              isFull 
              ? 'bg-lime-500 text-gray-900 animate-pulse shadow-lg shadow-lime-500/40' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isFull ? 'Purchase 3 Bets ($9.99)' : `Add ${3 - betCount} more bet${3 - betCount > 1 ? 's' : ''}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetSlip;
