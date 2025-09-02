
import React, { useState, useEffect, useMemo } from 'react';
import { Game, LeagueFilter, SelectableTeam } from '../types';
import { SELECTABLE_TEAMS } from '../constants';
import SelectTeamModal from '../components/SelectTeamModal';
import GameCard from '../components/GameCard';
import { StarIcon } from '../components/icons';
import LeagueFilterComponent from '../components/LeagueFilter';

interface TeamTrackerViewProps {
  allGames: Game[];
  onSelectGame: (game: Game) => void;
  currentFilter: LeagueFilter;
  onFilterChange: (filter: LeagueFilter) => void;
}

const TRACKED_TEAMS_STORAGE_KEY = 'aiPropBetsTrackedTeams';
const MY_TEAM_STORAGE_KEY = 'aiPropBetsMyTeam';

const TeamTrackerView: React.FC<TeamTrackerViewProps> = ({ allGames, onSelectGame, currentFilter, onFilterChange }) => {
  const [trackedTeams, setTrackedTeams] = useState<SelectableTeam[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favoriteTeam, setFavoriteTeam] = useState<SelectableTeam | null>(null);

  useEffect(() => {
    try {
      const savedTeams = localStorage.getItem(TRACKED_TEAMS_STORAGE_KEY);
      if (savedTeams) {
        setTrackedTeams(JSON.parse(savedTeams));
      }
      const savedFavorite = localStorage.getItem(MY_TEAM_STORAGE_KEY);
      if (savedFavorite) {
        setFavoriteTeam(JSON.parse(savedFavorite));
      }
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
    }
  }, []);
  
  const saveTeams = (teams: SelectableTeam[]) => {
      setTrackedTeams(teams);
      localStorage.setItem(TRACKED_TEAMS_STORAGE_KEY, JSON.stringify(teams));
  }

  const handleAddTeam = (team: SelectableTeam) => {
    if (!trackedTeams.find(t => t.id === team.id)) {
        const newTeams = [...trackedTeams, team];
        saveTeams(newTeams);
    }
    setIsModalOpen(false);
  };
  
  const handleRemoveTeam = (teamId: string) => {
      const newTeams = trackedTeams.filter(t => t.id !== teamId);
      saveTeams(newTeams);
      if (favoriteTeam?.id === teamId) {
        handleSetFavorite({id: teamId} as SelectableTeam); // This will unset it
      }
  };

  const handleSetFavorite = (team: SelectableTeam) => {
    const isCurrentlyFavorite = favoriteTeam?.id === team.id;
    const newFavorite = isCurrentlyFavorite ? null : team;
    setFavoriteTeam(newFavorite);
    if (newFavorite) {
        localStorage.setItem(MY_TEAM_STORAGE_KEY, JSON.stringify(newFavorite));
    } else {
        localStorage.removeItem(MY_TEAM_STORAGE_KEY);
    }
  };

  const nextGamesByTeam = useMemo(() => {
    const gameMap = new Map<string, Game>();
    trackedTeams.forEach(team => {
        const game = allGames.find(g =>
            g.league === team.league && (g.teamA.name === team.name || g.teamB.name === team.name)
        );
        if (game) {
            gameMap.set(team.name, game);
        }
    });
    return gameMap;
  }, [trackedTeams, allGames]);

  const filteredTrackedTeams = useMemo(() => {
    if (currentFilter === 'ALL') return trackedTeams;
    return trackedTeams.filter(team => {
      const nextGame = nextGamesByTeam.get(team.name);
      // Show team if its next game's league matches the filter.
      // If no game, fallback to checking the team's league itself.
      return nextGame ? nextGame.league === currentFilter : team.league === currentFilter;
    });
  }, [trackedTeams, currentFilter, nextGamesByTeam]);

  const availableTeamsToAdd = useMemo(() => {
    const trackedTeamIds = new Set(trackedTeams.map(t => t.id));
    return SELECTABLE_TEAMS.filter(team => !trackedTeamIds.has(team.id));
  }, [trackedTeams]);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-10">
        <h2 className="text-4xl font-bold text-blue-400">Team Tracker</h2>
        <p className="text-gray-400 mt-2">Follow your favorite NFL & NCAA teams to see their upcoming games and prop bets.</p>
      </header>
      
      <LeagueFilterComponent currentFilter={currentFilter} onChange={onFilterChange} />

      <div className="mb-8 text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={availableTeamsToAdd.length === 0}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-600/30 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
        >
          + Add Team to Tracker
        </button>
      </div>

      {trackedTeams.length === 0 ? (
        <div className="text-center bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-xl p-12">
          <h3 className="text-2xl font-bold text-gray-200 mb-2">Your Tracker is Empty</h3>
          <p className="text-gray-400">Click "Add Team" to start following your favorite teams.</p>
        </div>
      ) : filteredTrackedTeams.length === 0 ? (
        <div className="text-center bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-xl p-12">
          <h3 className="text-2xl font-bold text-gray-200 mb-2">No Teams Match Filter</h3>
          <p className="text-gray-400">You have teams in your tracker, but none match the "{currentFilter}" filter.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredTrackedTeams.map(team => {
            const nextGame = nextGamesByTeam.get(team.name);
            const isFavorite = favoriteTeam?.id === team.id;
            return (
              <div 
                key={team.id} 
                className={`bg-gray-800/60 border rounded-xl p-6 transition-all duration-300 ${isFavorite ? 'border-lime-400 shadow-lg shadow-lime-500/10' : 'border-gray-700'}`}
                >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                      <img src={team.logoUrl} alt={`${team.name} logo`} className="w-12 h-12 rounded-full mr-4"/>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-100">{team.name}</h3>
                        <span className="text-xs font-semibold bg-gray-700 text-gray-300 px-2 py-0.5 rounded">{team.league}</span>
                      </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSetFavorite(team)}
                      className={`p-2 rounded-full transition-colors duration-200 ${isFavorite ? 'text-lime-400 bg-lime-900/50 hover:bg-lime-900' : 'text-gray-400 hover:bg-gray-700'}`}
                      title={isFavorite ? "Unset as Favorite" : "Set as Favorite"}
                      aria-label={isFavorite ? "Unset as Favorite" : "Set as Favorite"}
                    >
                      <StarIcon className="w-6 h-6" solid={isFavorite} />
                    </button>
                    <button
                        onClick={() => handleRemoveTeam(team.id)}
                        className="text-sm bg-red-800/70 text-red-200 px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
                    >
                        Remove
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-3">Next Game</h4>
                  {nextGame ? (
                    <GameCard game={nextGame} onSelect={onSelectGame} />
                  ) : (
                    <div className="text-center text-gray-400 bg-gray-900/40 p-4 rounded-lg">
                      <p>No upcoming game found for this team in this week's schedule.</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <SelectTeamModal
        isOpen={isModalOpen}
        teams={availableTeamsToAdd}
        onSelectTeam={handleAddTeam}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TeamTrackerView;
