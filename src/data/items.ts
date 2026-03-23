import type { Item } from '../types';

export const ITEMS: Item[] = [
  // Helmets
  { id: 'helm_iron', name: 'Iron Helmet', slot: 'helmet', stats: { hp: 300, def: 120 } },
  { id: 'helm_steel', name: 'Steel Helmet', slot: 'helmet', stats: { hp: 500, def: 200, wis: 50 } },
  { id: 'helm_mithril', name: 'Mithril Helmet', slot: 'helmet', stats: { hp: 700, def: 300, int: 80 } },
  { id: 'helm_dragon', name: 'Dragon Scale Helmet', slot: 'helmet', stats: { hp: 1000, def: 450, atk: 100 } },
  { id: 'helm_arcane', name: 'Arcane Hood', slot: 'helmet', stats: { hp: 400, def: 100, int: 350, wis: 150 } },

  // Chest
  { id: 'chest_iron', name: 'Iron Chestplate', slot: 'chest', stats: { hp: 500, def: 200 } },
  { id: 'chest_steel', name: 'Steel Chestplate', slot: 'chest', stats: { hp: 800, def: 350 } },
  { id: 'chest_mithril', name: 'Mithril Chestplate', slot: 'chest', stats: { hp: 1100, def: 500, wis: 100 } },
  { id: 'chest_dragon', name: 'Dragon Scale Chest', slot: 'chest', stats: { hp: 1500, def: 700, atk: 150 } },
  { id: 'chest_robe', name: 'Arcane Robe', slot: 'chest', stats: { hp: 600, def: 150, int: 500, wis: 200 } },

  // Pants
  { id: 'pants_iron', name: 'Iron Greaves', slot: 'pants', stats: { hp: 400, def: 150 } },
  { id: 'pants_steel', name: 'Steel Greaves', slot: 'pants', stats: { hp: 650, def: 280 } },
  { id: 'pants_mithril', name: 'Mithril Greaves', slot: 'pants', stats: { hp: 900, def: 400 } },
  { id: 'pants_dragon', name: 'Dragon Scale Legs', slot: 'pants', stats: { hp: 1200, def: 580, atk: 100 } },
  { id: 'pants_arcane', name: 'Arcane Leggings', slot: 'pants', stats: { hp: 500, def: 130, int: 400, wis: 160 } },

  // Gloves
  { id: 'gloves_iron', name: 'Iron Gauntlets', slot: 'gloves', stats: { hp: 200, def: 100, atk: 80 } },
  { id: 'gloves_steel', name: 'Steel Gauntlets', slot: 'gloves', stats: { hp: 350, def: 160, atk: 150 } },
  { id: 'gloves_mithril', name: 'Mithril Gauntlets', slot: 'gloves', stats: { hp: 500, def: 240, atk: 220 } },
  { id: 'gloves_dragon', name: 'Dragon Scale Gloves', slot: 'gloves', stats: { hp: 700, def: 320, atk: 350 } },
  { id: 'gloves_arcane', name: 'Arcane Gloves', slot: 'gloves', stats: { hp: 300, def: 80, int: 300, wis: 120 } },

  // Boots
  { id: 'boots_iron', name: 'Iron Boots', slot: 'boots', stats: { hp: 250, def: 110 } },
  { id: 'boots_steel', name: 'Steel Boots', slot: 'boots', stats: { hp: 400, def: 180 } },
  { id: 'boots_mithril', name: 'Mithril Boots', slot: 'boots', stats: { hp: 580, def: 270 } },
  { id: 'boots_dragon', name: 'Dragon Scale Boots', slot: 'boots', stats: { hp: 800, def: 380, atk: 80 } },
  { id: 'boots_arcane', name: 'Arcane Boots', slot: 'boots', stats: { hp: 350, def: 90, int: 280, wis: 110 } },

  // Main Weapon
  { id: 'mw_sword', name: 'Iron Sword', slot: 'mainWeapon', stats: { atk: 500 } },
  { id: 'mw_steel_sword', name: 'Steel Sword', slot: 'mainWeapon', stats: { atk: 850, hp: 100 } },
  { id: 'mw_mithril_sword', name: 'Mithril Blade', slot: 'mainWeapon', stats: { atk: 1200, hp: 200 } },
  { id: 'mw_dragon_sword', name: 'Dragon Slayer', slot: 'mainWeapon', stats: { atk: 1800, hp: 350 } },
  { id: 'mw_staff', name: 'Arcane Staff', slot: 'mainWeapon', stats: { int: 900, wis: 300, atk: 200 } },

  // Sub Weapon
  { id: 'sw_shield', name: 'Iron Shield', slot: 'subWeapon', stats: { def: 400, hp: 200 } },
  { id: 'sw_steel_shield', name: 'Steel Shield', slot: 'subWeapon', stats: { def: 700, hp: 400 } },
  { id: 'sw_orb', name: 'Arcane Orb', slot: 'subWeapon', stats: { int: 600, wis: 200 } },
  { id: 'sw_quiver', name: 'Quiver of Swiftness', slot: 'subWeapon', stats: { atk: 450, hp: 150 } },
  { id: 'sw_tome', name: 'Ancient Tome', slot: 'subWeapon', stats: { int: 800, wis: 400 } },

  // Ring 1
  { id: 'ring1_atk', name: 'Ring of Strength', slot: 'ring1', stats: { atk: 300 } },
  { id: 'ring1_def', name: 'Ring of Protection', slot: 'ring1', stats: { def: 250, hp: 200 } },
  { id: 'ring1_int', name: 'Ring of Intelligence', slot: 'ring1', stats: { int: 350, wis: 100 } },
  { id: 'ring1_hp', name: 'Ring of Vitality', slot: 'ring1', stats: { hp: 800 } },
  { id: 'ring1_dragon', name: 'Dragon Ring', slot: 'ring1', stats: { atk: 250, def: 150, hp: 400 } },

  // Ring 2
  { id: 'ring2_atk', name: 'Warrior Ring', slot: 'ring2', stats: { atk: 320 } },
  { id: 'ring2_def', name: 'Guardian Ring', slot: 'ring2', stats: { def: 270, hp: 220 } },
  { id: 'ring2_int', name: 'Mage Ring', slot: 'ring2', stats: { int: 380, wis: 120 } },
  { id: 'ring2_hp', name: 'Life Ring', slot: 'ring2', stats: { hp: 900 } },
  { id: 'ring2_all', name: 'Balanced Ring', slot: 'ring2', stats: { atk: 150, def: 100, int: 150, hp: 300 } },

  // Earring
  { id: 'ear_atk', name: 'Earring of Power', slot: 'earring', stats: { atk: 280 } },
  { id: 'ear_int', name: 'Earring of Wisdom', slot: 'earring', stats: { int: 320, wis: 150 } },
  { id: 'ear_hp', name: 'Earring of Life', slot: 'earring', stats: { hp: 700 } },
  { id: 'ear_def', name: 'Earring of Fortitude', slot: 'earring', stats: { def: 230, hp: 180 } },
  { id: 'ear_dragon', name: 'Dragon Earring', slot: 'earring', stats: { atk: 200, int: 200, hp: 300 } },

  // Necklace
  { id: 'neck_atk', name: 'Necklace of Might', slot: 'necklace', stats: { atk: 350 } },
  { id: 'neck_int', name: 'Necklace of Arcana', slot: 'necklace', stats: { int: 400, wis: 180 } },
  { id: 'neck_hp', name: 'Necklace of Endurance', slot: 'necklace', stats: { hp: 800, def: 100 } },
  { id: 'neck_wis', name: 'Necklace of Serenity', slot: 'necklace', stats: { wis: 500, hp: 300 } },
  { id: 'neck_dragon', name: 'Dragon Pendant', slot: 'necklace', stats: { atk: 250, int: 250, hp: 350 } },
];

export function getItemsBySlot(slot: string): Item[] {
  return ITEMS.filter((item) => item.slot === slot);
}
