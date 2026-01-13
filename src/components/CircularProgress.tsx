import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
}

export default function CircularProgress({
  value,
  max = 100,
  size = 80,
  strokeWidth = 8,
  color = '#3B82F6',
  backgroundColor = '#E5E7EB',
}: CircularProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const data = [
    { name: 'progress', value: percentage },
    { name: 'remaining', value: 100 - percentage },
  ];

  const innerRadius = size / 2 - strokeWidth;
  const outerRadius = size / 2;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            cornerRadius={8}
            stroke="none"
          >
            <Cell key="progress" fill={color} />
            <Cell key="remaining" fill={backgroundColor} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-bold" style={{ color }}>
            {Math.round(value)}
          </div>
          <div className="text-xs text-gray-500">%</div>
        </div>
      </div>
    </div>
  );
}
