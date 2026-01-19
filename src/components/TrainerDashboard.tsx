import { useState } from 'react';
import { horses, dailyMetricsByHorseId, alertsByHorseId, updatesFeed } from '../data/trainerData';
import { filterByRange } from '../utils/helpers';
import HeaderControls from './HeaderControls';
import AnomalyAlertsSummary from './AnomalyAlertsSummary';
import SummaryCards from './SummaryCards';
import TrainingLoadChart from './TrainingLoadChart';
import AlertsList from './AlertsList';
import AlertDetailDrawer from './AlertDetailDrawer';
import AddAlertModal from './AddAlertModal';
import MetricDetailModal, { MetricType } from './MetricDetailModal';
import PillarStatusGrid from './PillarStatusGrid';
import BiomechanicsChart from './BiomechanicsChart';
import BehaviourPanel from './BehaviourPanel';
import UpdatesFeed from './UpdatesFeed';
import { Alert } from '../data/trainerData';

export default function TrainerDashboard() {
  const [selectedHorseId, setSelectedHorseId] = useState(horses[0].id);
  const [range, setRange] = useState<'today' | '7d' | '30d'>('7d');
  const [activePillarFilter, setActivePillarFilter] = useState<string | null>(null);
  const [activeAlert, setActiveAlert] = useState<Alert | null>(null);
  const [activeMetric, setActiveMetric] = useState<MetricType | null>(null);
  const [updatesSearchText, setUpdatesSearchText] = useState('');
  const [isAddAlertModalOpen, setIsAddAlertModalOpen] = useState(false);
  const [customAlerts, setCustomAlerts] = useState<Record<string, Alert[]>>({});

  // Get filtered metrics based on horse and range
  const allMetrics = dailyMetricsByHorseId[selectedHorseId] || [];
  const filteredMetrics = filterByRange(allMetrics, range);

  // Get filtered alerts (combine default + custom alerts)
  const defaultAlerts = alertsByHorseId[selectedHorseId] || [];
  const customAlertsForHorse = customAlerts[selectedHorseId] || [];
  const allAlerts = [...defaultAlerts, ...customAlertsForHorse];
  const filteredAlerts = allAlerts.filter(alert => {
    // Check if alert is relevant to current date range
    const alertDates = alert.history.map(h => h.date);
    const rangeDates = filteredMetrics.map(m => m.date);
    return alertDates.some(date => rangeDates.includes(date));
  });

  const handleAddAlert = (alertData: Omit<Alert, 'id'>) => {
    const newAlert: Alert = {
      ...alertData,
      id: `custom-alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    setCustomAlerts(prev => ({
      ...prev,
      [selectedHorseId]: [...(prev[selectedHorseId] || []), newAlert],
    }));
  };

  // Filter updates by pillar category if active
  const filteredUpdates = updatesFeed.filter(update => {
    if (activePillarFilter) {
      return update.category === activePillarFilter;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b-2 border-gray-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-brand-secondary">Equine Integration</h1>
        </div>
        <HeaderControls
          horses={horses}
          selectedHorseId={selectedHorseId}
          onHorseChange={setSelectedHorseId}
          range={range}
          onRangeChange={setRange}
        />
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Anomaly Alerts Summary */}
          <AnomalyAlertsSummary 
            metrics={filteredMetrics}
            onScrollToChart={(chartId) => {
              const element = document.getElementById(chartId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Highlight briefly
                element.classList.add('ring-2', 'ring-brand-accent', 'ring-offset-2');
                setTimeout(() => {
                  element.classList.remove('ring-2', 'ring-brand-accent', 'ring-offset-2');
                }, 2000);
              }
            }}
          />
          
          {/* Summary Cards */}
          <SummaryCards metrics={filteredMetrics} onMetricClick={setActiveMetric} />

          {/* Training Load Chart */}
          <TrainingLoadChart metrics={filteredMetrics} />

          {/* Two Column Layout for Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Alerts */}
            <AlertsList 
              alerts={filteredAlerts} 
              onAlertClick={setActiveAlert}
              onAddAlert={() => setIsAddAlertModalOpen(true)}
            />

            {/* Behaviour Panel */}
            <BehaviourPanel metrics={filteredMetrics} />
          </div>

          {/* Five Pillars */}
          <PillarStatusGrid
            metrics={filteredMetrics}
            onPillarClick={setActivePillarFilter}
            activeFilter={activePillarFilter}
          />

          {/* Biomechanics Chart */}
          <BiomechanicsChart metrics={filteredMetrics} />

          {/* Updates Feed */}
          <UpdatesFeed
            updates={filteredUpdates}
            searchText={updatesSearchText}
            onSearchChange={setUpdatesSearchText}
            categoryFilter={activePillarFilter}
            onCategoryFilter={setActivePillarFilter}
          />
        </div>
      </main>

      {/* Alert Detail Drawer/Modal */}
      {activeAlert && (
        <AlertDetailDrawer alert={activeAlert} onClose={() => setActiveAlert(null)} />
      )}

      {/* Add Alert Modal */}
      <AddAlertModal
        isOpen={isAddAlertModalOpen}
        onClose={() => setIsAddAlertModalOpen(false)}
        onSave={handleAddAlert}
      />

      {/* Metric Detail Modal */}
      <MetricDetailModal
        metricType={activeMetric}
        metrics={filteredMetrics}
        onClose={() => setActiveMetric(null)}
      />
    </div>
  );
}
