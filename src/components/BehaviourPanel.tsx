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

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Behaviour / Mental State</h2>
      <div className="space-y-4">
        {metricsList.map(metric => (
          <div key={metric.name} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {metric.icon}
                <span className="text-sm font-medium text-gray-700">{metric.name}</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">{metric.value}%</span>
            </div>
            
            {/* Progress bar */}
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full ${metric.color} transition-all`}
                style={{ width: `${metric.value}%` }}
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
