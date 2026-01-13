import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Alert } from '../data/trainerData';

interface AlertsListProps {
  alerts: Alert[];
  onAlertClick: (alert: Alert) => void;
}

export default function AlertsList({ alerts, onAlertClick }: AlertsListProps) {
  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'med':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'low':
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 border-red-200';
      case 'med':
        return 'bg-yellow-100 border-yellow-200';
      case 'low':
        return 'bg-blue-100 border-blue-200';
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h2>
        <div className="text-sm text-gray-500">No active alerts</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h2>
      <div className="space-y-2">
        {alerts.slice(0, 6).map(alert => (
          <button
            key={alert.id}
            onClick={() => onAlertClick(alert)}
            className={`w-full text-left p-3 rounded-lg border ${getSeverityColor(alert.severity)} hover:opacity-80 transition-opacity`}
          >
            <div className="flex items-start gap-3">
              {getSeverityIcon(alert.severity)}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900">{alert.title}</div>
                <div className="text-xs text-gray-600 mt-1 line-clamp-1">{alert.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
