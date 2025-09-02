import React, { useState, useEffect, useMemo } from 'react';
import { Game, SelectableTeam } from '../types';
import { NCAA_TEAMS } from '../constants';
import SelectTeamModal from './SelectTeamModal';
import GameCard from './GameCard';

interface MyTeamProps {
  allGames: Game[];
  onSelectGame: (game: Game) => void;
}

const MY_TEAM_STORAGE_KEY = 'aiPropBetsMyTeam';

const MyTeam: React.FC<MyTeamProps> = ({ allGames, onSelectGame }) => {
  const [myTeam, setMyTeam] = useState<SelectableTeam | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const savedTeam = localStorage.getItem(MY_TEAM_STORAGE_KEY);
      if (savedTeam) {
        setMyTeam(JSON.parse(savedTeam));
      }
    } catch (error) {
      console.error("Failed to parse My Team from localStorage", error);
    }
  }, []);

  const handleSelectTeam = (team: SelectableTeam) => {
    setMyTeam(team);
    localStorage.setItem(MY_TEAM_STORAGE_KEY, JSON.stringify(team));
    setIsModalOpen(false);
  };

  const handleChangeTeam = () => {
    setIsModalOpen(true);
  };

  const nextGame = useMemo(() => {
    if (!myTeam) return null;
    return allGames.find(game =>
      game.league === 'NCAA' &&
      (game.teamA.name === myTeam.name || game.teamB.name === myTeam.name)
    );
  }, [myTeam, allGames]);

  if (!myTeam) {
    return (
      <>
        <div className="text-center bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-200 mb-2">Track Your Favorite NCAA Team</h3>
          <p className="text-gray-400 mb-6">Get personalized insights and see your team's upcoming games and props.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-600/30 transform hover:scale-105"
          >
            Select Your Team
          </button>
        </div>
        <SelectTeamModal
          isOpen={isModalOpen}
          teams={NCAA_TEAMS}
          onSelectTeam={handleSelectTeam}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
              <img src={myTeam.logoUrl} alt={`${myTeam.name} logo`} className="w-12 h-12 rounded-full mr-4"/>
              <h3 className="text-2xl font-bold text-gray-100">{myTeam.name}</h3>
          </div>
          <button
              onClick={handleChangeTeam}
              className="text-sm bg-gray-700 text-gray-300 px-3 py-1 rounded-md hover:bg-gray-600 transition-colors"
          >
              Change Team
          </button>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-blue-400 mb-3">Next Game</h4>
          {nextGame ? (
            <GameCard game={nextGame} onSelect={onSelectGame} />
          ) : (
            <div className="text-center text-gray-400 bg-gray-900/40 p-4 rounded-lg">
              <p>No upcoming game found for your team in this week's schedule.</p>
            </div>
          )}
        </div>
      </div>
      <SelectTeamModal
        isOpen={isModalOpen}
        teams={NCAA_TEAMS}
        onSelectTeam={handleSelectTeam}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default MyTeam;