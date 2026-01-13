import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { DailyMetrics } from '../data/trainerData';
import { formatDate, computeTrend } from '../utils/helpers';

interface BiomechanicsChartProps {
  metrics: DailyMetrics[];
}

export default function BiomechanicsChart({ metrics }: BiomechanicsChartProps) {
  if (metrics.length === 0) {
    return (
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="text-sm text-gray-500">No data available</div>
      </div>
    );
  }

  const chartData = metrics.map(m => ({
    date: formatDate(m.date),
    symmetry: Math.round(m.symmetryPct),
  }));

  const trend = computeTrend(metrics.map(m => ({ value: m.symmetryPct })));

  const trendConfig = {
    improving: { icon: TrendingUp, color: 'text-green-600', label: 'Improving' },
    stable: { icon: Minus, color: 'text-gray-600', label: 'Stable' },
    declining: { icon: TrendingDown, color: 'text-red-600', label: 'Declining' },
  };

  const TrendIcon = trendConfig[trend].icon;

  const trendColor = trend === 'improving' ? '#10B981' : trend === 'declining' ? '#EF4444' : '#6B7280';

  return (
    <div className="bg-gradient-to-br from-white to-indigo-50 rounded-xl p-6 border border-indigo-100 shadow-[0_4px_6px_-1px_rgba(99,102,241,0.1),0_2px_4px_-1px_rgba(99,102,241,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(99,102,241,0.2),0_4px_6px_-2px_rgba(99,102,241,0.1)] transition-all">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Biomechanics Trend</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Symmetry trend:</span>
          <div className={`flex items-center gap-1 px-3 py-1 rounded-lg ${trend === 'improving' ? 'bg-green-100 text-green-700' : trend === 'declining' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
            <TrendIcon className="w-4 h-4" />
            <span className="text-sm font-bold">{trendConfig[trend].label}</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData}>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: `2px solid ${trendColor}`,
              borderRadius: '8px',
              fontSize: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Line
            type="monotone"
            dataKey="symmetry"
            stroke={trendColor}
            strokeWidth={3}
            dot={{ r: 4, fill: trendColor }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
