
import React from 'react';
import { Game } from '../types';
import PropBetCard from '../components/PropBetCard';

interface GameViewProps {
  game: Game;
  unlockedGameIds: string[];
  onUnlockGame: (gameId: string) => void;
}

const GameView: React.FC<GameViewProps> = ({ game, unlockedGameIds, onUnlockGame }) => {
  const isUnlocked = unlockedGameIds.includes(game.id);

  const handleUnlock = () => {
    onUnlockGame(game.id);
  };

  const top3Props = [...game.props].sort((a, b) => b.aiConfidence - a.aiConfidence).slice(0, 3);
  
  const LockedView = () => (
    <div className="text-center bg-gray-800/50 border-2 border-dashed border-blue-500 rounded-xl p-8 md:p-12">
      <h3 className="text-3xl font-bold text-blue-400 mb-3">Unlock the AI's Top Picks</h3>
      <p className="text-gray-300 mb-8 max-w-lg mx-auto">
        Purchase access to see the top 3 AI-selected prop bets for the {game.teamA.name} vs. {game.teamB.name} game. Get the data-driven edge you need.
      </p>
      <button
        onClick={handleUnlock}
        className="bg-lime-600 text-white font-bold py-4 px-8 text-lg rounded-lg hover:bg-lime-500 transition-all duration-300 shadow-lg shadow-lime-600/30 transform hover:scale-105"
      >
        Unlock 3 Best Bets for $9.99
      </button>
    </div>
  );

  const UnlockedView = () => (
    <>
      <div className="mb-8 p-4 bg-blue-900/20 border border-blue-500/50 rounded-lg">
        <h3 className="text-lg font-bold text-blue-400 mb-2">The AI Edge</h3>
        <p className="text-gray-300">{game.aiEdge}</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4 border-b-2 border-gray-700 pb-2">Top 3 AI Prop Bets</h3>
        {top3Props.length > 0 ? (
            top3Props.map(bet => (
                <PropBetCard 
                  key={bet.id} 
                  bet={bet}
                />
            ))
        ) : (
            <div className="text-center text-gray-400 bg-gray-900/40 p-6 rounded-lg">
                <p>The AI is still analyzing this game. Top props will be available soon.</p>
            </div>
        )}
      </div>
    </>
  );

  return (
    <div>
      <header className="bg-gray-800/50 rounded-lg p-4 mb-8 flex justify-between items-center border border-gray-700">
        <div className="flex items-center space-x-4">
          <img src={game.teamA.logoUrl} alt={game.teamA.name} className="w-12 h-12 rounded-full" />
          <h2 className="text-xl md:text-2xl font-bold">{game.teamA.name}</h2>
        </div>
        <div className="text-center">
            <span className="text-3xl font-light text-gray-400">VS</span>
            <p className="text-sm text-lime-400">{game.time}</p>
        </div>
        <div className="flex items-center space-x-4">
          <h2 className="text-xl md:text-2xl font-bold text-right">{game.teamB.name}</h2>
          <img src={game.teamB.logoUrl} alt={game.teamB.name} className="w-12 h-12 rounded-full" />
        </div>
      </header>
      
      {isUnlocked ? <UnlockedView /> : <LockedView />}
      
    </div>
  );
};

export default GameView;
