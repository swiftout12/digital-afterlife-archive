import { useState } from 'react';
import { Search, Menu, X, Skull, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/components/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: string) => void;
  totalGraves: number;
}

const Header = ({ onSearchChange, onFilterChange, totalGraves }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const filters = [
    'All', 'Funny', 'Cringe', 'Exes', 'Crypto', 'Tech', 'Politics', 'Trends', 'Serious'
  ];

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearchChange(value);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
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
              <span className="text-sm font-medium animate-pulse">
                {totalGraves.toLocaleString()} souls buried
              </span>
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
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white">
                    <User className="w-5 h-5 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-gray-600">
                  <DropdownMenuItem onClick={handleSignOut} className="text-white hover:bg-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => navigate('/auth')}
                variant="outline"
                className="bg-gray-900 border-gray-600 text-white hover:bg-red-600 hover:border-red-600"
              >
                Sign In
              </Button>
            )}
            
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

        {/* Mobile grave counter - now with animation */}
        <div className="md:hidden mt-4 text-center">
          <span className="text-red-400 text-sm animate-pulse">
            💀 {totalGraves.toLocaleString()} souls buried
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
