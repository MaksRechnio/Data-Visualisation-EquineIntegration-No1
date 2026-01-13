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

  const severityColors = {
    high: 'border-red-300',
    med: 'border-yellow-300',
    low: 'border-blue-300',
  };

  const content = (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">{alert.title}</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
          <p className="text-sm text-gray-600">{alert.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Recommended Action</h3>
          <p className="text-sm text-gray-600">{alert.recommendedAction}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Metric History</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: '#6B7280' }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#6B7280' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4B5563"
                  strokeWidth={2}
                  dot={{ r: 3 }}
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
        className="fixed inset-0 bg-black/50 lg:bg-black/30 z-40"
        onClick={onClose}
      />
      
      {/* Mobile: Bottom sheet */}
      <div className={`lg:hidden fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl ${severityColors[alert.severity]} border-t-4 w-full max-h-[80vh] shadow-xl`}>
        {content}
      </div>

      {/* Desktop: Right-side drawer */}
      <div className={`hidden lg:block fixed right-0 top-0 z-50 bg-white ${severityColors[alert.severity]} border-l-4 w-full max-w-md h-full shadow-xl`}>
        {content}
      </div>
    </>
  );
}
