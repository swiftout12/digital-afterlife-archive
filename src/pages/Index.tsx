import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BuryForm, { BuryFormData } from '@/components/BuryForm';
import GraveFeed from '@/components/GraveFeed';
import StatsPanel from '@/components/StatsPanel';
import TrendingGraves from '@/components/TrendingGraves';
import FloatingGhosts from '@/components/FloatingGhosts';
import { Button } from '@/components/ui/button';
import { PlusCircle, Minus, Skull, LogIn } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';
import { useGraves } from '@/hooks/useGraves';
import { useRealtime } from '@/hooks/useRealtime';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showBuryForm, setShowBuryForm] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { graves, totalGraves, createGrave, loading: gravesLoading } = useGraves();
  const { realtimeCount } = useRealtime();
  const navigate = useNavigate();

  // Use real-time count if available, fallback to totalGraves
  const displayCount = realtimeCount > 0 ? realtimeCount : totalGraves;

  const handleBurySubmit = async (formData: BuryFormData) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setIsProcessingPayment(true);
    
    try {
      // Simulate payment processing
      console.log('Processing payment for burial:', formData);
      
      // Mock payment delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create grave in database
      const newGrave = await createGrave({
        title: formData.title,
        epitaph: formData.epitaph,
        backstory: formData.backstory,
        category: formData.category,
        tier: formData.tier,
        image: formData.image,
        video: formData.video
      });
      
      if (newGrave) {
        setShowBuryForm(false);
        // Mock success - In real app, this would redirect to Stripe Checkout
        alert(`💀 Payment successful! Your ${formData.tier} grave has been dug. RIP forever. 💀`);
      }
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('💸 Payment failed. The dead reject your offering. Try again, mortal. 💸');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Loading the afterlife... 💀</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <FloatingGhosts />
      
      {/* Animated background mist */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-graveyard-mist/20 via-transparent to-graveyard-mist/20 animate-pulse"></div>
      </div>

      <Header 
        onSearchChange={setSearchQuery}
        onFilterChange={setSelectedFilter}
        totalGraves={displayCount}
      />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-6xl md:text-8xl font-serif font-black text-white mb-4 animate-float">
              <span className="text-red-600">💀</span> THE INTERNET GRAVEYARD <span className="text-red-600">💀</span>
            </h1>
            <p className="text-2xl md:text-3xl text-red-400 font-serif mb-2">
              Where digital things come to die for $1
            </p>
            <p className="text-xl text-gray-400 font-bold">
              No resurrections allowed.
            </p>
          </div>
          
          {/* Soul Counter - Now with real-time updates */}
          <div className="mb-8">
            <div className="inline-flex items-center bg-black border-2 border-red-600 rounded-lg px-6 py-3 animate-glow">
              <Skull className="w-8 h-8 text-red-600 mr-3 animate-pulse" />
              <span className="text-3xl font-bold text-white">
                {displayCount.toLocaleString()} Souls Buried
              </span>
              <span className="text-2xl ml-2">👻</span>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            {user ? (
              <Button
                onClick={() => setShowBuryForm(!showBuryForm)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 text-xl rounded-lg animate-glow transform hover:scale-105 transition-all duration-300"
              >
                {showBuryForm ? (
                  <>
                    <Minus className="w-6 h-6 mr-2" />
                    Cancel Burial
                  </>
                ) : (
                  <>
                    <Skull className="w-6 h-6 mr-2" />
                    💀 Bury Something
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/auth')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 text-xl rounded-lg animate-glow transform hover:scale-105 transition-all duration-300"
              >
                <LogIn className="w-6 h-6 mr-2" />
                💀 Sign In to Bury
              </Button>
            )}
          </div>
        </div>

        {/* Bury Form */}
        {showBuryForm && user && (
          <div className="mb-12 relative z-20">
            <BuryForm onSubmit={handleBurySubmit} isLoading={isProcessingPayment} />
          </div>
        )}

        {/* Trending Section - Now with real data */}
        <div className="mb-12">
          <TrendingGraves />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Stats Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24">
              <StatsPanel />
            </div>
          </div>

          {/* Grave Feed */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <GraveFeed 
              searchQuery={searchQuery}
              selectedFilter={selectedFilter}
              graves={graves}
              loading={gravesLoading}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-red-600/30">
          <div className="text-center text-gray-400">
            <p className="mb-2 text-xl font-serif">
              💀 The Internet Graveyard - Where Digital Things Come to Die 💀
            </p>
            <p className="text-lg">
              No refunds. No resurrections. All sales are final... like death.
            </p>
            <p className="text-sm mt-4 text-red-400">
              "A meme-powered, sarcastic troll museum of failed internet culture"
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
