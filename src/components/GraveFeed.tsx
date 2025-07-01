
import { useState, useEffect } from 'react';
import GraveCard from './GraveCard';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface Grave {
  id: string;
  title: string;
  epitaph: string;
  killedBy: string;
  category: string;
  dateOfDeath: Date;
  imageUrl?: string;
  videoUrl?: string;
  featured?: boolean;
  shares?: number;
}

interface GraveFeedProps {
  searchQuery: string;
  selectedFilter: string;
  newGrave?: Grave;
}

const GraveFeed = ({ searchQuery, selectedFilter, newGrave }: GraveFeedProps) => {
  const [graves, setGraves] = useState<Grave[]>([]);
  const [loading, setLoading] = useState(false);

  // Enhanced mock data with new features
  const mockGraves: Grave[] = [
    {
      id: '1',
      title: 'NFTs',
      epitaph: 'Here lies my life savings. At least I own a receipt for a JPEG that nobody wants.',
      killedBy: '@cryptobro2023',
      category: 'Crypto',
      dateOfDeath: new Date('2024-01-15'),
      featured: true,
      shares: 2847,
    },
    {
      id: '2',
      title: 'My Ex',
      epitaph: 'Took half my stuff but left all the trauma. Thanks for the memories... NOT.',
      killedBy: 'Anonymous',
      category: 'Exes',
      dateOfDeath: new Date('2024-01-10'),
      shares: 1923,
    },
    {
      id: '3',
      title: 'TikTok Dances',
      epitaph: 'Died of cringe. May they never renegade again in the digital afterlife.',
      killedBy: '@genzmillennial',
      category: 'Cringe',
      dateOfDeath: new Date('2024-01-12'),
      shares: 1432,
    },
    {
      id: '4',
      title: 'Twitter Blue Checkmarks',
      epitaph: 'Once meant something. Now just $8 and a prayer to Elon.',
      killedBy: '@elonmusk',
      category: 'Tech',
      dateOfDeath: new Date('2024-01-08'),
      shares: 1756,
    },
    {
      id: '5',
      title: 'My Dignity',
      epitaph: 'Lost somewhere between my last three job interviews and that karaoke night.',
      killedBy: '@adulting_is_hard',
      category: 'Funny',
      dateOfDeath: new Date('2024-01-14'),
      shares: 1298,
    },
    {
      id: '6',
      title: 'Cryptocurrency',
      epitaph: 'To the moon they said. Ended up six feet under instead.',
      killedBy: '@diamond_hands',
      category: 'Crypto',
      dateOfDeath: new Date('2024-01-11'),
      shares: 987,
    },
    {
      id: '7',
      title: 'My Sleep Schedule',
      epitaph: 'RIP to 8 hours of sleep. Killed by Netflix binges and existential dread.',
      killedBy: '@nightowl4life',
      category: 'Funny',
      dateOfDeath: new Date('2024-01-13'),
      shares: 654,
    },
    {
      id: '8',
      title: 'Skinny Jeans',
      epitaph: 'Gen Z said no. The ankles rejoiced. Fashion moves on.',
      killedBy: '@genz_fashion_police',
      category: 'Trends',
      dateOfDeath: new Date('2024-01-09'),
      shares: 543,
    }
  ];

  useEffect(() => {
    // Initialize with mock data
    setGraves(mockGraves);
  }, []);

  useEffect(() => {
    // Add new grave to the top of the list
    if (newGrave) {
      setGraves(prev => [newGrave, ...prev]);
    }
  }, [newGrave]);

  const filteredGraves = graves.filter(grave => {
    const matchesSearch = grave.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grave.epitaph.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || grave.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const refreshFeed = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-serif font-bold text-white">
          🪦 Recent Burials ({filteredGraves.length})
        </h2>
        <Button
          onClick={refreshFeed}
          disabled={loading}
          variant="outline"
          size="sm"
          className="bg-gray-900 border-gray-600 text-white hover:bg-red-600 hover:border-red-600"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {filteredGraves.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏜️</div>
          <h3 className="text-xl font-serif text-white mb-2">No Graves Found</h3>
          <p className="text-gray-400">
            {searchQuery ? 'No graves match your search.' : 'No graves in this category yet.'}
          </p>
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
