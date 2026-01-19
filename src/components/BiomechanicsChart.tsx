import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { DailyMetrics } from '../data/trainerData';
import { formatDate, detectAnomalies, getContextHint } from '../utils/helpers';

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

  const symmetries = metrics.map(m => m.symmetryPct);
  const anomalyIndices = detectAnomalies(symmetries);
  const contextHint = getContextHint(symmetries, 'symmetry');

  const chartData = metrics.map((m, index) => ({
    date: formatDate(m.date),
    symmetry: Math.round(m.symmetryPct),
    index,
    isAnomaly: anomalyIndices.includes(index),
    originalDate: m.date,
  }));

  // Neutral gray color for line
  const lineColor = '#6B7280';

  // Custom tooltip to show anomaly info
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isAnomaly = data.isAnomaly;
      const prevValue = data.index > 0 ? chartData[data.index - 1].symmetry : null;
      const change = prevValue !== null ? data.symmetry - prevValue : null;
      
      return (
        <div className="bg-white border-2 border-gray-300 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-gray-900">{data.date}</p>
          <p className="text-sm text-gray-700">Symmetry: {data.symmetry}%</p>
          {isAnomaly && change !== null && (
            <p className="text-xs font-semibold text-brand-accent mt-1">
              Unusual change: {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div id="biomechanics-chart" className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-brand-secondary mb-2">Biomechanics Trend</h2>
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
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="symmetry"
            stroke={lineColor}
            strokeWidth={3}
            dot={(props: any) => {
              const isAnomaly = props.payload?.isAnomaly;
              if (isAnomaly) {
                const prevValue = props.payload.index > 0 ? chartData[props.payload.index - 1].symmetry : null;
                const change = prevValue !== null ? props.payload.symmetry - prevValue : null;
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={6}
                    fill={change && change > 0 ? '#EF4444' : '#3B82F6'}
                    stroke="white"
                    strokeWidth={2}
                  />
                );
              }
              return <circle cx={props.cx} cy={props.cy} r={4} fill={lineColor} />;
            }}
            activeDot={{ r: 6, fill: lineColor }}
          />
          {/* Anomaly markers - vertical lines */}
          {anomalyIndices.map((idx) => {
            const data = chartData[idx];
            if (!data) return null;
            const prevValue = idx > 0 ? chartData[idx - 1].symmetry : null;
            const change = prevValue !== null ? data.symmetry - prevValue : null;
            
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
        </LineChart>
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
