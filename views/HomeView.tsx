
import React from 'react';
import { Game, LeagueFilter } from '../types';
import GameCard from '../components/GameCard';
import TopBetCard from '../components/TopBetCard';
import PropBetCard from '../components/PropBetCard';
import { TOP_BETS } from '../constants';
import LeagueFilterComponent from '../components/LeagueFilter';

interface HomeViewProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
  isTopPicksUnlocked: boolean;
  onUnlockTopPicks: () => void;
  currentFilter: LeagueFilter;
  onFilterChange: (filter: LeagueFilter) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ games, onSelectGame, isTopPicksUnlocked, onUnlockTopPicks, currentFilter, onFilterChange }) => {
  
  const getSectionTitle = () => {
    switch(currentFilter) {
      case 'NFL': return "This Week's NFL Games";
      case 'NCAA': return "This Week's NCAA Games";
      default: return "This Week's Games";
    }
  };

  return (
    <div>
      <section className="mb-12">
        <LeagueFilterComponent currentFilter={currentFilter} onChange={onFilterChange} />
        <h2 className="text-2xl font-bold mb-4 text-blue-400">{getSectionTitle()}</h2>
        {games.length > 0 ? (
          <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
            {games.map(game => (
              <GameCard key={game.id} game={game} onSelect={onSelectGame} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 bg-gray-800/50 p-6 rounded-lg">
            <p>No games available for the selected filter.</p>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-lime-400">Today's Top 3 AI Picks</h2>
        {isTopPicksUnlocked ? (
          <div className="space-y-4 max-w-2xl mx-auto">
             {TOP_BETS.map(bet => (
                <PropBetCard key={bet.id} bet={bet} />
              ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TOP_BETS.map(bet => (
                <TopBetCard key={bet.id} bet={bet} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={onUnlockTopPicks}
                className="bg-lime-600 text-white font-bold py-4 px-8 text-lg rounded-lg hover:bg-lime-500 transition-all duration-300 shadow-lg shadow-lime-600/30 transform hover:scale-105"
              >
                Unlock Top 3 Picks for $9.99
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default HomeView;