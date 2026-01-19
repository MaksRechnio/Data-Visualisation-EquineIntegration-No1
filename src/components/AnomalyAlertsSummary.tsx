import { DailyMetrics } from '../data/trainerData';
import { detectAnomalies } from '../utils/helpers';

interface AnomalyAlertsSummaryProps {
  metrics: DailyMetrics[];
  onScrollToChart?: (chartId: string) => void;
}

export default function AnomalyAlertsSummary({ metrics, onScrollToChart }: AnomalyAlertsSummaryProps) {
  if (metrics.length === 0) return null;

  // Get last 14 days of metrics
  const last14Days = metrics.slice(-14);
  
  // Detect anomalies in different metrics
  const trainingIntensities = last14Days.map(m => m.trainingIntensity);
  const symmetries = last14Days.map(m => m.symmetryPct);
  const recoveryScores = last14Days.map(m => m.recoveryScore);
  const injuryRisks = last14Days.map(m => m.injuryRisk);
  
  const trainingAnomalies = detectAnomalies(trainingIntensities);
  const symmetryAnomalies = detectAnomalies(symmetries);
  const recoveryAnomalies = detectAnomalies(recoveryScores);
  const injuryAnomalies = detectAnomalies(injuryRisks);
  
  const totalAnomalies = trainingAnomalies.length + symmetryAnomalies.length + 
                         recoveryAnomalies.length + injuryAnomalies.length;

  if (totalAnomalies === 0) return null;

  const handleClick = () => {
    // Find first chart with anomalies
    if (trainingAnomalies.length > 0 && onScrollToChart) {
      onScrollToChart('training-load-chart');
    } else if (symmetryAnomalies.length > 0 && onScrollToChart) {
      onScrollToChart('biomechanics-chart');
    } else if (recoveryAnomalies.length > 0 && onScrollToChart) {
      onScrollToChart('recovery-chart');
    } else if (injuryAnomalies.length > 0 && onScrollToChart) {
      onScrollToChart('injury-risk-chart');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-white border border-gray-300 rounded-lg p-3 shadow-sm hover:shadow-md transition-all text-left"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">
          {totalAnomalies} unusual change{totalAnomalies !== 1 ? 's' : ''} in last 14 days
        </span>
        <span className="text-xs text-brand-accent font-semibold ml-auto">View →</span>
      </div>
    </button>
  );
}
