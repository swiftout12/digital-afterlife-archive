
import { useState } from 'react';
import Header from '@/components/Header';
import BuryForm, { BuryFormData } from '@/components/BuryForm';
import GraveFeed from '@/components/GraveFeed';
import StatsPanel from '@/components/StatsPanel';
import { Button } from '@/components/ui/button';
import { PlusCircle, Minus } from 'lucide-react';

interface Grave {
  id: string;
  title: string;
  epitaph: string;
  killedBy: string;
  category: string;
  dateOfDeath: Date;
  imageUrl?: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showBuryForm, setShowBuryForm] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [newGrave, setNewGrave] = useState<Grave | undefined>();
  const [totalGraves, setTotalGraves] = useState(1337);

  const handleBurySubmit = async (formData: BuryFormData) => {
    setIsProcessingPayment(true);
    
    try {
      // Simulate Stripe payment processing
      console.log('Processing payment for burial:', formData);
      
      // Mock payment delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new grave
      const grave: Grave = {
        id: Date.now().toString(),
        title: formData.title,
        epitaph: formData.epitaph,
        killedBy: formData.killedBy || 'Anonymous',
        category: formData.category,
        dateOfDeath: new Date(),
        imageUrl: formData.image ? URL.createObjectURL(formData.image) : undefined
      };
      
      setNewGrave(grave);
      setTotalGraves(prev => prev + 1);
      setShowBuryForm(false);
      
      // Mock success - In real app, this would redirect to Stripe Checkout
      alert('Payment successful! Your grave has been dug. RIP. 💀');
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. The dead reject your offering. 💸');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-graveyard-dark">
      <Header 
        onSearchChange={setSearchQuery}
        onFilterChange={setSelectedFilter}
        totalGraves={totalGraves}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-graveyard-ghost mb-4 animate-float">
            💀 Welcome to the Internet Graveyard 💀
          </h1>
          <p className="text-xl text-graveyard-mist mb-8 max-w-2xl mx-auto">
            The digital cemetery where everything you hate comes to die. 
            Pay $1 to bury anything forever. No resurrections allowed.
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={() => setShowBuryForm(!showBuryForm)}
              className="bg-graveyard-blood hover:bg-graveyard-blood-light text-white font-bold py-3 px-6 rounded-lg animate-glow"
            >
              {showBuryForm ? (
                <>
                  <Minus className="w-5 h-5 mr-2" />
                  Cancel Burial
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Bury Something
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Bury Form */}
        {showBuryForm && (
          <div className="mb-12">
            <BuryForm onSubmit={handleBurySubmit} isLoading={isProcessingPayment} />
          </div>
        )}

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
              newGrave={newGrave}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-graveyard-mist">
          <div className="text-center text-graveyard-mist">
            <p className="mb-2">
              🪦 The Internet Graveyard - Where Digital Things Come to Die
            </p>
            <p className="text-sm">
              No refunds. No resurrections. All sales are final... like death.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
