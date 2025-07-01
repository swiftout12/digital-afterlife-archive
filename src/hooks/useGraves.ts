
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthContext';
import { toast } from 'sonner';

export interface Grave {
  id: string;
  title: string;
  epitaph: string;
  backstory?: string;
  category: string;
  tier: string;
  dateOfDeath: Date;
  imageUrl?: string;
  videoUrl?: string;
  featured?: boolean;
  shares?: number;
  views?: number;
  likes?: number;
  killedBy?: string; // This will be the username from profiles
}

export const useGraves = () => {
  const [graves, setGraves] = useState<Grave[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalGraves, setTotalGraves] = useState(0);
  const { user } = useAuth();

  const fetchGraves = async () => {
    try {
      // Fetch graves with profile information
      const { data, error } = await supabase
        .from('graves')
        .select(`
          *,
          profiles(username)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching graves:', error);
        toast.error('Failed to load graves');
        return;
      }

      const formattedGraves: Grave[] = data?.map(grave => ({
        id: grave.id,
        title: grave.title,
        epitaph: grave.epitaph,
        backstory: grave.backstory,
        category: grave.category,
        tier: grave.tier,
        dateOfDeath: new Date(grave.created_at),
        imageUrl: grave.image_url,
        videoUrl: grave.video_url,
        featured: grave.featured,
        shares: grave.shares,
        views: grave.views,
        likes: grave.likes,
        killedBy: grave.profiles?.username || 'Anonymous'
      })) || [];

      setGraves(formattedGraves);
      setTotalGraves(formattedGraves.length);
    } catch (error) {
      console.error('Error in fetchGraves:', error);
      toast.error('Failed to load graves');
    } finally {
      setLoading(false);
    }
  };

  const createGrave = async (graveData: {
    title: string;
    epitaph: string;
    backstory?: string;
    category: string;
    tier: string;
    image?: File;
    video?: File;
  }) => {
    if (!user) {
      toast.error('You must be logged in to bury something');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('graves')
        .insert([
          {
            user_id: user.id,
            title: graveData.title,
            epitaph: graveData.epitaph,
            backstory: graveData.backstory,
            category: graveData.category,
            tier: graveData.tier,
            featured: graveData.tier === 'featured',
            image_url: graveData.image ? URL.createObjectURL(graveData.image) : null,
            video_url: graveData.video ? URL.createObjectURL(graveData.video) : null,
          }
        ])
        .select(`
          *,
          profiles(username)
        `)
        .single();

      if (error) {
        console.error('Error creating grave:', error);
        toast.error('Failed to bury your item');
        return null;
      }

      const newGrave: Grave = {
        id: data.id,
        title: data.title,
        epitaph: data.epitaph,
        backstory: data.backstory,
        category: data.category,
        tier: data.tier,
        dateOfDeath: new Date(data.created_at),
        imageUrl: data.image_url,
        videoUrl: data.video_url,
        featured: data.featured,
        shares: data.shares,
        views: data.views,
        likes: data.likes,
        killedBy: data.profiles?.username || 'Anonymous'
      };

      // Add to local state
      setGraves(prev => [newGrave, ...prev]);
      setTotalGraves(prev => prev + 1);

      return newGrave;
    } catch (error) {
      console.error('Error in createGrave:', error);
      toast.error('Failed to bury your item');
      return null;
    }
  };

  useEffect(() => {
    fetchGraves();
  }, []);

  return {
    graves,
    loading,
    totalGraves,
    createGrave,
    refetch: fetchGraves
  };
};
