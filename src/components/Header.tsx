
import { useState } from 'react';
import { Search, Menu, X, Skull } from 'lucide-react';
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
    'All', 'Funny', 'Cringe', 'Exes', 'Crypto', 'Tech', 'Politics', 'Trends', 'Serious'
  ];

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearchChange(value);
  };

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-red-600">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-white flex items-center gap-2">
              <Skull className="w-8 h-8 text-red-600" />
              The Internet Graveyard
            </h1>
            <div className="hidden md:flex items-center space-x-2 text-red-400">
              <span className="text-sm">💀</span>
              <span className="text-sm font-medium">{totalGraves.toLocaleString()} souls buried</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search the dead..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-64 bg-gray-900 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
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
                className="bg-gray-900 border-gray-600 text-white hover:bg-red-600 hover:border-red-600 transition-colors"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile grave counter */}
        <div className="md:hidden mt-4 text-center">
          <span className="text-red-400 text-sm">💀 {totalGraves.toLocaleString()} souls buried</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
