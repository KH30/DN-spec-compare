import { CLASSES } from '../data/classStats';
import { useGame } from '../context/GameContext';

const CLASS_DESCRIPTIONS: Record<string, string> = {
  swordmaster: 'High ATK, Medium DEF',
  mercenary: 'Balanced ATK/DEF',
  elemental_lord: 'High INT, Low DEF',
  force_user: 'High INT/WIS, Low ATK',
  priest: 'High WIS, Medium DEF',
  paladin: 'High DEF, Medium HP',
  acrobat: 'High ATK, Low DEF',
  bowmaster: 'High ATK, Low DEF',
  engineer: 'Medium All Stats',
  alchemist: 'High INT, Medium WIS',
};

export default function ClassSelector() {
  const { selectClass, state } = useGame();
  const selectedId = state.character?.classId;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Select Your Class</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {CLASSES.map((cls) => (
          <button
            key={cls.id}
            onClick={() => selectClass(cls.id)}
            className={`p-4 rounded-lg border-2 text-center transition-all cursor-pointer ${
              selectedId === cls.id
                ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400'
                : 'border-gray-600 bg-gray-800 text-gray-200 hover:border-yellow-500 hover:bg-gray-700'
            }`}
          >
            <div className="text-3xl mb-2">⚔️</div>
            <div className="font-bold text-sm">{cls.name}</div>
            <div className="text-xs text-gray-400 mt-1">{CLASS_DESCRIPTIONS[cls.id]}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
