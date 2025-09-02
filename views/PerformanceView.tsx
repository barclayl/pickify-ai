import React from 'react';
import { HISTORICAL_BETS } from '../constants';
import { HistoricalBet } from '../types';

const PerformanceView: React.FC = () => {
  const wins = HISTORICAL_BETS.filter(b => b.result === 'Win').length;
  const totalBets = HISTORICAL_BETS.length;
  const winRate = totalBets > 0 ? Math.round((wins / totalBets) * 100) : 0;
  const losses = totalBets - wins;

  const StatCard: React.FC<{ title: string; value: string | number; colorClass: string }> = ({ title, value, colorClass }) => (
    <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-6 text-center">
      <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</p>
      <p className={`text-4xl font-bold mt-2 ${colorClass}`}>{value}</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-10">
        <h2 className="text-4xl font-bold text-blue-400">AI Performance Tracker</h2>
        <p className="text-gray-400 mt-2">Tracking the model's accuracy on recent predictions.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard title="Win Rate" value={`${winRate}%`} colorClass="text-lime-400" />
        <StatCard title="Bets Won" value={wins} colorClass="text-gray-100" />
        <StatCard title="Bets Lost" value={losses} colorClass="text-gray-100" />
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4 text-gray-200">Recent Bet History</h3>
        <div className="bg-gray-800/60 border border-gray-700 rounded-lg overflow-hidden">
          <div className="hidden md:grid md:grid-cols-4 font-semibold text-gray-400 text-sm p-4 border-b border-gray-700">
            <span>PLAYER</span>
            <span>BET</span>
            <span className="text-center">AI CONFIDENCE</span>
            <span className="text-right">RESULT</span>
          </div>
          {HISTORICAL_BETS.map(bet => (
            <div key={bet.id} className="grid grid-cols-2 md:grid-cols-4 p-4 border-b border-gray-600 last:border-b-0 items-center gap-y-2">
              <div className="md:col-span-1 col-span-2">
                <p className="font-bold">{bet.player.name}</p>
                <p className="text-xs text-gray-400">{bet.player.team}</p>
              </div>

              <div className="md:col-span-1 col-span-2">
                <p className="font-semibold">{bet.type} {bet.line}</p>
                <p className="text-sm text-gray-300">{bet.stat}</p>
              </div>
              
              <div className="text-left md:text-center">
                <span className="text-lg font-semibold">{bet.aiConfidence}%</span>
              </div>
              
              <div className="text-left md:text-right">
                <span className={`px-3 py-1 text-sm font-bold rounded-full ${bet.result === 'Win' ? 'bg-lime-500/20 text-lime-400' : 'bg-red-500/20 text-red-400'}`}>
                  {bet.result}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceView;