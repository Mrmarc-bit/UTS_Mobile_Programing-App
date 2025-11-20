import { Home, List, User, Plus } from 'lucide-react';

interface BottomNavProps {
  currentScreen: 'home' | 'add' | 'list' | 'profile';
  onNavigate: (screen: 'home' | 'add' | 'list' | 'profile') => void;
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home' as const, name: 'Home', icon: Home },
    { id: 'list' as const, name: 'List', icon: List },
    { id: 'profile' as const, name: 'Profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 safe-area-inset-bottom">
      <div className="mx-auto max-w-md px-6 py-3">
        <div className="flex items-center justify-around relative">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;

            return (
              <div key={item.id} className="flex-1 flex justify-center">
                {index === 1 && (
                  <button
                    onClick={() => onNavigate('add')}
                    className="absolute left-1/2 -translate-x-1/2 -top-8 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg shadow-yellow-400/30 flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Plus className="w-7 h-7 text-white" />
                  </button>
                )}
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
                    isActive ? 'text-yellow-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                  <span className="text-xs">{item.name}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
