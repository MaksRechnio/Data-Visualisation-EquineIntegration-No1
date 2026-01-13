import { ChevronDown } from 'lucide-react';
import { Horse } from '../data/trainerData';

interface HeaderControlsProps {
  horses: Horse[];
  selectedHorseId: string;
  onHorseChange: (horseId: string) => void;
  range: 'today' | '7d' | '30d';
  onRangeChange: (range: 'today' | '7d' | '30d') => void;
}

export default function HeaderControls({
  horses,
  selectedHorseId,
  onHorseChange,
  range,
  onRangeChange,
}: HeaderControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Trainer Overview</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        {/* Horse Selector */}
        <div className="relative">
          <select
            value={selectedHorseId}
            onChange={(e) => onHorseChange(e.target.value)}
            className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 cursor-pointer shadow-sm hover:shadow-md transition-all"
          >
            {horses.map(horse => (
              <option key={horse.id} value={horse.id}>
                {horse.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>

        {/* Date Range Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner">
          {(['today', '7d', '30d'] as const).map((r) => (
            <button
              key={r}
              onClick={() => onRangeChange(r)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                range === r
                  ? 'bg-white text-gray-900 shadow-md scale-105'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {r === 'today' ? 'Today' : r === '7d' ? '7D' : '30D'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
