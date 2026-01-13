import { Calendar } from 'lucide-react';
import { DailyMetrics } from '../data/trainerData';
import { getStatus, computeReadiness } from '../utils/helpers';

interface SummaryCardsProps {
  metrics: DailyMetrics[];
}

export default function SummaryCards({ metrics }: SummaryCardsProps) {
  if (metrics.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-500">Loading...</div>
          </div>
        ))}
      </div>
    );
  }

  const latest = metrics[metrics.length - 1];
  const readiness = computeReadiness(metrics);
  const injuryStatus = getStatus(latest.injuryRisk, true);
  const recoveryStatus = getStatus(latest.recoveryScore);

  const statusColors = {
    good: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    critical: 'bg-red-100 text-red-800',
  };

  const readinessStatus = getStatus(readiness.score);

  // Calculate next key event (mock - in real app this would come from calendar)
  const nextEvent = { date: '2024-01-15', label: 'Competition' };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Overall Readiness */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="text-sm text-gray-500 mb-1">Overall Readiness</div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold text-gray-900">{readiness.score}%</div>
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[readinessStatus]}`}>
            {readinessStatus === 'good' ? 'Good' : readinessStatus === 'warning' ? 'Warning' : 'Critical'}
          </span>
        </div>
        <div className="text-xs text-gray-600 mt-2">{readiness.reason}</div>
      </div>

      {/* Injury Risk */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="text-sm text-gray-500 mb-1">Injury Risk</div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold text-gray-900">{Math.round(latest.injuryRisk)}%</div>
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[injuryStatus]}`}>
            {injuryStatus === 'good' ? 'Low' : injuryStatus === 'warning' ? 'Moderate' : 'High'}
          </span>
        </div>
        <div className="text-xs text-gray-600 mt-2">
          {injuryStatus === 'good' ? 'Within safe range' : 'Monitor closely'}
        </div>
      </div>

      {/* Recovery */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="text-sm text-gray-500 mb-1">Recovery</div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold text-gray-900">{Math.round(latest.recoveryScore)}%</div>
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[recoveryStatus]}`}>
            {recoveryStatus === 'good' ? 'Good' : recoveryStatus === 'warning' ? 'Fair' : 'Poor'}
          </span>
        </div>
        <div className="text-xs text-gray-600 mt-2">
          {recoveryStatus === 'good' ? 'Adequate recovery' : 'Needs attention'}
        </div>
      </div>

      {/* Next Key Event */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="text-sm text-gray-500 mb-1">Next Key Event</div>
        <div className="flex items-center gap-2 mt-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div>
            <div className="text-sm font-medium text-gray-900">{nextEvent.label}</div>
            <div className="text-xs text-gray-600">{nextEvent.date}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
