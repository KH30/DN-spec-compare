import { useState } from 'react';
import { useGame } from '../context/GameContext';
import type { SlotType } from '../types';
import ItemSelector from './ItemSelector';

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

const SLOT_ICONS: Record<SlotType, string> = {
  helmet: '🪖',
  chest: '🦺',
  pants: '👖',
  gloves: '🧤',
  boots: '👢',
  mainWeapon: '⚔️',
  subWeapon: '🛡️',
  ring1: '💍',
  ring2: '💍',
  earring: '👂',
  necklace: '📿',
};

export default function EquipmentSlots() {
  const { state, unequipItem } = useGame();
  const [selectingSlot, setSelectingSlot] = useState<SlotType | null>(null);

  const equipped = state.character?.equippedItems ?? {};

  return (
    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
      <h3 className="text-lg font-bold text-yellow-400 mb-4">Equipment</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {(Object.keys(SLOT_LABELS) as SlotType[]).map((slot) => {
          const item = equipped[slot];
          return (
            <div key={slot} className="bg-gray-900 rounded p-3 flex items-center gap-3">
              <span className="text-2xl">{SLOT_ICONS[slot]}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-400">{SLOT_LABELS[slot]}</div>
                {item ? (
                  <div className="text-yellow-300 text-sm font-medium truncate">{item.name}</div>
                ) : (
                  <div className="text-gray-500 text-sm">Empty</div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectingSlot(slot)}
                  className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
                >
                  {item ? 'Change' : 'Equip'}
                </button>
                {item && (
                  <button
                    onClick={() => unequipItem(slot)}
                    className="text-xs bg-red-700 hover:bg-red-600 text-white px-2 py-1 rounded cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectingSlot && (
        <ItemSelector
          slot={selectingSlot}
          slotLabel={SLOT_LABELS[selectingSlot]}
          onClose={() => setSelectingSlot(null)}
        />
      )}
    </div>
  );
}
