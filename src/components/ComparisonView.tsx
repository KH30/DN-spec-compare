import { useState } from 'react';
import { useGame } from '../context/GameContext';
import type { ComparisonConfig, EquippedItems, SlotType, Stats } from '../types';
import { ITEMS } from '../data/items';

const SLOT_LABELS: Record<SlotType, string> = {
  helmet: 'Helmet',
  chest: 'Chest Armor',
  pants: 'Pants',
  gloves: 'Gloves',
  boots: 'Boots',
  mainWeapon: 'Main Weapon',
  subWeapon: 'Sub Weapon',
  ring1: 'Ring 1',
  ring2: 'Ring 2',
  earring: 'Earring',
  necklace: 'Necklace',
};

const STAT_LABELS: Record<keyof Stats, string> = {
  hp: 'HP',
  atk: 'ATK',
  def: 'DEF',
  int: 'INT',
  wis: 'WIS',
};

function StatDiff({ label, current, alt }: { label: string; current: number; alt: number }) {
  const diff = alt - current;
  return (
    <div className="flex items-center justify-between py-1 border-b border-gray-700">
      <span className="text-gray-300 text-sm w-12">{label}</span>
      <span className="text-white font-mono text-sm w-20 text-right">{current.toLocaleString()}</span>
      <span className="text-white font-mono text-sm w-20 text-right">{alt.toLocaleString()}</span>
      <span className={`font-mono text-sm w-20 text-right ${diff > 0 ? 'text-green-400' : diff < 0 ? 'text-red-400' : 'text-gray-500'}`}>
        {diff > 0 ? `+${diff.toLocaleString()}` : diff < 0 ? diff.toLocaleString() : '—'}
      </span>
    </div>
  );
}

export default function ComparisonView() {
  const { state, getTotalStats, addComparison, removeComparison, equipItem, unequipItem } = useGame();
  const [altItems, setAltItems] = useState<EquippedItems>({});
  const [configName, setConfigName] = useState('');

  if (!state.character) {
    return <div className="p-6 text-gray-400 text-center">Please select a class first.</div>;
  }

  const currentStats = getTotalStats(state.character.equippedItems);
  const altStats = getTotalStats(altItems);

  const handleAltSlotChange = (slot: SlotType, itemId: string) => {
    if (!itemId) {
      const next = { ...altItems };
      delete next[slot];
      setAltItems(next);
      return;
    }
    const item = ITEMS.find((i) => i.id === itemId);
    if (item) setAltItems((prev) => ({ ...prev, [slot]: item }));
  };

  const saveComparison = () => {
    if (!configName.trim()) return;
    const config: ComparisonConfig = {
      id: Date.now().toString(),
      name: configName.trim(),
      equippedItems: { ...altItems },
    };
    addComparison(config);
    setConfigName('');
  };

  const applyConfig = (config: ComparisonConfig) => {
    // Unequip all first
    (Object.keys(SLOT_LABELS) as SlotType[]).forEach((slot) => unequipItem(slot));
    // Equip saved items
    Object.values(config.equippedItems).forEach((item) => {
      if (item) equipItem(item);
    });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Live Comparison */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-5">
        <h3 className="text-lg font-bold text-yellow-400 mb-4">Equipment Comparison</h3>

        {/* Alt config slot picker */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {(Object.keys(SLOT_LABELS) as SlotType[]).map((slot) => {
            const slotItems = ITEMS.filter((i) => i.slot === slot);
            return (
              <div key={slot} className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-24 shrink-0">{SLOT_LABELS[slot]}</span>
                <select
                  className="flex-1 bg-gray-900 border border-gray-600 text-gray-200 text-xs rounded px-2 py-1"
                  value={altItems[slot]?.id ?? ''}
                  onChange={(e) => handleAltSlotChange(slot, e.target.value)}
                >
                  <option value="">-- none --</option>
                  {slotItems.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        {/* Stat comparison table */}
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs w-12">Stat</span>
            <span className="text-blue-400 text-xs w-20 text-right">Current</span>
            <span className="text-yellow-400 text-xs w-20 text-right">Alternative</span>
            <span className="text-gray-400 text-xs w-20 text-right">Diff</span>
          </div>
          {(Object.keys(STAT_LABELS) as (keyof Stats)[]).map((key) => (
            <StatDiff key={key} label={STAT_LABELS[key]} current={currentStats[key]} alt={altStats[key]} />
          ))}
        </div>

        {/* Save config */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Config name..."
            value={configName}
            onChange={(e) => setConfigName(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-600 text-gray-200 text-sm rounded px-3 py-2 focus:outline-none focus:border-yellow-500"
          />
          <button
            onClick={saveComparison}
            disabled={!configName.trim()}
            className="bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 text-white text-sm px-4 py-2 rounded cursor-pointer"
          >
            Save Config
          </button>
        </div>
      </div>

      {/* Saved Configs */}
      {state.comparisonConfigs.length > 0 && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-5">
          <h3 className="text-lg font-bold text-yellow-400 mb-4">Saved Configurations</h3>
          <div className="space-y-3">
            {state.comparisonConfigs.map((config) => {
              const configStats = getTotalStats(config.equippedItems);
              return (
                <div key={config.id} className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-yellow-300">{config.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => applyConfig(config)}
                        className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                      >
                        Apply
                      </button>
                      <button
                        onClick={() => removeComparison(config.id)}
                        className="text-xs bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(STAT_LABELS) as (keyof Stats)[]).map((key) => {
                      const diff = configStats[key] - currentStats[key];
                      return (
                        <span key={key} className="text-xs bg-gray-700 px-2 py-0.5 rounded">
                          <span className="text-gray-400">{STAT_LABELS[key]}: </span>
                          <span className="text-white">{configStats[key].toLocaleString()}</span>
                          {diff !== 0 && (
                            <span className={diff > 0 ? 'text-green-400' : 'text-red-400'}> ({diff > 0 ? '+' : ''}{diff.toLocaleString()})</span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
