import type { GameClass } from '../types';

export const CLASSES: GameClass[] = [
  {
    id: 'swordmaster',
    name: 'Swordmaster',
    baseStats: { hp: 8500, atk: 3200, def: 1800, int: 500, wis: 600 },
  },
  {
    id: 'mercenary',
    name: 'Mercenary',
    baseStats: { hp: 9200, atk: 2800, def: 2400, int: 400, wis: 500 },
  },
  {
    id: 'elemental_lord',
    name: 'Elemental Lord',
    baseStats: { hp: 6500, atk: 800, def: 1000, int: 3800, wis: 1200 },
  },
  {
    id: 'force_user',
    name: 'Force User',
    baseStats: { hp: 6800, atk: 600, def: 900, int: 3600, wis: 1800 },
  },
  {
    id: 'priest',
    name: 'Priest',
    baseStats: { hp: 8000, atk: 1200, def: 2000, int: 1400, wis: 3200 },
  },
  {
    id: 'paladin',
    name: 'Paladin',
    baseStats: { hp: 9800, atk: 1800, def: 3200, int: 600, wis: 1200 },
  },
  {
    id: 'acrobat',
    name: 'Acrobat',
    baseStats: { hp: 7800, atk: 3000, def: 1200, int: 600, wis: 700 },
  },
  {
    id: 'bowmaster',
    name: 'Bowmaster',
    baseStats: { hp: 7500, atk: 3100, def: 1100, int: 700, wis: 600 },
  },
  {
    id: 'engineer',
    name: 'Engineer',
    baseStats: { hp: 8200, atk: 2200, def: 2200, int: 1800, wis: 1200 },
  },
  {
    id: 'alchemist',
    name: 'Alchemist',
    baseStats: { hp: 7200, atk: 900, def: 1400, int: 3400, wis: 1800 },
  },
];
