import { Search, X } from 'lucide-react';
import { Update } from '../data/trainerData';
import { formatDateTime } from '../utils/helpers';

interface UpdatesFeedProps {
  updates: Update[];
  searchText: string;
  onSearchChange: (text: string) => void;
  categoryFilter: string | null;
  onCategoryFilter: (category: string | null) => void;
}

const categories: Update['category'][] = ['Health', 'Training', 'Nutrition', 'Biomechanics', 'Environment'];

const roleColors: Record<Update['role'], string> = {
  Trainer: 'bg-blue-100 text-blue-800',
  Vet: 'bg-green-100 text-green-800',
  Nutritionist: 'bg-purple-100 text-purple-800',
};

const categoryColors: Record<Update['category'], string> = {
  Health: 'bg-red-100 text-red-800',
  Training: 'bg-blue-100 text-blue-800',
  Nutrition: 'bg-yellow-100 text-yellow-800',
  Biomechanics: 'bg-purple-100 text-purple-800',
  Environment: 'bg-gray-100 text-gray-800',
};

export default function UpdatesFeed({
  updates,
  searchText,
  onSearchChange,
  categoryFilter,
  onCategoryFilter,
}: UpdatesFeedProps) {
  const filteredUpdates = updates.filter(update => {
    const matchesSearch = searchText === '' || 
      update.text.toLowerCase().includes(searchText.toLowerCase()) ||
      update.role.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesCategory = categoryFilter === null || update.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gradient-to-br from-white to-teal-50 rounded-xl p-6 border border-teal-100 shadow-[0_4px_6px_-1px_rgba(20,184,166,0.1),0_2px_4px_-1px_rgba(20,184,166,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(20,184,166,0.2),0_4px_6px_-2px_rgba(20,184,166,0.1)] transition-all">
      <h2 className="text-xl font-bold text-gray-900 mb-5">Last Updates</h2>

      {/* Search and Filters */}
      <div className="mb-5 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search updates..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-10 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 shadow-sm"
          />
          {searchText && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryFilter(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              categoryFilter === null
                ? 'bg-gray-900 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onCategoryFilter(categoryFilter === category ? null : category)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                categoryFilter === category
                  ? `${categoryColors[category]} shadow-lg scale-105`
                  : categoryColors[category] + ' hover:opacity-90 border-2 border-transparent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {categoryFilter && (
          <div className="flex items-center gap-2 text-sm bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <span className="text-gray-600 font-medium">Filtered by:</span>
            <span className={`px-3 py-1 rounded-lg ${categoryColors[categoryFilter]} font-bold shadow-sm`}>
              {categoryFilter}
            </span>
            <button
              onClick={() => onCategoryFilter(null)}
              className="ml-auto p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Updates List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredUpdates.length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-8 bg-white rounded-lg shadow-sm">No updates found</div>
        ) : (
          filteredUpdates.map(update => (
            <div
              key={update.id}
              className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-teal-300 hover:shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold shadow-sm ${roleColors[update.role]}`}>
                    {update.role}
                  </span>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold shadow-sm ${categoryColors[update.category]}`}>
                    {update.category}
                  </span>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap font-medium">
                  {formatDateTime(update.dateTime)}
                </span>
              </div>
              <p className="text-sm text-gray-700 font-medium">{update.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
