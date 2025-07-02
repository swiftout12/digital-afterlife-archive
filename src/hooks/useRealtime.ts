
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TrendingGrave {
  id: string;
  title: string;
  shares: number;
  category: string;
  trend_score: number;
}

export const useRealtime = () => {
  const [trendingGraves, setTrendingGraves] = useState<TrendingGrave[]>([]);
  const [realtimeCount, setRealtimeCount] = useState(0);

  // Fetch trending graves using the new database function
  const fetchTrendingGraves = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_trending_graves', { hours_back: 24 });
      
      if (error) {
        console.error('Error fetching trending graves:', error);
        return;
      }
      
      console.log('Trending graves data:', data);
      setTrendingGraves(data || []);
    } catch (error) {
      console.error('Error in fetchTrendingGraves:', error);
    }
  };

  // Get current total count for real-time updates
  const fetchCurrentCount = async () => {
    try {
      const { count, error } = await supabase
        .from('graves')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error('Error fetching count:', error);
        return;
      }
      setRealtimeCount(count || 0);
    } catch (error) {
      console.error('Error in fetchCurrentCount:', error);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchTrendingGraves();
    fetchCurrentCount();

    // Set up real-time subscription for graves table
    const channel = supabase
      .channel('graves-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'graves'
        },
        (payload) => {
          console.log('New grave added:', payload);
          // Increment the counter
          setRealtimeCount(prev => prev + 1);
          // Refresh trending data
          fetchTrendingGraves();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'graves'
        },
        (payload) => {
          console.log('Grave updated:', payload);
          // Refresh trending data when shares/views change
          fetchTrendingGraves();
        }
      )
      .subscribe();

    // Refresh trending graves every 5 minutes
    const trendingInterval = setInterval(fetchTrendingGraves, 5 * 60 * 1000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(trendingInterval);
    };
  }, []);

  return {
    trendingGraves,
    realtimeCount,
    refetchTrending: fetchTrendingGraves,
    refetchCount: fetchCurrentCount
  };
};
