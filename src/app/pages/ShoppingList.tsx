import { useGroceryStore } from '../hooks/useGroceryStore';
import { Check, ShoppingBag } from 'lucide-react';

export function ShoppingList() {
  const { getShoppingList, markAsBought } = useGroceryStore();
  const shoppingList = getShoppingList();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {shoppingList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white rounded-[2rem] shadow-[0_8px_30px_-4px_rgba(139,92,246,0.06)] border border-violet-100/40 mt-4">
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-teal-100/50">
            <Check size={36} className="text-teal-500" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">All Caught Up!</h2>
          <p className="text-[15px] text-slate-500 max-w-[220px] leading-relaxed font-medium">Your pantry is fully stocked. You don't need anything right now.</p>
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-[2rem] p-6 flex items-center justify-between text-white shadow-[0_12px_30px_-8px_rgba(124,58,237,0.5)] border border-violet-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="relative z-10">
              <p className="text-[13px] font-bold text-violet-200 uppercase tracking-wider mb-1">To Buy</p>
              <p className="text-4xl font-black tracking-tight mb-0">{shoppingList.length}</p>
            </div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20 relative z-10">
              <ShoppingBag className="text-white" size={30} strokeWidth={2.5} />
            </div>
          </div>

          <div className="space-y-3">
            {shoppingList.map((item) => (
              <button
                key={item.id}
                onClick={() => markAsBought(item.id)}
                className="w-full bg-white rounded-[1.25rem] p-5 flex items-center justify-between shadow-[0_8px_30px_-4px_rgba(139,92,246,0.06)] border border-violet-100/40 hover:border-violet-300 transition-all active:scale-[0.98] group"
              >
                <span className="text-[16px] font-semibold text-slate-700">
                  {item.name}
                </span>
                <div className="w-7 h-7 rounded-full border-[2.5px] border-slate-200 flex items-center justify-center text-transparent group-hover:border-violet-500 group-hover:text-violet-500 group-active:bg-violet-50 transition-colors shadow-sm">
                  <Check size={16} strokeWidth={4} />
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
