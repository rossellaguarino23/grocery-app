import { useState } from 'react';
import { useGroceryStore } from '../hooks/useGroceryStore';
import { Plus, Trash2 } from 'lucide-react';

export function Manage() {
  const { items, addItem, removeItem } = useGroceryStore();
  const [newItemName, setNewItemName] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      addItem(newItemName);
      setNewItemName('');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-10">
      <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_-4px_rgba(139,92,246,0.06)] border border-violet-100/40">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Your Pantry Pool</h2>
        <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
          Manage the master list of items you always want to keep in stock. Adding an item here makes it available to track in your Inventory.
        </p>
      </div>

      <form 
        onSubmit={handleAdd} 
        className="bg-white rounded-3xl p-2 flex items-center shadow-[0_8px_30px_-4px_rgba(139,92,246,0.06)] border border-violet-100/40 focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-50 transition-all shrink-0"
      >
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add an essential item..."
          className="flex-1 bg-transparent px-4 py-3 outline-none text-slate-700 placeholder:text-slate-400 font-medium text-[15px]"
        />
        <button
          type="submit"
          disabled={!newItemName.trim()}
          className="bg-violet-600 text-white w-12 h-12 rounded-[1.25rem] flex items-center justify-center shadow-md disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 transition-all active:scale-95 mr-1"
        >
          <Plus size={24} strokeWidth={3} />
        </button>
      </form>

      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_-4px_rgba(139,92,246,0.06)] border border-violet-100/40 overflow-hidden">
        {items.length === 0 ? (
           <div className="p-8 text-center text-slate-400 font-medium">Your pool is empty. Add some items above!</div>
        ) : (
          items.map((item, index) => (
            <div key={item.id} className={`flex items-center justify-between p-4 px-5 ${index !== items.length - 1 ? 'border-b border-slate-100/80' : ''} hover:bg-slate-50 transition-colors group`}>
              <span className="font-semibold text-slate-700">{item.name}</span>
              <button 
                onClick={() => removeItem(item.id)}
                className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors active:scale-95"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
