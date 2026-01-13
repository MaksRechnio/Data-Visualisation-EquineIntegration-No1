import { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Alert } from '../data/trainerData';

interface AddAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (alert: Omit<Alert, 'id'>) => void;
}

export default function AddAlertModal({ isOpen, onClose, onSave }: AddAlertModalProps) {
  const [formData, setFormData] = useState({
    severity: 'low' as 'low' | 'med' | 'high',
    title: '',
    description: '',
    metricKey: '',
    recommendedAction: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate history data (last 7 days with mock values)
    const history = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toISOString().split('T')[0],
        value: Math.floor(Math.random() * 100),
      };
    });

    onSave({
      ...formData,
      history,
    });

    // Reset form
    setFormData({
      severity: 'low',
      title: '',
      description: '',
      metricKey: '',
      recommendedAction: '',
    });
    
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Add New Alert</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Severity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity
              </label>
              <select
                value={formData.severity}
                onChange={(e) => handleChange('severity', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              >
                <option value="low">Low</option>
                <option value="med">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter alert title"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none"
                rows={3}
                placeholder="Enter alert description"
                required
              />
            </div>

            {/* Metric Key */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metric Key
              </label>
              <input
                type="text"
                value={formData.metricKey}
                onChange={(e) => handleChange('metricKey', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="e.g., injuryRisk, recoveryScore"
                required
              />
            </div>

            {/* Recommended Action */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recommended Action
              </label>
              <textarea
                value={formData.recommendedAction}
                onChange={(e) => handleChange('recommendedAction', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none"
                rows={2}
                placeholder="Enter recommended action"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Save className="w-5 h-5" />
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
