
import React from 'react';
import { PropBet } from '../types';
import { FootballFieldIcon } from './icons';

interface TopBetCardProps {
  bet: PropBet;
}

const TopBetCard: React.FC<TopBetCardProps> = ({ bet }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-transparent hover:border-lime-500 transition-colors duration-300 relative overflow-hidden group">
      <div className="relative z-10">
        <div className="flex items-center mb-3">
          <img src={bet.player.photoUrl} alt={bet.player.name} className="w-12 h-12 rounded-full mr-4 border-2 border-gray-600" />
          <div>
            <p className="font-bold text-lg">{bet.player.name}</p>
            <p className="text-sm text-gray-400">{bet.player.team}</p>
          </div>
        </div>
        <p className="text-xl font-semibold my-2">
          <span className="text-lime-400">{bet.type} {bet.line}</span> {bet.stat}
        </p>
        <p className="text-2xl font-bold text-blue-400">{bet.odds}</p>
      </div>
      <FootballFieldIcon className="absolute -bottom-4 -right-4 w-24 h-24 text-gray-700/50 opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
    </div>
  );
};

export default TopBetCard;
