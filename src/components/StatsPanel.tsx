
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Crown, Clock } from 'lucide-react';

interface StatsData {
  totalGraves: number;
  mostKilledToday: string;
  recentTrends: string[];
  topKillers: string[];
}

const StatsPanel = () => {
  const [stats, setStats] = useState<StatsData>({
    totalGraves: 1337,
    mostKilledToday: 'NFTs',
    recentTrends: ['Crypto', 'Tech', 'Exes', 'Cringe'],
    topKillers: ['@cryptobro2023', 'Anonymous', '@genzmillennial']
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalGraves: prev.totalGraves + Math.floor(Math.random() * 3)
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Total Graves Counter */}
      <Card className="bg-graveyard-stone border-graveyard-mist tombstone-shadow">
        <CardHeader className="text-center">
          <CardTitle className="text-graveyard-blood text-2xl font-serif">
            💀 Souls Buried
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-graveyard-ghost animate-glow">
              {stats.totalGraves.toLocaleString()}
            </div>
            <p className="text-graveyard-mist text-sm mt-2">
              And counting...
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Most Killed Today */}
      <Card className="bg-graveyard-stone border-graveyard-mist tombstone-shadow">
        <CardHeader>
          <CardTitle className="text-graveyard-ghost text-lg font-serif flex items-center gap-2">
            <Crown className="w-5 h-5 text-graveyard-blood" />
            Most Killed Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-2xl font-bold text-graveyard-blood">
              {stats.mostKilledToday}
            </div>
            <p className="text-graveyard-mist text-sm">
              Leading the death count
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Trending Categories */}
      <Card className="bg-graveyard-stone border-graveyard-mist tombstone-shadow">
        <CardHeader>
          <CardTitle className="text-graveyard-ghost text-lg font-serif flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-graveyard-blood" />
            Trending Deaths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {stats.recentTrends.map((trend, index) => (
              <div key={trend} className="flex items-center justify-between">
                <span className="text-graveyard-ghost">#{index + 1} {trend}</span>
                <span className="text-graveyard-mist text-sm">
                  {Math.floor(Math.random() * 50) + 10} buried
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Killers */}
      <Card className="bg-graveyard-stone border-graveyard-mist tombstone-shadow">
        <CardHeader>
          <CardTitle className="text-graveyard-ghost text-lg font-serif flex items-center gap-2">
            <Clock className="w-5 h-5 text-graveyard-blood" />
            Top Killers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {stats.topKillers.map((killer, index) => (
              <div key={killer} className="flex items-center justify-between">
                <span className="text-graveyard-ghost">
                  {index + 1}. {killer}
                </span>
                <span className="text-graveyard-mist text-sm">
                  {Math.floor(Math.random() * 20) + 5} kills
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Activity */}
      <Card className="bg-graveyard-stone border-graveyard-mist tombstone-shadow">
        <CardHeader>
          <CardTitle className="text-graveyard-ghost text-lg font-serif">
            🔴 Live Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="text-graveyard-mist">
              <span className="text-graveyard-blood">@anonymous</span> just buried "My Diet"
            </div>
            <div className="text-graveyard-mist">
              <span className="text-graveyard-blood">@cryptobro</span> just buried "DOGE"
            </div>
            <div className="text-graveyard-mist">
              <span className="text-graveyard-blood">@millennial</span> just buried "Skinny Jeans"
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPanel;
