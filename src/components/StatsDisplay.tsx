import { useGame } from '../context/GameContext';
import type { Stats } from '../types';

const STAT_LABELS: Record<keyof Stats, string> = {
  hp: 'HP',
  atk: 'ATK',
  def: 'DEF',
  int: 'INT',
  wis: 'WIS',
};

const STAT_COLORS: Record<keyof Stats, string> = {
  hp: 'text-red-400',
  atk: 'text-orange-400',
  def: 'text-blue-400',
  int: 'text-purple-400',
  wis: 'text-green-400',
};

export default function StatsDisplay() {
  const { state, getTotalStats, getCurrentClass } = useGame();
  const gameClass = getCurrentClass();

  if (!state.character || !gameClass) return null;

  const baseStats = gameClass.baseStats;
  const totalStats = getTotalStats();

  return (
    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
      <h3 className="text-lg font-bold text-yellow-400 mb-4">{gameClass.name} — Stats</h3>
      <div className="grid grid-cols-5 gap-3">
        {(Object.keys(STAT_LABELS) as (keyof Stats)[]).map((key) => {
          const bonus = totalStats[key] - baseStats[key];
          return (
            <div key={key} className="bg-gray-900 rounded p-3 text-center">
              <div className={`text-xs font-bold mb-1 ${STAT_COLORS[key]}`}>{STAT_LABELS[key]}</div>
              <div className="text-white font-bold text-lg">{totalStats[key].toLocaleString()}</div>
              <div className="text-xs text-gray-400">Base: {baseStats[key].toLocaleString()}</div>
              {bonus > 0 && <div className="text-xs text-green-400">+{bonus.toLocaleString()}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
