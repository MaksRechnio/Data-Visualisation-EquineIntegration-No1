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

  const getSeverityShadow = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return 'shadow-[0_4px_6px_-1px_rgba(239,68,68,0.2),0_2px_4px_-1px_rgba(239,68,68,0.1)] hover:shadow-[0_8px_12px_-2px_rgba(239,68,68,0.3),0_4px_6px_-2px_rgba(239,68,68,0.15)]';
      case 'med':
        return 'shadow-[0_4px_6px_-1px_rgba(234,179,8,0.2),0_2px_4px_-1px_rgba(234,179,8,0.1)] hover:shadow-[0_8px_12px_-2px_rgba(234,179,8,0.3),0_4px_6px_-2px_rgba(234,179,8,0.15)]';
      case 'low':
        return 'shadow-[0_4px_6px_-1px_rgba(59,130,246,0.2),0_2px_4px_-1px_rgba(59,130,246,0.1)] hover:shadow-[0_8px_12px_-2px_rgba(59,130,246,0.3),0_4px_6px_-2px_rgba(59,130,246,0.15)]';
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Alerts</h2>
        <div className="text-sm text-gray-500">No active alerts</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-amber-50 rounded-xl p-6 border border-amber-100 shadow-[0_4px_6px_-1px_rgba(245,158,11,0.1),0_2px_4px_-1px_rgba(245,158,11,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(245,158,11,0.2),0_4px_6px_-2px_rgba(245,158,11,0.1)] transition-all">
      <h2 className="text-xl font-bold text-gray-900 mb-5">Alerts</h2>
      <div className="space-y-3">
        {alerts.slice(0, 6).map(alert => (
          <button
            key={alert.id}
            onClick={() => onAlertClick(alert)}
            className={`w-full text-left p-4 rounded-xl border-2 ${getSeverityColor(alert.severity)} ${getSeverityShadow(alert.severity)} transition-all transform hover:-translate-y-0.5`}
          >
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                {getSeverityIcon(alert.severity)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-gray-900">{alert.title}</div>
                <div className="text-xs text-gray-700 mt-1 line-clamp-1">{alert.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
