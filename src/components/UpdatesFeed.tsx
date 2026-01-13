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
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Last Updates</h2>

      {/* Search and Filters */}
      <div className="mb-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search updates..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          {searchText && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryFilter(null)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              categoryFilter === null
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onCategoryFilter(categoryFilter === category ? null : category)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                categoryFilter === category
                  ? 'bg-gray-900 text-white'
                  : categoryColors[category] + ' hover:opacity-80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {categoryFilter && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Filtered by:</span>
            <span className="px-2 py-1 rounded bg-gray-100 text-gray-900 font-medium">
              {categoryFilter}
            </span>
            <button
              onClick={() => onCategoryFilter(null)}
              className="text-gray-600 hover:text-gray-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Updates List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredUpdates.length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-8">No updates found</div>
        ) : (
          filteredUpdates.map(update => (
            <div
              key={update.id}
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${roleColors[update.role]}`}>
                    {update.role}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${categoryColors[update.category]}`}>
                    {update.category}
                  </span>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {formatDateTime(update.dateTime)}
                </span>
              </div>
              <p className="text-sm text-gray-700">{update.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
