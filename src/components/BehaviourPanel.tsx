import { Brain, AlertCircle, Heart } from 'lucide-react';
import { DailyMetrics } from '../data/trainerData';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

interface BehaviourPanelProps {
  metrics: DailyMetrics[];
}

export default function BehaviourPanel({ metrics }: BehaviourPanelProps) {
  if (metrics.length === 0) {
    return (
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="text-sm text-gray-500">No data available</div>
      </div>
    );
  }

  const latest = metrics[metrics.length - 1];
  const sparklineData = metrics.slice(-7).map(m => ({
    focus: m.behaviour.focus,
    stress: m.behaviour.stress,
    willingness: m.behaviour.willingness,
  }));

  const metricsList = [
    {
      name: 'Focus',
      value: Math.round(latest.behaviour.focus),
      icon: <Brain className="w-4 h-4 text-gray-600" />,
      color: 'bg-blue-500',
      strokeColor: '#3B82F6',
      dataKey: 'focus',
    },
    {
      name: 'Stress',
      value: Math.round(latest.behaviour.stress),
      icon: <AlertCircle className="w-4 h-4 text-gray-600" />,
      color: 'bg-red-500',
      strokeColor: '#EF4444',
      dataKey: 'stress',
    },
    {
      name: 'Willingness',
      value: Math.round(latest.behaviour.willingness),
      icon: <Heart className="w-4 h-4 text-gray-600" />,
      color: 'bg-green-500',
      strokeColor: '#22C55E',
      dataKey: 'willingness',
    },
  ];

  const cardColors = {
    Focus: 'from-blue-50 to-cyan-50 border-blue-100',
    Stress: 'from-red-50 to-pink-50 border-red-100',
    Willingness: 'from-green-50 to-emerald-50 border-green-100',
  };

  return (
    <div className="bg-gradient-to-br from-white to-pink-50 rounded-xl p-6 border border-pink-100 shadow-[0_4px_6px_-1px_rgba(236,72,153,0.1),0_2px_4px_-1px_rgba(236,72,153,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(236,72,153,0.2),0_4px_6px_-2px_rgba(236,72,153,0.1)] transition-all">
      <h2 className="text-xl font-bold text-gray-900 mb-5">Behaviour / Mental State</h2>
      <div className="space-y-5">
        {metricsList.map(metric => (
          <div key={metric.name} className={`group bg-gradient-to-br ${cardColors[metric.name as keyof typeof cardColors]} rounded-lg p-4 border shadow-sm hover:shadow-md transition-all`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white rounded-lg shadow-sm">
                  {metric.icon}
                </div>
                <span className="text-sm font-semibold text-gray-800">{metric.name}</span>
              </div>
              <span className="text-xl font-bold" style={{ color: metric.strokeColor }}>{metric.value}%</span>
            </div>
            
            {/* Progress bar */}
            <div className="h-3 bg-white/60 rounded-full overflow-hidden mb-3 shadow-inner">
              <div
                className={`h-full transition-all shadow-sm`}
                style={{ 
                  width: `${metric.value}%`,
                  background: `linear-gradient(90deg, ${metric.strokeColor}, ${metric.strokeColor}dd)`,
                }}
              />
            </div>

            {/* Mini sparkline */}
            <div className="h-12 opacity-0 group-hover:opacity-100 transition-opacity">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData}>
                  <Tooltip content={() => null} />
                  <Line
                    type="monotone"
                    dataKey={metric.dataKey}
                    stroke={metric.strokeColor}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
