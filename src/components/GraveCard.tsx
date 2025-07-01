
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share, Twitter } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Grave {
  id: string;
  title: string;
  epitaph: string;
  killedBy: string;
  category: string;
  dateOfDeath: Date;
  imageUrl?: string;
}

interface GraveCardProps {
  grave: Grave;
}

const GraveCard = ({ grave }: GraveCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const shareToTwitter = () => {
    const text = `RIP ${grave.title} 💀 "${grave.epitaph}" - Buried at The Internet Graveyard`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin + '/grave/' + grave.id)}`;
    window.open(url, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/grave/${grave.id}`);
    // Could add toast notification here
  };

  return (
    <Card className="bg-graveyard-stone border-graveyard-mist tombstone-shadow hover:shadow-lg transition-all duration-300 animate-rise group">
      <CardContent className="p-6">
        {/* Tombstone Header */}
        <div className="text-center mb-4">
          <div className="w-full h-2 bg-graveyard-mist rounded-full mb-2"></div>
          <h3 className="text-xl font-serif font-bold text-graveyard-ghost ghost-text">
            RIP
          </h3>
          <h2 className="text-2xl font-serif font-bold text-graveyard-blood blood-glow mt-1">
            {grave.title}
          </h2>
        </div>

        {/* Image */}
        {grave.imageUrl && (
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
          <p className="text-graveyard-ghost italic font-medium text-lg leading-relaxed">
            "{grave.epitaph}"
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-graveyard-mist my-4"></div>

        {/* Footer Info */}
        <div className="space-y-2 text-sm text-graveyard-mist">
          <div className="flex justify-between items-center">
            <span>Killed by:</span>
            <span className="text-graveyard-ghost font-medium">
              {grave.killedBy || 'Anonymous'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Date of Death:</span>
            <span className="text-graveyard-ghost">
              {formatDistanceToNow(grave.dateOfDeath, { addSuffix: true })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Category:</span>
            <span className="text-graveyard-blood font-medium">
              {grave.category}
            </span>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="flex justify-center space-x-2 mt-4 pt-4 border-t border-graveyard-mist">
          <Button
            variant="outline"
            size="sm"
            onClick={shareToTwitter}
            className="bg-graveyard-dark border-graveyard-mist text-graveyard-ghost hover:bg-graveyard-blood hover:border-graveyard-blood transition-colors"
          >
            <Twitter className="w-4 h-4 mr-1" />
            Tweet
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyLink}
            className="bg-graveyard-dark border-graveyard-mist text-graveyard-ghost hover:bg-graveyard-blood hover:border-graveyard-blood transition-colors"
          >
            <Share className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-graveyard-blood text-white text-xs px-2 py-1 rounded-full">
            {grave.category}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraveCard;
