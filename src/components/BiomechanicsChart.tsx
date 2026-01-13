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

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Biomechanics Trend</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Symmetry trend:</span>
          <div className={`flex items-center gap-1 ${trendConfig[trend].color}`}>
            <TrendIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{trendConfig[trend].label}</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#6B7280' }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Line
            type="monotone"
            dataKey="symmetry"
            stroke="#4B5563"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
