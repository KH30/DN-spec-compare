import { useGame } from '../context/GameContext';
import type { Item, SlotType, Stats } from '../types';
import { getItemsBySlot } from '../data/items';

interface Props {
  slot: SlotType;
  slotLabel: string;
  onClose: () => void;
}

const STAT_LABELS: Record<keyof Stats, string> = {
  hp: 'HP',
  atk: 'ATK',
  def: 'DEF',
  int: 'INT',
  wis: 'WIS',
};

export default function ItemSelector({ slot, slotLabel, onClose }: Props) {
  const { equipItem } = useGame();
  const items = getItemsBySlot(slot);

  const handleEquip = (item: Item) => {
    equipItem(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-600 w-full max-w-lg max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-bold text-yellow-400">Select {slotLabel}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl cursor-pointer">✕</button>
        </div>
        <div className="overflow-y-auto flex-1 p-4 space-y-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleEquip(item)}
              className="w-full text-left bg-gray-900 hover:bg-gray-700 border border-gray-700 hover:border-yellow-500 rounded-lg p-3 transition-all cursor-pointer"
            >
              <div className="font-medium text-yellow-300 mb-1">{item.name}</div>
              <div className="flex flex-wrap gap-2">
                {(Object.entries(item.stats) as [keyof Stats, number][]).map(([key, val]) => (
                  <span key={key} className="text-xs bg-gray-700 text-green-300 px-2 py-0.5 rounded">
                    +{val.toLocaleString()} {STAT_LABELS[key]}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
