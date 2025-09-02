import React from 'react';
import { LeagueFilter } from '../types';

interface LeagueFilterProps {
  currentFilter: LeagueFilter;
  onChange: (filter: LeagueFilter) => void;
}

const LeagueFilterComponent: React.FC<LeagueFilterProps> = ({ currentFilter, onChange }) => {
  const filters: LeagueFilter[] = ['ALL', 'NFL', 'NCAA'];

  const getButtonClass = (filter: LeagueFilter) => {
    const baseClass = 'px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 flex-grow md:flex-grow-0';
    if (currentFilter === filter) {
      return `${baseClass} bg-blue-500 text-white shadow-md shadow-blue-500/20`;
    }
    return `${baseClass} bg-gray-700/50 text-gray-300 hover:bg-gray-600`;
  };

  return (
    <div className="flex justify-center space-x-2 md:space-x-4 mb-8 bg-gray-900/50 p-2 rounded-lg max-w-sm mx-auto">
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={getButtonClass(filter)}
        >
          {filter === 'ALL' ? 'All Leagues' : filter}
        </button>
      ))}
    </div>
  );
};

export default LeagueFilterComponent;
