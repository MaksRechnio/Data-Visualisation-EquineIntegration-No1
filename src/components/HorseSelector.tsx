import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Horse } from '../data/trainerData';

interface HorseSelectorProps {
  horses: Horse[];
  selectedHorseId: string;
  onHorseChange: (horseId: string) => void;
}

// Color scheme for each horse - using brand colors with variations
const horseColors: Record<string, { center: string; centerText: string; centerBorder: string; preview: string; previewText: string; previewBorder: string }> = {
  'horse-1': {
    center: 'bg-brand-accent/20',
    centerText: 'text-brand-secondary',
    centerBorder: 'border-brand-accent/40',
    preview: 'bg-brand-accent/10',
    previewText: 'text-brand-secondary/80',
    previewBorder: 'border-brand-accent/30',
  },
  'horse-2': {
    center: 'bg-brand-accent/30',
    centerText: 'text-brand-secondary',
    centerBorder: 'border-brand-accent/50',
    preview: 'bg-brand-accent/15',
    previewText: 'text-brand-secondary/80',
    previewBorder: 'border-brand-accent/40',
  },
  'horse-3': {
    center: 'bg-brand-accent/25',
    centerText: 'text-brand-secondary',
    centerBorder: 'border-brand-accent/45',
    preview: 'bg-brand-accent/12',
    previewText: 'text-brand-secondary/80',
    previewBorder: 'border-brand-accent/35',
  },
};

export default function HorseSelector({
  horses,
  selectedHorseId,
  onHorseChange,
}: HorseSelectorProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const currentIndex = horses.findIndex(h => h.id === selectedHorseId);
  const selectedHorse = horses[currentIndex];
  const selectedColors = horseColors[selectedHorseId] || horseColors['horse-1'];

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('left');
    setAnimationKey(prev => prev + 1);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : horses.length - 1;
    
    // Animate out current, then change and animate in new
    setTimeout(() => {
      onHorseChange(horses[prevIndex].id);
      setTimeout(() => {
        setIsAnimating(false);
        setDirection(null);
      }, 400);
    }, 200);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('right');
    setAnimationKey(prev => prev + 1);
    const nextIndex = currentIndex < horses.length - 1 ? currentIndex + 1 : 0;
    
    // Animate out current, then change and animate in new
    setTimeout(() => {
      onHorseChange(horses[nextIndex].id);
      setTimeout(() => {
        setIsAnimating(false);
        setDirection(null);
      }, 400);
    }, 200);
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
  
  // Get colors for adjacent horses
  const prevColors = horseColors[adjacent.prev.id] || horseColors['horse-1'];
  const nextColors = horseColors[adjacent.next.id] || horseColors['horse-1'];

  return (
    <div className="flex items-center gap-2 justify-center">
      {/* Left Arrow */}
      <button
        onClick={handlePrevious}
        disabled={isAnimating}
        className={`p-1 hover:opacity-70 transition-all ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Previous horse"
      >
        <ChevronLeft className={`w-6 h-6 text-brand-secondary transition-transform ${direction === 'left' && isAnimating ? 'scale-125' : ''}`} />
      </button>

      {/* Previous Horse Preview (Left) - Circular */}
      <button
        onClick={handlePrevious}
        disabled={isAnimating}
        className={`w-16 h-16 rounded-full ${prevColors.preview} flex items-center justify-center overflow-hidden hover:scale-105 transition-all duration-300 shadow-sm relative border-2 ${prevColors.previewBorder} ${isAnimating ? 'cursor-not-allowed opacity-60' : ''}`}
        aria-label={`Select ${adjacent.prev.name}`}
      >
        {imageErrors.has(`prev-${adjacent.prev.id}`) ? (
          <span className={`${prevColors.previewText} text-sm font-bold transition-all`}>{adjacent.prev.name.charAt(0)}</span>
        ) : (
          <img
            src="/assets/horse.png"
            alt={adjacent.prev.name}
            className="w-12 h-12 object-contain p-1 transition-all duration-300"
            onError={() => setImageErrors(prev => new Set(prev).add(`prev-${adjacent.prev.id}`))}
          />
        )}
      </button>

      {/* Selected Horse (Center) - Pill Shaped */}
      <div 
        key={`center-${selectedHorseId}-${animationKey}`}
        className={`${selectedColors.center} rounded-full px-6 py-4 flex items-center gap-4 shadow-md min-w-[240px] max-w-[300px] border-2 ${selectedColors.centerBorder} transition-all duration-500 ease-in-out ${
          isAnimating 
            ? direction === 'left' 
              ? 'animate-slide-out-left' 
              : 'animate-slide-out-right'
            : 'animate-slide-in'
        }`}
      >
        <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center relative">
          {imageErrors.has(`selected-${selectedHorse.id}`) ? (
            <span className={`${selectedColors.centerText} text-xl font-bold transition-all duration-500`}>{selectedHorse.name.charAt(0)}</span>
          ) : (
            <img
              src="/assets/horse.png"
              alt={selectedHorse.name}
              className={`w-full h-full object-contain p-1 transition-all duration-500 ${
                isAnimating 
                  ? direction === 'left' 
                    ? 'rotate-[-15deg] scale-90 opacity-70' 
                    : 'rotate-[15deg] scale-90 opacity-70'
                  : 'rotate-0 scale-100 opacity-100'
              }`}
              onError={() => setImageErrors(prev => new Set(prev).add(`selected-${selectedHorse.id}`))}
            />
          )}
        </div>
        <span className={`text-lg font-semibold ${selectedColors.centerText} truncate transition-all duration-500`}>{selectedHorse.name}</span>
      </div>

      {/* Next Horse Preview (Right) - Circular */}
      <button
        onClick={handleNext}
        disabled={isAnimating}
        className={`w-16 h-16 rounded-full ${nextColors.preview} flex items-center justify-center overflow-hidden hover:scale-105 transition-all duration-300 shadow-sm border-2 ${nextColors.previewBorder} ${isAnimating ? 'cursor-not-allowed opacity-60' : ''}`}
        aria-label={`Select ${adjacent.next.name}`}
      >
        {imageErrors.has(`next-${adjacent.next.id}`) ? (
          <span className={`${nextColors.previewText} text-sm font-bold transition-all`}>{adjacent.next.name.charAt(0)}</span>
        ) : (
          <img
            src="/assets/horse.png"
            alt={adjacent.next.name}
            className="w-12 h-12 object-contain p-1 transition-all duration-300"
            onError={() => setImageErrors(prev => new Set(prev).add(`next-${adjacent.next.id}`))}
          />
        )}
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        disabled={isAnimating}
        className={`p-1 hover:opacity-70 transition-all ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Next horse"
      >
        <ChevronRight className={`w-6 h-6 text-brand-secondary transition-transform ${direction === 'right' && isAnimating ? 'scale-125' : ''}`} />
      </button>
    </div>
  );
}
