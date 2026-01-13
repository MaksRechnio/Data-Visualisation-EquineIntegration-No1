import { useState } from 'react';
import { horses, dailyMetricsByHorseId, alertsByHorseId, updatesFeed } from '../data/trainerData';
import { filterByRange } from '../utils/helpers';
import HeaderControls from './HeaderControls';
import SummaryCards from './SummaryCards';
import TrainingLoadChart from './TrainingLoadChart';
import AlertsList from './AlertsList';
import AlertDetailDrawer from './AlertDetailDrawer';
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
  const [updatesSearchText, setUpdatesSearchText] = useState('');

  // Get filtered metrics based on horse and range
  const allMetrics = dailyMetricsByHorseId[selectedHorseId] || [];
  const filteredMetrics = filterByRange(allMetrics, range);

  // Get filtered alerts
  const allAlerts = alertsByHorseId[selectedHorseId] || [];
  const filteredAlerts = allAlerts.filter(alert => {
    // Check if alert is relevant to current date range
    const alertDates = alert.history.map(h => h.date);
    const rangeDates = filteredMetrics.map(m => m.date);
    return alertDates.some(date => rangeDates.includes(date));
  });

  // Filter updates by pillar category if active
  const filteredUpdates = updatesFeed.filter(update => {
    if (activePillarFilter) {
      return update.category === activePillarFilter;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Equine Integration</h1>
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
          {/* Summary Cards */}
          <SummaryCards metrics={filteredMetrics} />

          {/* Training Load Chart */}
          <TrainingLoadChart metrics={filteredMetrics} />

          {/* Two Column Layout for Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Alerts */}
            <AlertsList alerts={filteredAlerts} onAlertClick={setActiveAlert} />

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
    </div>
  );
}
