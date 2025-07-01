
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skull, Upload, CreditCard, Image, Video, Crown, Package } from 'lucide-react';

interface BuryFormProps {
  onSubmit: (data: BuryFormData) => void;
  isLoading: boolean;
}

export interface BuryFormData {
  title: string;
  epitaph: string;
  backstory?: string;
  killedBy: string;
  image?: File;
  video?: File;
  category: string;
  tier: 'basic' | 'image' | 'video' | 'featured' | 'bundle';
}

const BuryForm = ({ onSubmit, isLoading }: BuryFormProps) => {
  const [formData, setFormData] = useState<BuryFormData>({
    title: '',
    epitaph: '',
    backstory: '',
    killedBy: '',
    category: 'Funny',
    tier: 'basic'
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [videoPreview, setVideoPreview] = useState<string>('');

  const categories = [
    'Funny', 'Cringe', 'Exes', 'Crypto', 'Tech', 'Politics', 'Trends', 'Serious'
  ];

  const tiers = [
    { id: 'basic', name: 'Basic Grave', price: '$1', description: 'Text only burial', icon: Skull },
    { id: 'image', name: 'Image Grave', price: '$3', description: 'Upload memorial photo', icon: Image },
    { id: 'video', name: 'Video Grave', price: '$5', description: '10-second MP4 eulogy', icon: Video },
    { id: 'featured', name: 'Featured Grave', price: '$10', description: 'Top placement + glow effect', icon: Crown },
    { id: 'bundle', name: 'Bundle Burial', price: '$25', description: 'Bury 5 items at once', icon: Package },
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

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, video: file }));
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedTier = tiers.find(t => t.id === formData.tier);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-black border-red-600 border-2 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-serif text-white flex items-center justify-center gap-2">
            <Skull className="w-10 h-10 text-red-600 animate-glow" />
            Dig Your Grave
            <Skull className="w-10 h-10 text-red-600 animate-glow" />
          </CardTitle>
          <p className="text-gray-300 text-lg">
            Choose your burial package and send anything to the digital afterlife forever.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tier Selection */}
            <div>
              <label className="block text-white font-bold text-lg mb-4">
                💰 Choose Your Burial Package
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                {tiers.map((tier) => {
                  const IconComponent = tier.icon;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setFormData(prev => ({ ...prev, tier: tier.id as any }))}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.tier === tier.id
                          ? 'border-red-600 bg-red-600/20'
                          : 'border-gray-600 hover:border-red-400'
                      }`}
                    >
                      <div className="text-center">
                        <IconComponent className={`w-8 h-8 mx-auto mb-2 ${
                          formData.tier === tier.id ? 'text-red-400' : 'text-gray-400'
                        }`} />
                        <div className={`font-bold ${
                          formData.tier === tier.id ? 'text-red-400' : 'text-white'
                        }`}>
                          {tier.price}
                        </div>
                        <div className="text-sm text-gray-300">{tier.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{tier.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-white font-bold text-lg mb-2">
                🔤 What are you burying?
              </label>
              <Input
                placeholder="NFTs, My Ex, Crypto, TikTok Dances, My Dignity..."
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-gray-900 border-gray-600 text-white placeholder-gray-400 text-lg"
                required
              />
            </div>

            <div>
              <label className="block text-white font-bold text-lg mb-2">
                💬 Final Words / Epitaph
              </label>
              <Textarea
                placeholder="Here lies my life savings after buying that NFT... May it rest in eternal cringe."
                value={formData.epitaph}
                onChange={(e) => setFormData(prev => ({ ...prev, epitaph: e.target.value.slice(0, 200) }))}
                className="bg-gray-900 border-gray-600 text-white placeholder-gray-400 resize-none"
                rows={4}
                maxLength={200}
                required
              />
              <p className="text-gray-400 text-sm mt-1">
                {formData.epitaph.length}/200 characters
              </p>
            </div>

            <div>
              <label className="block text-white font-bold text-lg mb-2">
                📖 Backstory (Optional)
              </label>
              <Textarea
                placeholder="Tell the world how this came to be buried here..."
                value={formData.backstory || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, backstory: e.target.value.slice(0, 300) }))}
                className="bg-gray-900 border-gray-600 text-white placeholder-gray-400 resize-none"
                rows={3}
                maxLength={300}
              />
              <p className="text-gray-400 text-sm mt-1">
                {(formData.backstory || '').length}/300 characters
              </p>
            </div>

            {/* Image Upload */}
            {(formData.tier === 'image' || formData.tier === 'video' || formData.tier === 'featured') && (
              <div>
                <label className="block text-white font-bold text-lg mb-2">
                  📷 Memorial Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-red-600 transition-colors bg-gray-900"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-400">Click to upload memorial image</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            )}

            {/* Video Upload */}
            {(formData.tier === 'video' || formData.tier === 'featured') && (
              <div>
                <label className="block text-white font-bold text-lg mb-2">
                  🎥 Memorial Video (10 seconds max)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="video/mp4"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-red-600 transition-colors bg-gray-900"
                  >
                    {videoPreview ? (
                      <video
                        src={videoPreview}
                        className="w-full h-full object-cover rounded-lg"
                        controls
                      />
                    ) : (
                      <div className="text-center">
                        <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-400">Click to upload 10-second eulogy</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-bold text-lg mb-2">
                  🧑 Killed by
                </label>
                <Input
                  placeholder="@username or Anonymous"
                  value={formData.killedBy}
                  onChange={(e) => setFormData(prev => ({ ...prev, killedBy: e.target.value }))}
                  className="bg-gray-900 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-bold text-lg mb-2">
                  🏷️ Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-3 rounded-md bg-gray-900 border border-gray-600 text-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <Separator className="bg-gray-600" />

            <div className="text-center">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 text-xl rounded-lg transition-all duration-300 animate-glow transform hover:scale-105"
              >
                <CreditCard className="w-6 h-6 mr-2" />
                {isLoading ? 'Digging Grave...' : `${selectedTier?.price} - Bury Forever ⚰️`}
              </Button>
              <p className="text-gray-400 text-sm mt-3">
                Secure payment via Stripe • No refunds for the dead • No resurrections allowed
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuryForm;
