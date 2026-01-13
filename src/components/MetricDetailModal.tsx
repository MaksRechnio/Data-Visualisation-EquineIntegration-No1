import { X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { DailyMetrics } from '../data/trainerData';
import { formatDate, computeReadiness, getStatus } from '../utils/helpers';

export type MetricType = 'readiness' | 'injuryRisk' | 'recovery' | 'nextEvent';

interface MetricDetailModalProps {
  metricType: MetricType | null;
  metrics: DailyMetrics[];
  onClose: () => void;
}

export default function MetricDetailModal({ metricType, metrics, onClose }: MetricDetailModalProps) {
  if (!metricType || metrics.length === 0) return null;

  const latest = metrics[metrics.length - 1];
  const readiness = computeReadiness(metrics);

  const getMetricConfig = () => {
    switch (metricType) {
      case 'readiness': {
        const status = getStatus(readiness.score);
        const statusColor = status === 'good' ? '#10B981' : status === 'warning' ? '#F59E0B' : '#EF4444';
        // Calculate readiness for each day (computeReadiness uses latest metric, so we calculate per day)
        const chartData = metrics.map(m => {
          // For historical trend, calculate readiness based on that day's metrics
          const recovery = m.recoveryScore;
          const injuryRisk = m.injuryRisk;
          const stress = m.behaviour.stress;
          const score = (recovery * 0.5) + ((100 - injuryRisk) * 0.3) + ((100 - stress) * 0.2);
          return {
            date: formatDate(m.date),
            value: Math.round(score),
          };
        });
        return {
          title: 'Overall Readiness',
          value: readiness.score,
          unit: '%',
          status,
          statusColor,
          description: `Overall readiness is calculated from recovery score (50%), injury risk (30%), and stress levels (20%). Current status: ${readiness.reason}`,
          chartData,
          chartColor: statusColor,
          details: [
            { label: 'Recovery Score', value: `${Math.round(latest.recoveryScore)}%`, status: getStatus(latest.recoveryScore) },
            { label: 'Injury Risk', value: `${Math.round(latest.injuryRisk)}%`, status: getStatus(latest.injuryRisk, true) },
            { label: 'Stress Level', value: `${Math.round(latest.behaviour.stress)}%`, status: getStatus(latest.behaviour.stress, true) },
          ],
        };
      }
      case 'injuryRisk': {
        const status = getStatus(latest.injuryRisk, true);
        const statusColor = status === 'good' ? '#10B981' : status === 'warning' ? '#F59E0B' : '#EF4444';
        const chartData = metrics.map(m => ({
          date: formatDate(m.date),
          value: Math.round(m.injuryRisk),
        }));
        return {
          title: 'Injury Risk',
          value: Math.round(latest.injuryRisk),
          unit: '%',
          status,
          statusColor,
          description: `Injury risk assessment based on training load, recovery patterns, and biomechanical data. Lower values indicate lower risk.`,
          chartData,
          chartColor: statusColor,
          details: [
            { label: 'Training Intensity', value: `${(latest.trainingIntensity * 10).toFixed(0)}%`, status: latest.trainingIntensity > 7 ? 'warning' : 'good' },
            { label: 'Recovery Score', value: `${Math.round(latest.recoveryScore)}%`, status: getStatus(latest.recoveryScore) },
            { label: 'Symmetry', value: `${Math.round(latest.symmetryPct)}%`, status: getStatus(latest.symmetryPct) },
          ],
        };
      }
      case 'recovery': {
        const status = getStatus(latest.recoveryScore);
        const statusColor = status === 'good' ? '#10B981' : status === 'warning' ? '#F59E0B' : '#EF4444';
        const chartData = metrics.map(m => ({
          date: formatDate(m.date),
          value: Math.round(m.recoveryScore),
        }));
        return {
          title: 'Recovery Score',
          value: Math.round(latest.recoveryScore),
          unit: '%',
          status,
          statusColor,
          description: `Recovery score indicates how well the horse has recovered from previous training sessions. Higher values indicate better recovery.`,
          chartData,
          chartColor: statusColor,
          details: [
            { label: 'Resting Heart Rate', value: `${Math.round(latest.restingHR)} bpm`, status: latest.restingHR < 40 ? 'good' : 'warning' },
            { label: 'Training Intensity', value: `${(latest.trainingIntensity * 10).toFixed(0)}%`, status: latest.trainingIntensity < 6 ? 'good' : 'warning' },
            { label: 'Stress Level', value: `${Math.round(latest.behaviour.stress)}%`, status: getStatus(latest.behaviour.stress, true) },
          ],
        };
      }
      case 'nextEvent': {
        const nextEvent = { date: '2024-01-15', label: 'Competition', location: 'National Equestrian Center', time: '14:00' };
        return {
          title: 'Next Key Event',
          value: nextEvent.label,
          unit: '',
          status: 'good' as const,
          statusColor: '#8B5CF6',
          description: `Upcoming scheduled event: ${nextEvent.label} at ${nextEvent.location} on ${nextEvent.date} at ${nextEvent.time}.`,
          chartData: [],
          chartColor: '#8B5CF6',
          details: [
            { label: 'Date', value: nextEvent.date, status: 'good' as const },
            { label: 'Location', value: nextEvent.location, status: 'good' as const },
            { label: 'Time', value: nextEvent.time, status: 'good' as const },
          ],
        };
      }
    }
  };

  const config = getMetricConfig();
  const statusColors = {
    good: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    critical: 'bg-red-100 text-red-800',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Centered Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-2xl border-4 border-brand-accent/40 w-full max-w-2xl max-h-[85vh] shadow-[0_20px_25px_-5px_rgba(53,208,198,0.3)] overflow-hidden pointer-events-auto animate-modal-enter"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full flex flex-col bg-gradient-to-br from-white to-brand-bg/30">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b-2 border-brand-accent/30 bg-gradient-to-r from-brand-accent/10 to-brand-accent/5">
              <div>
                <h2 className="text-2xl font-bold text-brand-secondary">{config.title}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-3xl font-bold text-brand-secondary">{config.value}{config.unit}</span>
                  <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${statusColors[config.status]} shadow-sm`}>
                    {config.status === 'good' ? 'Good' : config.status === 'warning' ? 'Warning' : 'Critical'}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/50 rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Description */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <h3 className="text-sm font-bold text-brand-secondary mb-2">Description</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{config.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {config.details.map((detail, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <div className="text-xs font-medium text-gray-600 mb-1">{detail.label}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-brand-secondary">{detail.value}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${statusColors[detail.status]} shadow-sm`}>
                        {detail.status === 'good' ? '✓' : detail.status === 'warning' ? '!' : '⚠'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              {config.chartData.length > 0 && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <h3 className="text-sm font-bold text-brand-secondary mb-4">Historical Trend</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={config.chartData}>
                        <XAxis
                          dataKey="date"
                          tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 500 }}
                          interval="preserveStartEnd"
                        />
                        <YAxis
                          domain={[0, 100]}
                          tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 500 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: `2px solid ${config.chartColor}`,
                            borderRadius: '8px',
                            fontSize: '11px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={config.chartColor}
                          strokeWidth={3}
                          dot={{ r: 4, fill: config.chartColor }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
