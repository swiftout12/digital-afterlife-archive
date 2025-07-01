
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, TrendingUp } from 'lucide-react';

interface TrendingGrave {
  id: string;
  title: string;
  shares: number;
  category: string;
}

const TrendingGraves = () => {
  const [trendingGraves, setTrendingGraves] = useState<TrendingGrave[]>([]);

  useEffect(() => {
    // Mock trending graves data
    const mockTrending: TrendingGrave[] = [
      { id: '1', title: 'Twitter Blue Checkmarks', shares: 2847, category: 'Tech' },
      { id: '2', title: 'My Ex\'s Instagram Stories', shares: 1923, category: 'Exes' },
      { id: '3', title: 'NFT Portfolio', shares: 1756, category: 'Crypto' },
      { id: '4', title: 'TikTok Dances', shares: 1432, category: 'Cringe' },
      { id: '5', title: 'My Self-Respect', shares: 1298, category: 'Funny' },
    ];
    setTrendingGraves(mockTrending);
  }, []);

  return (
    <Card className="bg-black border-red-600 border-2">
      <CardHeader>
        <CardTitle className="text-red-400 text-2xl font-serif flex items-center gap-2">
          <Flame className="w-6 h-6 text-red-500 animate-pulse" />
          🔥 Trending Graves (24h)
          <TrendingUp className="w-5 h-5" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trendingGraves.map((grave, index) => (
            <div 
              key={grave.id} 
              className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-red-600/30 hover:border-red-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-red-400 font-bold text-lg">#{index + 1}</span>
                <div>
                  <p className="text-white font-medium">{grave.title}</p>
                  <p className="text-gray-400 text-sm">{grave.category}</p>
                </div>
              </div>
              <div className="text-red-400 font-bold">
                {grave.shares.toLocaleString()} shares
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingGraves;
