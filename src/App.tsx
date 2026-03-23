import { GameProvider, useGame } from './context/GameContext';
import ClassSelector from './components/ClassSelector';
import StatsDisplay from './components/StatsDisplay';
import EquipmentSlots from './components/EquipmentSlots';
import ComparisonView from './components/ComparisonView';

function AppContent() {
  const { state, setView } = useGame();
  const { activeView, character } = state;

  const navItems = [
    { id: 'class', label: '⚔️ Class' },
    { id: 'equipment', label: '🎽 Equipment' },
    { id: 'comparison', label: '⚖️ Compare' },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-yellow-400">🐉 DN Spec Compare</h1>
          <nav className="flex gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                disabled={item.id !== 'class' && !character}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                  activeView === item.id
                    ? 'bg-yellow-500 text-gray-900'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {activeView === 'class' && <ClassSelector />}
        {activeView === 'equipment' && character && (
          <>
            <StatsDisplay />
            <EquipmentSlots />
          </>
        )}
        {activeView === 'comparison' && character && <ComparisonView />}
        {(activeView === 'equipment' || activeView === 'comparison') && !character && (
          <div className="text-center text-gray-400 py-12">Please select a class first.</div>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
