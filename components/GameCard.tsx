import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(game)}
      className="bg-gray-800/50 border border-gray-700 rounded-lg p-5 flex-shrink-0 w-80 cursor-pointer hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <img src={game.teamA.logoUrl} alt={game.teamA.name} className="w-10 h-10 rounded-full" />
          <span className="font-semibold">{game.teamA.name}</span>
        </div>
        <span className="text-gray-400 text-2xl font-light">@</span>
        <div className="flex items-center space-x-3">
          <span className="font-semibold">{game.teamB.name}</span>
          <img src={game.teamB.logoUrl} alt={game.teamB.name} className="w-10 h-10 rounded-full" />
        </div>
      </div>
      <div className="text-center text-lime-400 text-sm font-medium">{game.time}</div>
    </div>
  );
};

export default GameCard;
