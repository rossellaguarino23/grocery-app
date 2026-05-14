import { useGroceryStore } from '../hooks/useGroceryStore';

export function Inventory() {
  const { items, toggleAvailability } = useGroceryStore();
  const availableCount = items.filter(i => i.isAvailable).length;
  const neededCount = items.filter(i => !i.isAvailable).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_-4px_rgba(139,92,246,0.06)] border border-violet-100/40 flex flex-col items-center justify-center relative overflow-hidden group hover:border-violet-200 transition-colors">
          <div className="absolute top-0 right-0 w-20 h-20 bg-teal-50/80 rounded-bl-[40px] -z-0 group-hover:scale-110 transition-transform duration-500" />
          <span className="text-4xl font-black text-slate-800 tracking-tight mb-2 z-10">{availableCount}</span>
          <span className="text-[11px] font-bold text-teal-600 uppercase tracking-wider bg-teal-50/80 px-3.5 py-1.5 rounded-full z-10">In Stock</span>
        </div>
        <div className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_-4px_rgba(139,92,246,0.06)] border border-violet-100/40 flex flex-col items-center justify-center relative overflow-hidden group hover:border-violet-200 transition-colors">
          <div className="absolute top-0 right-0 w-20 h-20 bg-rose-50/80 rounded-bl-[40px] -z-0 group-hover:scale-110 transition-transform duration-500" />
          <span className="text-4xl font-black text-slate-800 tracking-tight mb-2 z-10">{neededCount}</span>
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider bg-rose-50/80 px-3.5 py-1.5 rounded-full z-10">Needed</span>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_-4px_rgba(139,92,246,0.06)] border border-violet-100/40 overflow-hidden">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => toggleAvailability(item.id)}
            className={`w-full flex items-center justify-between p-4 px-5 transition-colors ${
              index !== items.length - 1 ? 'border-b border-slate-100/80' : ''
            } hover:bg-violet-50/30 active:bg-violet-50`}
          >
            <span className={`text-[16px] font-semibold transition-colors ${
              item.isAvailable ? 'text-slate-700' : 'text-slate-400'
            }`}>
              {item.name}
            </span>
            
            <div className="flex items-center gap-3">
              {!item.isAvailable && (
                <span className="text-[10px] font-bold tracking-wider uppercase text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                  Out
                </span>
              )}
              <div className={`w-[50px] h-[30px] rounded-full transition-colors relative flex items-center shadow-inner ${
                item.isAvailable ? 'bg-violet-500' : 'bg-slate-200'
              }`}>
                <div className={`w-[26px] h-[26px] rounded-full bg-white shadow-sm transition-transform duration-300 absolute ${
                  item.isAvailable ? 'translate-x-[22px]' : 'translate-x-[2px]'
                }`} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
