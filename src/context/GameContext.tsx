import React, { createContext, useContext, useEffect, useReducer } from 'react';
import type { Character, ComparisonConfig, EquippedItems, Item, SlotType, Stats } from '../types';
import { CLASSES } from '../data/classStats';

interface GameState {
  character: Character | null;
  comparisonConfigs: ComparisonConfig[];
  activeView: 'class' | 'equipment' | 'comparison';
}

type GameAction =
  | { type: 'SELECT_CLASS'; classId: string }
  | { type: 'EQUIP_ITEM'; item: Item }
  | { type: 'UNEQUIP_ITEM'; slot: SlotType }
  | { type: 'SET_VIEW'; view: GameState['activeView'] }
  | { type: 'ADD_COMPARISON'; config: ComparisonConfig }
  | { type: 'REMOVE_COMPARISON'; id: string }
  | { type: 'LOAD_STATE'; payload: Partial<GameState> };

const LS_KEY = 'dn-spec-compare';

function saveToStorage(state: GameState) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({
      character: state.character,
      comparisonConfigs: state.comparisonConfigs,
    }));
  } catch (_) {}
}

function loadFromStorage(): Partial<GameState> {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (_) {
    return {};
  }
}

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SELECT_CLASS':
      return { ...state, character: { classId: action.classId, equippedItems: {} }, activeView: 'equipment' };
    case 'EQUIP_ITEM': {
      if (!state.character) return state;
      return {
        ...state,
        character: {
          ...state.character,
          equippedItems: { ...state.character.equippedItems, [action.item.slot]: action.item },
        },
      };
    }
    case 'UNEQUIP_ITEM': {
      if (!state.character) return state;
      const items = { ...state.character.equippedItems };
      delete items[action.slot];
      return { ...state, character: { ...state.character, equippedItems: items } };
    }
    case 'SET_VIEW':
      return { ...state, activeView: action.view };
    case 'ADD_COMPARISON':
      return { ...state, comparisonConfigs: [...state.comparisonConfigs, action.config] };
    case 'REMOVE_COMPARISON':
      return { ...state, comparisonConfigs: state.comparisonConfigs.filter((c) => c.id !== action.id) };
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const initialState: GameState = {
  character: null,
  comparisonConfigs: [],
  activeView: 'class',
};

interface GameContextValue {
  state: GameState;
  selectClass: (classId: string) => void;
  equipItem: (item: Item) => void;
  unequipItem: (slot: SlotType) => void;
  setView: (view: GameState['activeView']) => void;
  addComparison: (config: ComparisonConfig) => void;
  removeComparison: (id: string) => void;
  getTotalStats: (equippedItems?: EquippedItems) => Stats;
  getCurrentClass: () => (typeof CLASSES)[0] | undefined;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = loadFromStorage();
    if (saved.character || saved.comparisonConfigs) {
      dispatch({ type: 'LOAD_STATE', payload: saved });
    }
  }, []);

  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  const selectClass = (classId: string) => dispatch({ type: 'SELECT_CLASS', classId });
  const equipItem = (item: Item) => dispatch({ type: 'EQUIP_ITEM', item });
  const unequipItem = (slot: SlotType) => dispatch({ type: 'UNEQUIP_ITEM', slot });
  const setView = (view: GameState['activeView']) => dispatch({ type: 'SET_VIEW', view });
  const addComparison = (config: ComparisonConfig) => dispatch({ type: 'ADD_COMPARISON', config });
  const removeComparison = (id: string) => dispatch({ type: 'REMOVE_COMPARISON', id });

  const getCurrentClass = () => CLASSES.find((c) => c.id === state.character?.classId);

  const getTotalStats = (equippedItems?: EquippedItems): Stats => {
    const gameClass = getCurrentClass();
    const base = gameClass?.baseStats ?? { hp: 0, atk: 0, def: 0, int: 0, wis: 0 };
    const items = equippedItems ?? state.character?.equippedItems ?? {};
    const totals = { ...base };
    Object.values(items).forEach((item) => {
      if (!item) return;
      (Object.keys(item.stats) as (keyof Stats)[]).forEach((key) => {
        totals[key] = (totals[key] ?? 0) + (item.stats[key] ?? 0);
      });
    });
    return totals;
  };

  return (
    <GameContext.Provider value={{ state, selectClass, equipItem, unequipItem, setView, addComparison, removeComparison, getTotalStats, getCurrentClass }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
