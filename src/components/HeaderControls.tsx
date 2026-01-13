import { Horse } from '../data/trainerData';
import HorseSelector from './HorseSelector';

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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-secondary">Trainer Overview</h1>
        
        {/* Date Range Toggle */}
        <div className="flex bg-white/60 rounded-xl p-1 shadow-inner border border-gray-200">
          {(['today', '7d', '30d'] as const).map((r) => (
            <button
              key={r}
              onClick={() => onRangeChange(r)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                range === r
                  ? 'bg-brand-accent text-brand-secondary shadow-md scale-105'
                  : 'text-brand-secondary/60 hover:text-brand-secondary'
              }`}
            >
              {r === 'today' ? 'Today' : r === '7d' ? '7D' : '30D'}
            </button>
          ))}
        </div>
      </div>
      
      {/* Horse Selector */}
      <div className="flex justify-center">
        <HorseSelector
          horses={horses}
          selectedHorseId={selectedHorseId}
          onHorseChange={onHorseChange}
        />
      </div>
    </div>
  );
}
