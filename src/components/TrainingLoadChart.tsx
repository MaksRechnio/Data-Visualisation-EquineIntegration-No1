import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, ReferenceLine, CellProps } from 'recharts';
import { DailyMetrics } from '../data/trainerData';
import { formatDate, detectAnomalies, getContextHint } from '../utils/helpers';

interface TrainingLoadChartProps {
  metrics: DailyMetrics[];
}

// Neutral gray palette for bars
const barColors = [
  { start: '#6B7280', end: '#4B5563' }, // Gray
  { start: '#71717A', end: '#52525B' }, // Slate gray
  { start: '#78716C', end: '#57534E' }, // Stone gray
  { start: '#6B7280', end: '#4B5563' }, // Gray
  { start: '#71717A', end: '#52525B' }, // Slate gray
  { start: '#78716C', end: '#57534E' }, // Stone gray
  { start: '#6B7280', end: '#4B5563' }, // Gray
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

  const intensities = metrics.map(m => m.trainingIntensity);
  const anomalyIndices = detectAnomalies(intensities);
  const contextHint = getContextHint(intensities, 'workload');

  const chartData = metrics.map((m, index) => ({
    date: formatDate(m.date),
    intensity: Math.round(m.trainingIntensity * 10) / 10,
    index,
    isAnomaly: anomalyIndices.includes(index),
    originalDate: m.date,
  }));

  // Calculate baseline (average of first 7 days or all if less)
  const baselineDays = Math.min(7, metrics.length);
  const baseline = metrics.slice(0, baselineDays).reduce((sum, m) => sum + m.trainingIntensity, 0) / baselineDays;
  const current = metrics[metrics.length - 1].trainingIntensity;
  const delta = ((current - baseline) / baseline) * 100;
  const isIncreasing = delta > 0;

  // Custom tooltip to show anomaly info
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isAnomaly = data.isAnomaly;
      const prevValue = data.index > 0 ? chartData[data.index - 1].intensity : null;
      const change = prevValue !== null ? data.intensity - prevValue : null;
      
      return (
        <div className="bg-white border-2 border-gray-300 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-gray-900">{data.date}</p>
          <p className="text-sm text-gray-700">Intensity: {data.intensity}</p>
          {isAnomaly && change !== null && (
            <p className="text-xs font-semibold text-brand-accent mt-1">
              Unusual change: {change > 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div id="training-load-chart" className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-brand-secondary mb-2">Training Load</h2>
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
          <Tooltip content={<CustomTooltip />} />
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
          {/* Anomaly markers - vertical lines */}
          {anomalyIndices.map((idx) => {
            const data = chartData[idx];
            if (!data) return null;
            const prevValue = idx > 0 ? chartData[idx - 1].intensity : null;
            const change = prevValue !== null ? data.intensity - prevValue : null;
            
            return (
              <ReferenceLine
                key={`anomaly-${idx}`}
                x={data.date}
                stroke={change && change > 0 ? '#EF4444' : '#3B82F6'}
                strokeWidth={2}
                strokeDasharray="2 2"
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
      
      {/* Context hint */}
      <div className="mt-3 text-sm">
        <span className={`font-medium ${
          contextHint.isAbove === true ? 'text-brand-accent' : 
          contextHint.isAbove === false ? 'text-gray-500' : 
          'text-gray-600'
        }`}>
          {contextHint.text}
        </span>
      </div>
    </div>
  );
}
