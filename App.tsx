
import React, { useState, useCallback } from 'react';
import { Game, View, LeagueFilter } from './types';
import { ALL_GAMES } from './constants';
import HomeView from './views/HomeView';
import GameView from './views/GameView';
import SubscriptionPage from './views/SubscriptionPage';
import PerformanceView from './views/PerformanceView';
import AccountView from './views/AccountView';
import TeamTrackerView from './views/TeamTrackerView';
import AIAnalystView from './views/AIAnalystView';
import { UserCircleIcon, SparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [unlockedGameIds, setUnlockedGameIds] = useState<string[]>([]);
  const [isTopPicksUnlocked, setIsTopPicksUnlocked] = useState<boolean>(false);
  const [leagueFilter, setLeagueFilter] = useState<LeagueFilter>('ALL');

  const handleSelectGame = useCallback((game: Game) => {
    setSelectedGame(game);
    setCurrentView(View.GAME);
  }, []);

  const handleNavigate = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const handleUnlockGame = useCallback((gameId: string) => {
    alert("Purchase successful! You've unlocked the top 3 AI bets for this game.");
    setUnlockedGameIds(prev => [...prev, gameId]);
  }, []);

  const handleUnlockTopPicks = useCallback(() => {
    alert("Purchase successful! You've unlocked today's top 3 AI picks.");
    setIsTopPicksUnlocked(true);
  }, []);

  const handleLeagueFilterChange = useCallback((filter: LeagueFilter) => {
    setLeagueFilter(filter);
  }, []);

  const filteredGames = ALL_GAMES.filter(game =>
    leagueFilter === 'ALL' || game.league === leagueFilter
  );

  const renderView = () => {
    switch (currentView) {
      case View.GAME:
        return selectedGame ? (
          <GameView
            game={selectedGame}
            unlockedGameIds={unlockedGameIds}
            onUnlockGame={handleUnlockGame}
          />
        ) : (
          <HomeView
            games={filteredGames}
            onSelectGame={handleSelectGame}
            isTopPicksUnlocked={isTopPicksUnlocked}
            onUnlockTopPicks={handleUnlockTopPicks}
            currentFilter={leagueFilter}
            onFilterChange={handleLeagueFilterChange}
          />
        );
      case View.SUBSCRIPTION:
        return <SubscriptionPage onBack={() => handleNavigate(View.HOME)} />;
      case View.PERFORMANCE:
        return <PerformanceView />;
      case View.ACCOUNT:
        return <AccountView onNavigate={handleNavigate} />;
      case View.TEAM_TRACKER:
        return <TeamTrackerView
          allGames={ALL_GAMES}
          onSelectGame={handleSelectGame}
          currentFilter={leagueFilter}
          onFilterChange={handleLeagueFilterChange}
        />;
      case View.AI_ANALYST:
        return <AIAnalystView />;
      case View.HOME:
      default:
        return <HomeView
          games={filteredGames}
          onSelectGame={handleSelectGame}
          isTopPicksUnlocked={isTopPicksUnlocked}
          onUnlockTopPicks={handleUnlockTopPicks}
          currentFilter={leagueFilter}
          onFilterChange={handleLeagueFilterChange}
        />;
    }
  };
  
  const NavButton: React.FC<{
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
  }> = ({ onClick, isActive, children }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 flex items-center space-x-2 ${
        isActive
          ? 'bg-lime-500 text-gray-900'
          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 font-sans pb-32">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex justify-between items-center">
            <div className="text-center flex-grow">
                <h1 className="text-4xl font-bold text-lime-400 tracking-wider" style={{textShadow: '0 0 10px #a3e635'}}>AI Prop Bets</h1>
                <p className="text-blue-400">Your AI-Powered Edge in Sports Betting</p>
            </div>
            <button 
              onClick={() => handleNavigate(View.ACCOUNT)} 
              className="text-gray-400 hover:text-lime-400 transition-colors duration-300"
              aria-label="My Account"
            >
              <UserCircleIcon className="w-10 h-10" />
            </button>
        </header>

        <nav className="flex justify-center space-x-2 md:space-x-4 mb-8">
          <NavButton onClick={() => handleNavigate(View.HOME)} isActive={currentView === View.HOME || currentView === View.GAME}>
            <span>Games</span>
          </NavButton>
          <NavButton onClick={() => handleNavigate(View.TEAM_TRACKER)} isActive={currentView === View.TEAM_TRACKER}>
             <span>Team Tracker</span>
          </NavButton>
          <NavButton onClick={() => handleNavigate(View.AI_ANALYST)} isActive={currentView === View.AI_ANALYST}>
            <SparklesIcon className="w-5 h-5 text-yellow-300"/>
            <span>AI Analyst</span>
          </NavButton>
          <NavButton onClick={() => handleNavigate(View.PERFORMANCE)} isActive={currentView === View.PERFORMANCE}>
             <span>AI Performance</span>
          </NavButton>
        </nav>

        <main>
            {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
