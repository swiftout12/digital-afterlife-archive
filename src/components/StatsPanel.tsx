
import { useState, useEffect } from 'react'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Crown, Clock, DollarSign } from 'lucide-react';
import { useRealtime } from '@/hooks/useRealtime';

interface StatsData {
  totalRevenue: number;
  mostKilledToday: string;
  recentTrends: { name: string; count: number }[];
  topKillers: { name: string; kills: number }[];
}

const StatsPanel = () => {
  const { realtimeCount, trendingGraves } = useRealtime();
  const [stats, setStats] = useState<StatsData>({
    totalRevenue: 4269,
    mostKilledToday: 'NFTs',
    recentTrends: [
      { name: 'Crypto', count: 67 },
      { name: 'Tech', count: 54 },
      { name: 'Exes', count: 43 },
      { name: 'Cringe', count: 38 }
    ],
    topKillers: [
      { name: '@cryptobro2023', kills: 23 },
      { name: 'Anonymous', kills: 19 },
      { name: '@genzmillennial', kills: 15 }
    ]
  });

  useEffect(() => {
    // Simulate real-time updates for revenue
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 10)
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Extract most killed category from trending data
  const mostTrendingCategory = trendingGraves.length > 0 ? trendingGraves[0].category : stats.mostKilledToday;

  return (
    <div className="space-y-6">
      {/* Total Graves Counter - Now using real-time data */}
      <Card className="bg-black border-red-600 border-2">
        <CardHeader className="text-center">
          <CardTitle className="text-red-400 text-2xl font-serif">
            💀 Souls Buried
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-white animate-glow">
              {(realtimeCount || 1337).toLocaleString()}
            </div>
            <p className="text-gray-400 text-sm mt-2">
              And counting...
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Counter */}
      <Card className="bg-black border-red-600 border-2">
        <CardHeader className="text-center">
          <CardTitle className="text-green-400 text-2xl font-serif flex items-center justify-center gap-2">
            <DollarSign className="w-6 h-6" />
            Death Money
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Collected from the grieving
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Most Killed Today - Dynamic based on trending */}
      <Card className="bg-black border-red-600 border-2">
        <CardHeader>
          <CardTitle className="text-white text-lg font-serif flex items-center gap-2">
            <Crown className="w-5 h-5 text-red-400" />
            Most Killed Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              {mostTrendingCategory}
            </div>
            <p className="text-gray-400 text-sm">
              Leading the death count
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Trending Categories */}
      <Card className="bg-black border-red-600 border-2">
        <CardHeader>
          <CardTitle className="text-white text-lg font-serif flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-400" />
            Death Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {stats.recentTrends.map((trend, index) => (
              <div key={trend.name} className="flex items-center justify-between">
                <span className="text-white">#{index + 1} {trend.name}</span>
                <span className="text-gray-400 text-sm">
                  {trend.count} buried
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Killers */}
      <Card className="bg-black border-red-600 border-2">
        <CardHeader>
          <CardTitle className="text-white text-lg font-serif flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-400" />
            Serial Killers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {stats.topKillers.map((killer, index) => (
              <div key={killer.name} className="flex items-center justify-between">
                <span className="text-white">
                  {index + 1}. {killer.name}
                </span>
                <span className="text-gray-400 text-sm">
                  {killer.kills} kills
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Activity */}
      <Card className="bg-black border-red-600 border-2">
        <CardHeader>
          <CardTitle className="text-white text-lg font-serif">
            🔴 Live Deaths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            {trendingGraves.slice(0, 3).map((grave, index) => (
              <div key={grave.id} className="text-gray-400">
                <span className="text-red-400">@system</span> buried "{grave.title}"
              </div>
            ))}
            {trendingGraves.length === 0 && (
              <>
                <div className="text-gray-400">
                  <span className="text-red-400">@anonymous</span> just buried "My Diet"
                </div>
                <div className="text-gray-400">
                  <span className="text-red-400">@cryptobro</span> just buried "DOGE Coin"
                </div>
                <div className="text-gray-400">
                  <span className="text-red-400">@millennial</span> just buried "Skinny Jeans"
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPanel;
