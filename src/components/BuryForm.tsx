
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skull, Upload, CreditCard } from 'lucide-react';

interface BuryFormProps {
  onSubmit: (data: BuryFormData) => void;
  isLoading: boolean;
}

export interface BuryFormData {
  title: string;
  epitaph: string;
  killedBy: string;
  image?: File;
  category: string;
}

const BuryForm = ({ onSubmit, isLoading }: BuryFormProps) => {
  const [formData, setFormData] = useState<BuryFormData>({
    title: '',
    epitaph: '',
    killedBy: '',
    category: 'Funny'
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  const categories = [
    'Funny', 'Serious', 'Trends', 'Exes', 'Tech', 'Crypto', 'Politics', 'Cringe'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="bg-graveyard-stone border-graveyard-mist tombstone-shadow">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-serif text-graveyard-ghost flex items-center justify-center gap-2">
            <Skull className="w-8 h-8 text-graveyard-blood animate-glow" />
            Dig a Grave
            <Skull className="w-8 h-8 text-graveyard-blood animate-glow" />
          </CardTitle>
          <p className="text-graveyard-mist">
            Pay $1 to digitally bury anything forever. RIP to whatever you're killing today.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-graveyard-ghost font-medium mb-2">
                🔤 What are you killing?
              </label>
              <Input
                placeholder="NFTs, My Ex, Crypto, TikTok Dances..."
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-graveyard-dark border-graveyard-mist text-graveyard-ghost placeholder-graveyard-mist"
                required
              />
            </div>

            <div>
              <label className="block text-graveyard-ghost font-medium mb-2">
                💬 Epitaph or Last Words
              </label>
              <Textarea
                placeholder="Here lies my dignity after buying that NFT..."
                value={formData.epitaph}
                onChange={(e) => setFormData(prev => ({ ...prev, epitaph: e.target.value.slice(0, 150) }))}
                className="bg-graveyard-dark border-graveyard-mist text-graveyard-ghost placeholder-graveyard-mist resize-none"
                rows={3}
                maxLength={150}
                required
              />
              <p className="text-graveyard-mist text-sm mt-1">
                {formData.epitaph.length}/150 characters
              </p>
            </div>

            <div>
              <label className="block text-graveyard-ghost font-medium mb-2">
                📷 Optional Image Upload
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/png,image/jpg,image/jpeg"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-graveyard-mist rounded-lg cursor-pointer hover:border-graveyard-blood transition-colors bg-graveyard-dark"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-graveyard-mist mx-auto mb-2" />
                      <p className="text-graveyard-mist">Click to upload image</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-graveyard-ghost font-medium mb-2">
                  🧑 Killed by
                </label>
                <Input
                  placeholder="@username or Anonymous"
                  value={formData.killedBy}
                  onChange={(e) => setFormData(prev => ({ ...prev, killedBy: e.target.value }))}
                  className="bg-graveyard-dark border-graveyard-mist text-graveyard-ghost placeholder-graveyard-mist"
                  required
                />
              </div>
              <div>
                <label className="block text-graveyard-ghost font-medium mb-2">
                  🏷️ Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 rounded-md bg-graveyard-dark border border-graveyard-mist text-graveyard-ghost"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <Separator className="bg-graveyard-mist" />

            <div className="text-center">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-graveyard-blood hover:bg-graveyard-blood-light text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 animate-glow"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                {isLoading ? 'Digging Grave...' : 'Pay $1 & Bury Forever ⚰️'}
              </Button>
              <p className="text-graveyard-mist text-sm mt-2">
                Secure payment via Stripe • No refunds for the dead
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuryForm;
