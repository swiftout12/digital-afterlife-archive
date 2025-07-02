
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, TrendingUp } from 'lucide-react';
import { useRealtime } from '@/hooks/useRealtime';

const TrendingGraves = () => {
  const { trendingGraves } = useRealtime();

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
          {trendingGraves.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-400">No trending graves yet...</p>
              <p className="text-gray-500 text-sm">Come back later for hot content! 🔥</p>
            </div>
          ) : (
            trendingGraves.map((grave, index) => (
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingGraves;
