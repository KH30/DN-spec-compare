export interface Stats {
  hp: number;
  atk: number;
  def: number;
  int: number;
  wis: number;
}

export type SlotType =
  | 'helmet'
  | 'chest'
  | 'pants'
  | 'gloves'
  | 'boots'
  | 'mainWeapon'
  | 'subWeapon'
  | 'ring1'
  | 'ring2'
  | 'earring'
  | 'necklace';

export interface Item {
  id: string;
  name: string;
  slot: SlotType;
  stats: Partial<Stats>;
}

export interface GameClass {
  id: string;
  name: string;
  baseStats: Stats;
}

export type EquippedItems = Partial<Record<SlotType, Item>>;

export interface Character {
  classId: string;
  equippedItems: EquippedItems;
}

export interface ComparisonConfig {
  id: string;
  name: string;
  equippedItems: EquippedItems;
}
