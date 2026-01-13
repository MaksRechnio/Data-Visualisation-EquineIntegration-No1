import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Horse } from '../data/trainerData';

interface HorseSelectorProps {
  horses: Horse[];
  selectedHorseId: string;
  onHorseChange: (horseId: string) => void;
}

export default function HorseSelector({
  horses,
  selectedHorseId,
  onHorseChange,
}: HorseSelectorProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const currentIndex = horses.findIndex(h => h.id === selectedHorseId);
  const selectedHorse = horses[currentIndex];

  const handlePrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : horses.length - 1;
    onHorseChange(horses[prevIndex].id);
  };

  const handleNext = () => {
    const nextIndex = currentIndex < horses.length - 1 ? currentIndex + 1 : 0;
    onHorseChange(horses[nextIndex].id);
  };

  // Get adjacent horses for preview
  const getAdjacentHorses = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : horses.length - 1;
    const nextIndex = currentIndex < horses.length - 1 ? currentIndex + 1 : 0;
    return {
      prev: horses[prevIndex],
      next: horses[nextIndex],
    };
  };

  const adjacent = getAdjacentHorses();

  return (
    <div className="flex items-center gap-2 justify-center">
      {/* Left Arrow */}
      <button
        onClick={handlePrevious}
        className="p-1 hover:opacity-70 transition-opacity"
        aria-label="Previous horse"
      >
        <ChevronLeft className="w-6 h-6 text-gray-900" />
      </button>

      {/* Previous Horse Preview (Left) - Circular */}
      <button
        onClick={handlePrevious}
        className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform shadow-sm relative"
        aria-label={`Select ${adjacent.prev.name}`}
      >
        {imageErrors.has(`prev-${adjacent.prev.id}`) ? (
          <span className="text-green-700 text-sm font-bold">{adjacent.prev.name.charAt(0)}</span>
        ) : (
          <img
            src="/assets/horse.png"
            alt={adjacent.prev.name}
            className="w-12 h-12 object-contain p-1"
            onError={() => setImageErrors(prev => new Set(prev).add(`prev-${adjacent.prev.id}`))}
          />
        )}
      </button>

      {/* Selected Horse (Center) - Pill Shaped */}
      <div className="bg-yellow-100 rounded-full px-6 py-4 flex items-center gap-4 shadow-md min-w-[240px] max-w-[300px]">
        <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
          {imageErrors.has(`selected-${selectedHorse.id}`) ? (
            <span className="text-yellow-800 text-xl font-bold">{selectedHorse.name.charAt(0)}</span>
          ) : (
            <img
              src="/assets/horse.png"
              alt={selectedHorse.name}
              className="w-full h-full object-contain p-1"
              onError={() => setImageErrors(prev => new Set(prev).add(`selected-${selectedHorse.id}`))}
            />
          )}
        </div>
        <span className="text-lg font-semibold text-gray-700 truncate">{selectedHorse.name}</span>
      </div>

      {/* Next Horse Preview (Right) - Circular */}
      <button
        onClick={handleNext}
        className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform shadow-sm"
        aria-label={`Select ${adjacent.next.name}`}
      >
        {imageErrors.has(`next-${adjacent.next.id}`) ? (
          <span className="text-cyan-700 text-sm font-bold">{adjacent.next.name.charAt(0)}</span>
        ) : (
          <img
            src="/assets/horse.png"
            alt={adjacent.next.name}
            className="w-12 h-12 object-contain p-1"
            onError={() => setImageErrors(prev => new Set(prev).add(`next-${adjacent.next.id}`))}
          />
        )}
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="p-1 hover:opacity-70 transition-opacity"
        aria-label="Next horse"
      >
        <ChevronRight className="w-6 h-6 text-gray-900" />
      </button>
    </div>
  );
}
