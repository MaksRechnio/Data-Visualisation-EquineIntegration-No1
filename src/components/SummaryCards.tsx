import { Calendar } from 'lucide-react';
import { DailyMetrics } from '../data/trainerData';
import { getStatus, computeReadiness } from '../utils/helpers';
import CircularProgress from './CircularProgress';

interface SummaryCardsProps {
  metrics: DailyMetrics[];
  onMetricClick?: (metricType: 'readiness' | 'injuryRisk' | 'recovery' | 'nextEvent') => void;
}

export default function SummaryCards({ metrics, onMetricClick }: SummaryCardsProps) {
  if (metrics.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] transition-shadow">
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

  // Color schemes for circular progress
  const readinessColor = readinessStatus === 'good' ? '#10B981' : readinessStatus === 'warning' ? '#F59E0B' : '#EF4444';
  const injuryColor = injuryStatus === 'good' ? '#10B981' : injuryStatus === 'warning' ? '#F59E0B' : '#EF4444';
  const recoveryColor = recoveryStatus === 'good' ? '#3B82F6' : recoveryStatus === 'warning' ? '#F59E0B' : '#EF4444';

  // Calculate next key event (mock - in real app this would come from calendar)
  const nextEvent = { date: '2024-01-15', label: 'Competition' };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Overall Readiness */}
      <button
        onClick={() => onMetricClick?.('readiness')}
        className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 border border-blue-100 shadow-[0_4px_6px_-1px_rgba(59,130,246,0.1),0_2px_4px_-1px_rgba(59,130,246,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(59,130,246,0.2),0_4px_6px_-2px_rgba(59,130,246,0.1)] transition-all transform hover:-translate-y-1 cursor-pointer text-left w-full"
      >
        <div className="text-sm font-medium text-gray-600 mb-3">Overall Readiness</div>
        <div className="flex items-center justify-between">
          <CircularProgress value={readiness.score} color={readinessColor} size={90} strokeWidth={10} />
          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${statusColors[readinessStatus]} shadow-sm`}>
            {readinessStatus === 'good' ? 'Good' : readinessStatus === 'warning' ? 'Warning' : 'Critical'}
          </span>
        </div>
        <div className="text-xs text-gray-600 mt-3 font-medium">{readiness.reason}</div>
      </button>

      {/* Injury Risk */}
      <button
        onClick={() => onMetricClick?.('injuryRisk')}
        className="bg-gradient-to-br from-white to-red-50 rounded-xl p-6 border border-red-100 shadow-[0_4px_6px_-1px_rgba(239,68,68,0.1),0_2px_4px_-1px_rgba(239,68,68,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(239,68,68,0.2),0_4px_6px_-2px_rgba(239,68,68,0.1)] transition-all transform hover:-translate-y-1 cursor-pointer text-left w-full"
      >
        <div className="text-sm font-medium text-gray-600 mb-3">Injury Risk</div>
        <div className="flex items-center justify-between">
          <CircularProgress value={Math.round(latest.injuryRisk)} color={injuryColor} size={90} strokeWidth={10} />
          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${statusColors[injuryStatus]} shadow-sm`}>
            {injuryStatus === 'good' ? 'Low' : injuryStatus === 'warning' ? 'Moderate' : 'High'}
          </span>
        </div>
        <div className="text-xs text-gray-600 mt-3 font-medium">
          {injuryStatus === 'good' ? 'Within safe range' : 'Monitor closely'}
        </div>
      </button>

      {/* Recovery */}
      <button
        onClick={() => onMetricClick?.('recovery')}
        className="bg-gradient-to-br from-white to-green-50 rounded-xl p-6 border border-green-100 shadow-[0_4px_6px_-1px_rgba(16,185,129,0.1),0_2px_4px_-1px_rgba(16,185,129,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(16,185,129,0.2),0_4px_6px_-2px_rgba(16,185,129,0.1)] transition-all transform hover:-translate-y-1 cursor-pointer text-left w-full"
      >
        <div className="text-sm font-medium text-gray-600 mb-3">Recovery</div>
        <div className="flex items-center justify-between">
          <CircularProgress value={Math.round(latest.recoveryScore)} color={recoveryColor} size={90} strokeWidth={10} />
          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${statusColors[recoveryStatus]} shadow-sm`}>
            {recoveryStatus === 'good' ? 'Good' : recoveryStatus === 'warning' ? 'Fair' : 'Poor'}
          </span>
        </div>
        <div className="text-xs text-gray-600 mt-3 font-medium">
          {recoveryStatus === 'good' ? 'Adequate recovery' : 'Needs attention'}
        </div>
      </button>

      {/* Next Key Event */}
      <button
        onClick={() => onMetricClick?.('nextEvent')}
        className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-6 border border-purple-100 shadow-[0_4px_6px_-1px_rgba(168,85,247,0.1),0_2px_4px_-1px_rgba(168,85,247,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(168,85,247,0.2),0_4px_6px_-2px_rgba(168,85,247,0.1)] transition-all transform hover:-translate-y-1 cursor-pointer text-left w-full"
      >
        <div className="text-sm font-medium text-gray-600 mb-3">Next Key Event</div>
        <div className="flex items-center gap-3 mt-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">{nextEvent.label}</div>
            <div className="text-xs text-gray-600 font-medium">{nextEvent.date}</div>
          </div>
        </div>
      </button>
    </div>
  );
}
