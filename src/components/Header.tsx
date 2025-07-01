
import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: string) => void;
  totalGraves: number;
}

const Header = ({ onSearchChange, onFilterChange, totalGraves }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    'All', 'Funny', 'Serious', 'Trends', 'Exes', 'Tech', 'Crypto', 'Politics', 'Cringe'
  ];

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearchChange(value);
  };

  return (
    <header className="sticky top-0 z-50 bg-graveyard-dark/95 backdrop-blur-sm border-b border-graveyard-stone">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-graveyard-ghost blood-glow">
              ⚰️ The Internet Graveyard
            </h1>
            <div className="hidden md:flex items-center space-x-2 text-graveyard-blood">
              <span className="text-sm">💀</span>
              <span className="text-sm font-medium">{totalGraves.toLocaleString()} souls buried</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-graveyard-mist w-4 h-4" />
              <Input
                placeholder="Search the dead..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-64 bg-graveyard-stone border-graveyard-mist text-graveyard-ghost placeholder-graveyard-mist"
              />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-graveyard-ghost"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className={`mt-4 ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant="outline"
                size="sm"
                onClick={() => onFilterChange(filter)}
                className="bg-graveyard-stone border-graveyard-mist text-graveyard-ghost hover:bg-graveyard-blood hover:border-graveyard-blood transition-colors"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile grave counter */}
        <div className="md:hidden mt-4 text-center">
          <span className="text-graveyard-blood text-sm">💀 {totalGraves.toLocaleString()} souls buried</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
