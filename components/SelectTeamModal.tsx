import React, { useState, useMemo } from 'react';
import { SelectableTeam } from '../types';

interface SelectTeamModalProps {
  isOpen: boolean;
  teams: SelectableTeam[];
  onSelectTeam: (team: SelectableTeam) => void;
  onClose: () => void;
}

const SelectTeamModal: React.FC<SelectTeamModalProps> = ({ isOpen, teams, onSelectTeam, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = useMemo(() => {
    if (!searchTerm) return teams;
    return teams.filter(team =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, teams]);

  const groupedTeams = useMemo(() => {
    return filteredTeams.reduce((acc, team) => {
      const { league } = team;
      if (!acc[league]) {
        acc[league] = [];
      }
      acc[league].push(team);
      return acc;
    }, {} as Record<'NFL' | 'NCAA', SelectableTeam[]>);
  }, [filteredTeams]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-800 rounded-xl w-full max-w-md m-4 border border-blue-500/50 shadow-2xl shadow-blue-500/10 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Select Your Team</h2>
          <input
            type="text"
            placeholder="Search for a team..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-600 rounded-md px-4 py-2 mb-4 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-label="Search for an NFL or NCAA team"
          />
        </div>
        <div className="flex-grow overflow-y-auto px-6 pb-6" style={{maxHeight: '60vh'}}>
          {Object.entries(groupedTeams).length > 0 ? (
            (Object.keys(groupedTeams) as Array<'NFL' | 'NCAA'>).sort().map(league => (
                <div key={league}>
                    <h3 className="text-lg font-bold text-gray-400 border-b border-gray-600 pb-1 mb-2 sticky top-0 bg-gray-800">{league}</h3>
                    <ul className="space-y-1">
                    {groupedTeams[league].map(team => (
                        <li key={team.id}>
                        <button
                            onClick={() => onSelectTeam(team)}
                            className="w-full flex items-center p-2 rounded-lg hover:bg-gray-700/80 transition-colors duration-200 text-left"
                        >
                            <img src={team.logoUrl} alt={`${team.name} logo`} className="w-8 h-8 rounded-full mr-4" />
                            <span className="font-semibold">{team.name}</span>
                        </button>
                        </li>
                    ))}
                    </ul>
                </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-4">No teams found.</p>
          )}
        </div>
        <div className="bg-gray-900/50 p-4 rounded-b-xl text-right mt-auto">
            <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-gray-200 rounded-md hover:bg-gray-500 transition-colors"
            >
                Cancel
            </button>
        </div>
      </div>
    </div>
  );
};

export default SelectTeamModal;