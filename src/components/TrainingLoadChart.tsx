import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { DailyMetrics } from '../data/trainerData';
import { formatDate } from '../utils/helpers';

interface TrainingLoadChartProps {
  metrics: DailyMetrics[];
}

export default function TrainingLoadChart({ metrics }: TrainingLoadChartProps) {
  if (metrics.length === 0) {
    return (
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="text-sm text-gray-500">No data available</div>
      </div>
    );
  }

  const chartData = metrics.map(m => ({
    date: formatDate(m.date),
    intensity: Math.round(m.trainingIntensity * 10) / 10,
  }));

  // Calculate baseline (average of first 7 days or all if less)
  const baselineDays = Math.min(7, metrics.length);
  const baseline = metrics.slice(0, baselineDays).reduce((sum, m) => sum + m.trainingIntensity, 0) / baselineDays;
  const current = metrics[metrics.length - 1].trainingIntensity;
  const delta = ((current - baseline) / baseline) * 100;
  const isIncreasing = delta > 0;

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Training Load</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Load vs baseline:</span>
          <div className={`flex items-center gap-1 ${isIncreasing ? 'text-red-600' : 'text-green-600'}`}>
            {isIncreasing ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{Math.abs(delta).toFixed(1)}%</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#6B7280' }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[0, 10]}
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
          <Bar dataKey="intensity" fill="#4B5563" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
