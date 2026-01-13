import { X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Alert } from '../data/trainerData';
import { formatDate } from '../utils/helpers';

interface AlertDetailDrawerProps {
  alert: Alert | null;
  onClose: () => void;
}

export default function AlertDetailDrawer({ alert, onClose }: AlertDetailDrawerProps) {
  if (!alert) return null;

  const chartData = alert.history.map(h => ({
    date: formatDate(h.date),
    value: h.value,
  }));

  const severityConfig = {
    high: {
      border: 'border-red-400',
      bg: 'from-red-50 to-rose-50',
      shadow: 'shadow-[0_20px_25px_-5px_rgba(239,68,68,0.3)]',
      chartColor: '#EF4444',
    },
    med: {
      border: 'border-yellow-400',
      bg: 'from-yellow-50 to-amber-50',
      shadow: 'shadow-[0_20px_25px_-5px_rgba(234,179,8,0.3)]',
      chartColor: '#F59E0B',
    },
    low: {
      border: 'border-blue-400',
      bg: 'from-blue-50 to-cyan-50',
      shadow: 'shadow-[0_20px_25px_-5px_rgba(59,130,246,0.3)]',
      chartColor: '#3B82F6',
    },
  };

  const config = severityConfig[alert.severity];

  const content = (
    <div className="h-full flex flex-col bg-gradient-to-br from-white to-gray-50">
      <div className={`flex items-center justify-between p-6 border-b-2 ${config.border} bg-gradient-to-r ${config.bg}`}>
        <h2 className="text-2xl font-bold text-gray-900">{alert.title}</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/50 rounded-xl transition-all shadow-sm hover:shadow-md"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h3 className="text-sm font-bold text-gray-800 mb-2">Description</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{alert.description}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h3 className="text-sm font-bold text-gray-800 mb-2">Recommended Action</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{alert.recommendedAction}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Metric History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 500 }}
                  interval="preserveStartEnd"
                />
                <YAxis
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
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Centered Modal - Both Mobile and Desktop */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className={`bg-white rounded-2xl ${config.border} border-4 w-full max-w-lg max-h-[85vh] ${config.shadow} overflow-hidden pointer-events-auto animate-modal-enter`}
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      </div>
    </>
  );
}
