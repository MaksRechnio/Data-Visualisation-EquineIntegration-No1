import { Activity, Dumbbell, Apple, BarChart3, Home } from 'lucide-react';
import { DailyMetrics } from '../data/trainerData';
import { getStatus } from '../utils/helpers';

interface PillarStatusGridProps {
  metrics: DailyMetrics[];
  onPillarClick: (category: string | null) => void;
  activeFilter: string | null;
}

type Pillar = {
  id: string;
  name: string;
  icon: React.ReactNode;
  getScore: (m: DailyMetrics) => number;
  getInsight: (m: DailyMetrics) => string;
};

export default function PillarStatusGrid({
  metrics,
  onPillarClick,
  activeFilter,
}: PillarStatusGridProps) {
  if (metrics.length === 0) {
    return null;
  }

  const latest = metrics[metrics.length - 1];

  const pillars: Pillar[] = [
    {
      id: 'Health',
      name: 'Health',
      icon: <Activity className="w-5 h-5" />,
      getScore: (m) => m.recoveryScore,
      getInsight: (m) => {
        const status = getStatus(m.recoveryScore);
        return status === 'good' ? 'Recovery optimal' : 'Recovery needs attention';
      },
    },
    {
      id: 'Training',
      name: 'Training',
      icon: <Dumbbell className="w-5 h-5" />,
      getScore: (m) => m.trainingIntensity * 10,
      getInsight: (m) => {
        const intensity = m.trainingIntensity;
        if (intensity > 7) return 'High intensity training';
        if (intensity > 4) return 'Moderate training load';
        return 'Light training';
      },
    },
    {
      id: 'Nutrition',
      name: 'Nutrition',
      icon: <Apple className="w-5 h-5" />,
      getScore: () => 75, // Mock score
      getInsight: () => 'Diet supporting performance',
    },
    {
      id: 'Biomechanics',
      name: 'Biomechanics',
      icon: <BarChart3 className="w-5 h-5" />,
      getScore: (m) => m.symmetryPct,
      getInsight: (m) => {
        const status = getStatus(m.symmetryPct);
        return status === 'good' ? 'Symmetry optimal' : 'Asymmetry detected';
      },
    },
    {
      id: 'Environment',
      name: 'Environment',
      icon: <Home className="w-5 h-5" />,
      getScore: () => 80, // Mock score
      getInsight: () => 'Stable conditions optimal',
    },
  ];

  const statusColors = {
    good: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    critical: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Five Pillars Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {pillars.map(pillar => {
          const score = pillar.getScore(latest);
          const status = getStatus(score);
          const isActive = activeFilter === pillar.id;

          return (
            <button
              key={pillar.id}
              onClick={() => onPillarClick(isActive ? null : pillar.id)}
              className={`p-3 rounded-lg border-2 transition-all text-left ${
                isActive
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="text-gray-600">{pillar.icon}</div>
                <div className="text-sm font-medium text-gray-900">{pillar.name}</div>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-900">{Math.round(score)}%</span>
                <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${statusColors[status]}`}>
                  {status === 'good' ? 'Good' : status === 'warning' ? 'Fair' : 'Poor'}
                </span>
              </div>
              <div className="text-xs text-gray-600">{pillar.getInsight(latest)}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
