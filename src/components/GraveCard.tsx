
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share, Twitter, Copy, Crown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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

interface GraveCardProps {
  grave: Grave;
}

const GraveCard = ({ grave }: GraveCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [shares, setShares] = useState(grave.shares || 0);

  const shareToTwitter = () => {
    const text = `RIP ${grave.title} 💀 "${grave.epitaph}" - Buried forever at The Internet Graveyard. No resurrections allowed.`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin + '/grave/' + grave.id)}`;
    window.open(url, '_blank');
    setShares(prev => prev + 1);
  };

  const copyLink = async () => {
    const url = `${window.location.origin}/grave/${grave.id}`;
    await navigator.clipboard.writeText(url);
    // Could add toast notification here
    setShares(prev => prev + 1);
  };

  return (
    <Card className={`bg-gray-900 border-gray-600 hover:border-red-600 transition-all duration-300 animate-rise group relative overflow-hidden ${
      grave.featured ? 'ring-2 ring-red-500 animate-glow' : ''
    }`}>
      {grave.featured && (
        <div className="absolute top-2 right-2 z-10">
          <Crown className="w-6 h-6 text-yellow-400 animate-pulse" />
        </div>
      )}
      
      <CardContent className="p-6">
        {/* Tombstone Header */}
        <div className="text-center mb-4">
          <div className="w-full h-2 bg-gray-600 rounded-full mb-2"></div>
          <h3 className="text-lg font-serif font-bold text-gray-300">
            RIP
          </h3>
          <h2 className="text-2xl font-serif font-bold text-red-400 mt-1">
            {grave.title}
          </h2>
        </div>

        {/* Media */}
        {grave.videoUrl && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <video
              src={grave.videoUrl}
              controls
              className="w-full h-48 object-cover"
              onLoadStart={() => setImageLoaded(true)}
            />
          </div>
        )}
        
        {grave.imageUrl && !grave.videoUrl && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={grave.imageUrl}
              alt={grave.title}
              className={`w-full h-48 object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        )}

        {/* Epitaph */}
        <div className="text-center mb-4">
          <p className="text-white italic font-medium text-lg leading-relaxed">
            "{grave.epitaph}"
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 my-4"></div>

        {/* Footer Info */}
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex justify-between items-center">
            <span>Killed by:</span>
            <span className="text-white font-medium">
              {grave.killedBy || 'Anonymous'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Date of Death:</span>
            <span className="text-white">
              {formatDistanceToNow(grave.dateOfDeath, { addSuffix: true })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Category:</span>
            <span className="text-red-400 font-medium">
              {grave.category}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Shares:</span>
            <span className="text-red-400 font-medium">
              {shares.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="flex justify-center space-x-2 mt-4 pt-4 border-t border-gray-600">
          <Button
            variant="outline"
            size="sm"
            onClick={shareToTwitter}
            className="bg-black border-gray-600 text-white hover:bg-red-600 hover:border-red-600 transition-colors"
          >
            <Twitter className="w-4 h-4 mr-1" />
            Tweet
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyLink}
            className="bg-black border-gray-600 text-white hover:bg-red-600 hover:border-red-600 transition-colors"
          >
            <Copy className="w-4 h-4 mr-1" />
            Copy Link
          </Button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            {grave.category}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraveCard;
