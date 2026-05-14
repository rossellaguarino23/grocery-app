import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useGroceryStore } from '../hooks/useGroceryStore';
import { motion } from 'motion/react';
import { ArrowRight, Plus, Trash2, PackageCheck } from 'lucide-react';

export function Welcome() {
  const navigate = useNavigate();
  const { items, addItem, removeItem, completeOnboarding } = useGroceryStore();
  const [newItemName, setNewItemName] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      addItem(newItemName);
      setNewItemName('');
    }
  };

  const handleFinish = () => {
    completeOnboarding();
    navigate('/pantry', { replace: true });
  };

  return (
    <div className="min-h-screen bg-violet-50/40 p-6 flex flex-col max-w-lg mx-auto relative pb-28">
      <div className="mt-8 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-16 h-16 bg-white shadow-sm border border-violet-100 rounded-[1.5rem] flex items-center justify-center mb-6"
        >
          <PackageCheck size={32} className="text-violet-600" strokeWidth={2.5} />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-black text-slate-800 tracking-tight leading-tight mb-3"
        >
          Welcome to <br/> Grocery Hub
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 font-medium text-[16px] leading-relaxed"
        >
          Let's set up your core pantry pool. Add the essentials you always want to keep in stock. We've added a few common ones to start!
        </motion.p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleAdd} 
        className="bg-white rounded-3xl p-2 flex items-center shadow-[0_8px_30px_-4px_rgba(139,92,246,0.06)] border border-violet-100/40 focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-50 transition-all mb-6 shrink-0"
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
      </motion.form>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex-1 bg-white rounded-[2rem] shadow-[0_8px_30px_-4px_rgba(139,92,246,0.06)] border border-violet-100/40 overflow-hidden overflow-y-auto mb-8"
      >
        {items.length === 0 ? (
           <div className="p-8 text-center text-slate-400 font-medium">Your pool is empty. Add some items above!</div>
        ) : (
          items.map((item, index) => (
            <div key={item.id} className={`flex items-center justify-between p-4 px-5 ${index !== items.length - 1 ? 'border-b border-slate-100/80' : ''} group hover:bg-slate-50 transition-colors`}>
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
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-violet-50/90 via-violet-50/90 to-transparent backdrop-blur-md z-10 flex justify-center pb-safe"
      >
        <button 
          onClick={handleFinish}
          className="w-full max-w-lg bg-violet-600 text-white font-bold text-[16px] py-4 rounded-[1.5rem] shadow-[0_8px_20px_-4px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          Start using Grocery Hub <ArrowRight size={20} strokeWidth={2.5} />
        </button>
      </motion.div>
    </div>
  );
}
