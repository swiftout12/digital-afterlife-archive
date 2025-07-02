
import GraveCard from './GraveCard';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Grave } from '@/hooks/useGraves';

interface GraveFeedProps {
  searchQuery: string;
  selectedFilter: string;
  graves: Grave[];
  loading: boolean;
}

const GraveFeed = ({ searchQuery, selectedFilter, graves, loading }: GraveFeedProps) => {
  console.log('GraveFeed received:', {
    gravesCount: graves.length,
    searchQuery,
    selectedFilter,
    loading
  });

  const filteredGraves = graves.filter(grave => {
    const matchesSearch = grave.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grave.epitaph.toLowerCase().includes(searchQuery.toLowerCase());
    // Fix the filter logic - 'All' should show everything, otherwise match the exact category
    const matchesFilter = selectedFilter === 'All' || selectedFilter === '' || grave.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  console.log('Filtered graves count:', filteredGraves.length);
  console.log('Sample filtered graves:', filteredGraves.slice(0, 2).map(g => ({ title: g.title, category: g.category })));

  if (loading) {
    return (
      <div className="w-full">
        <div className="text-center py-12">
          <div className="text-6xl mb-4 animate-bounce">⚰️</div>
          <h3 className="text-xl font-serif text-white mb-2">Digging up graves...</h3>
          <p className="text-gray-400">The dead are awakening...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-serif font-bold text-white">
          🪦 Recent Burials ({filteredGraves.length})
        </h2>
      </div>

      {filteredGraves.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏜️</div>
          <h3 className="text-xl font-serif text-white mb-2">No Graves Found</h3>
          <p className="text-gray-400">
            {searchQuery ? 'No graves match your search.' : 'No graves in this category yet.'}
          </p>
          {graves.length > 0 && (
            <div className="text-yellow-400 mt-2 text-sm">
              <p>Debug: Found {graves.length} total graves</p>
              <p>Filter: "{selectedFilter}"</p>
              <p>Available categories: {Array.from(new Set(graves.map(g => g.category))).join(', ')}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGraves.map((grave) => (
            <GraveCard key={grave.id} grave={grave} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GraveFeed;
