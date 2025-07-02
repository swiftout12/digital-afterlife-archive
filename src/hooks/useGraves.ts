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
  killedBy?: string; // Made optional to match GraveCard interface
}

export const useGraves = () => {
  const [graves, setGraves] = useState<Grave[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalGraves, setTotalGraves] = useState(0);
  const { user } = useAuth();

  const fetchGraves = async () => {
    try {
      console.log('Fetching graves...');
      
      // Fetch all graves with no limit to see all fake posts
      const { data: gravesData, error: gravesError, count } = await supabase
        .from('graves')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (gravesError) {
        console.error('Error fetching graves:', gravesError);
        toast.error('Failed to load graves');
        return;
      }

      console.log(`Found ${gravesData?.length || 0} graves in database`);
      console.log('Total count from query:', count);

      // Fetch profiles to get usernames - handle case where we might not have profiles for all graves
      const userIds = [...new Set(gravesData?.map(grave => grave.user_id) || [])];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, username')
        .in('id', userIds);

      console.log(`Found ${profilesData?.length || 0} profiles for ${userIds.length} unique user IDs`);

      // Create a map of user_id to username
      const userMap = new Map();
      profilesData?.forEach(profile => {
        userMap.set(profile.id, profile.username);
      });

      const formattedGraves: Grave[] = gravesData?.map(grave => ({
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
        shares: grave.shares || 0,
        views: grave.views || 0,
        likes: grave.likes || 0,
        killedBy: userMap.get(grave.user_id) || 'system_seeder'
      })) || [];

      console.log(`Formatted ${formattedGraves.length} graves for display`);
      console.log('Sample graves:', formattedGraves.slice(0, 3).map(g => ({ 
        title: g.title, 
        category: g.category, 
        shares: g.shares 
      })));

      setGraves(formattedGraves);
      setTotalGraves(count || formattedGraves.length);
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
      // Create the grave object matching the database schema
      const graveRecord = {
        user_id: user.id,
        title: graveData.title,
        epitaph: graveData.epitaph,
        backstory: graveData.backstory,
        category: graveData.category as any, // Cast to match the enum type
        tier: graveData.tier as any, // Cast to match the enum type
        featured: graveData.tier === 'featured',
        image_url: graveData.image ? URL.createObjectURL(graveData.image) : null,
        video_url: graveData.video ? URL.createObjectURL(graveData.video) : null,
      };

      const { data, error } = await supabase
        .from('graves')
        .insert(graveRecord)
        .select()
        .single();

      if (error) {
        console.error('Error creating grave:', error);
        toast.error('Failed to bury your item');
        return null;
      }

      // Get the user's username for the new grave
      const { data: profileData } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

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
        killedBy: profileData?.username || 'Anonymous'
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
