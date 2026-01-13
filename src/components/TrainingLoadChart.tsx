import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { DailyMetrics } from '../data/trainerData';
import { formatDate } from '../utils/helpers';

interface TrainingLoadChartProps {
  metrics: DailyMetrics[];
}

// Color palette for diversified bars
const barColors = [
  { start: '#F97316', end: '#EA580C' }, // Orange
  { start: '#EF4444', end: '#DC2626' }, // Red
  { start: '#F59E0B', end: '#D97706' }, // Amber
  { start: '#10B981', end: '#059669' }, // Green
  { start: '#3B82F6', end: '#2563EB' }, // Blue
  { start: '#8B5CF6', end: '#7C3AED' }, // Purple
  { start: '#EC4899', end: '#DB2777' }, // Pink
];

export default function TrainingLoadChart({ metrics }: TrainingLoadChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (metrics.length === 0) {
    return (
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="text-sm text-gray-500">No data available</div>
      </div>
    );
  }

  const chartData = metrics.map((m, index) => ({
    date: formatDate(m.date),
    intensity: Math.round(m.trainingIntensity * 10) / 10,
    index,
  }));

  // Calculate baseline (average of first 7 days or all if less)
  const baselineDays = Math.min(7, metrics.length);
  const baseline = metrics.slice(0, baselineDays).reduce((sum, m) => sum + m.trainingIntensity, 0) / baselineDays;
  const current = metrics[metrics.length - 1].trainingIntensity;
  const delta = ((current - baseline) / baseline) * 100;
  const isIncreasing = delta > 0;

  return (
    <div className="bg-gradient-to-br from-white to-orange-50 rounded-xl p-6 border border-orange-100 shadow-[0_4px_6px_-1px_rgba(249,115,22,0.1),0_2px_4px_-1px_rgba(249,115,22,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(249,115,22,0.2),0_4px_6px_-2px_rgba(249,115,22,0.1)] transition-all">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-brand-secondary mb-2">Training Load</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Load vs baseline:</span>
          <div className={`flex items-center gap-1 px-3 py-1 rounded-lg ${isIncreasing ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {isIncreasing ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-bold">{Math.abs(delta).toFixed(1)}%</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={220}>
        <BarChart 
          data={chartData}
          onMouseMove={(state) => {
            if (state && state.activeTooltipIndex !== undefined) {
              setHoveredIndex(state.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            {barColors.map((color, idx) => (
              <linearGradient key={idx} id={`colorGradient-${idx}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color.start} stopOpacity={1}/>
                <stop offset="100%" stopColor={color.end} stopOpacity={1}/>
              </linearGradient>
            ))}
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[0, 10]}
            tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '2px solid #F97316',
              borderRadius: '8px',
              fontSize: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Bar 
            dataKey="intensity" 
            radius={[8, 8, 0, 0]}
          >
            {chartData.map((entry, index) => {
              const colorIndex = index % barColors.length;
              const isHovered = hoveredIndex === index;
              const opacity = hoveredIndex === null || isHovered ? 1 : 0.4;
              
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#colorGradient-${colorIndex})`}
                  opacity={opacity}
                  style={{ transition: 'opacity 0.2s ease-in-out' }}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
