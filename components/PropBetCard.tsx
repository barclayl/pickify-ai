
import React, { useState } from 'react';
import { PropBet } from '../types';

interface PropBetCardProps {
  bet: PropBet;
}

const PropBetCard: React.FC<PropBetCardProps> = ({ bet }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const confidenceColor = bet.aiConfidence > 85 ? 'bg-lime-500' : bet.aiConfidence > 70 ? 'bg-yellow-500' : 'bg-orange-500';
  const confidenceGlow = bet.aiConfidence > 85 ? 'shadow-lime-500/40' : bet.aiConfidence > 70 ? 'shadow-yellow-500/40' : 'shadow-orange-500/40';

  return (
    <div className="relative bg-gray-800/60 rounded-lg p-4 pl-6 border border-gray-700 mb-4 transition-all duration-300">
      <div 
        className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-lg ${confidenceColor} shadow-lg ${confidenceGlow}`}
        title={`AI Confidence: ${bet.aiConfidence}%`}
      ></div>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <img src={bet.player.photoUrl} alt={bet.player.name} className="w-16 h-16 rounded-full border-2 border-gray-600" />
        </div>
        <div className="flex-grow ml-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-lg">{bet.player.name}</p>
              <p className="text-sm text-gray-400">{bet.player.team}</p>
            </div>
          </div>
          <div className="my-3">
            <p className="text-2xl font-bold">
              {bet.type} {bet.line} <span className="text-gray-300 font-normal">{bet.stat}</span>
            </p>
            <p className="text-xl font-semibold text-blue-400">{bet.odds}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-300">AI Confidence</span>
          <span className={`text-sm font-bold ${bet.aiConfidence > 85 ? 'text-lime-400' : 'text-yellow-400'}`}>{bet.aiConfidence}%</span>
        </div>
      </div>
      
      <div className="mt-4">
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-blue-400 text-sm font-semibold hover:text-blue-300">
          Why the AI Likes This {isExpanded ? '▲' : '▼'}
        </button>
        {isExpanded && (
          <div className="mt-2 text-gray-300 text-sm bg-gray-900/50 p-3 rounded-md border border-gray-700">
            <ul className="list-disc list-inside space-y-1">
              {bet.aiReasoning.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropBetCard;
