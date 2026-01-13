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

  const pillarColors: Record<string, { gradient: string; border: string; shadow: string }> = {
    Health: { gradient: 'from-red-50 to-rose-50', border: 'border-red-200', shadow: 'shadow-[0_4px_6px_-1px_rgba(239,68,68,0.15)]' },
    Training: { gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200', shadow: 'shadow-[0_4px_6px_-1px_rgba(59,130,246,0.15)]' },
    Nutrition: { gradient: 'from-yellow-50 to-amber-50', border: 'border-yellow-200', shadow: 'shadow-[0_4px_6px_-1px_rgba(234,179,8,0.15)]' },
    Biomechanics: { gradient: 'from-purple-50 to-violet-50', border: 'border-purple-200', shadow: 'shadow-[0_4px_6px_-1px_rgba(168,85,247,0.15)]' },
    Environment: { gradient: 'from-green-50 to-emerald-50', border: 'border-green-200', shadow: 'shadow-[0_4px_6px_-1px_rgba(16,185,129,0.15)]' },
  };

  const statusColors = {
    good: 'bg-green-100 text-green-800 shadow-sm',
    warning: 'bg-yellow-100 text-yellow-800 shadow-sm',
    critical: 'bg-red-100 text-red-800 shadow-sm',
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 border border-slate-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] transition-all">
      <h2 className="text-xl font-bold text-brand-secondary mb-5">Five Pillars Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {pillars.map(pillar => {
          const score = pillar.getScore(latest);
          const status = getStatus(score);
          const isActive = activeFilter === pillar.id;
          const colors = pillarColors[pillar.id];

          return (
            <button
              key={pillar.id}
              onClick={() => onPillarClick(isActive ? null : pillar.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left transform hover:-translate-y-1 ${
                isActive
                  ? `bg-gradient-to-br ${colors.gradient} ${colors.border} ${colors.shadow} scale-105`
                  : `bg-gradient-to-br ${colors.gradient} ${colors.border} ${colors.shadow} hover:shadow-lg`
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-white rounded-lg shadow-sm">
                  {pillar.icon}
                </div>
                <div className="text-sm font-bold text-brand-secondary">{pillar.name}</div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-brand-secondary">{Math.round(score)}%</span>
                <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${statusColors[status]}`}>
                  {status === 'good' ? 'Good' : status === 'warning' ? 'Fair' : 'Poor'}
                </span>
              </div>
              <div className="text-xs text-gray-700 font-medium">{pillar.getInsight(latest)}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
