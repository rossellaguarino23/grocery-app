import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useGroceryStore,
  GroceryItem,
  SUGGESTED_ITEM_NAMES,
} from "../hooks/useGroceryStore";
import { motion, AnimatePresence } from "motion/react";
import { Check, Plus, ShoppingCart, X } from "lucide-react";

export function Welcome() {
  const navigate = useNavigate();
  const { initializeItems, completeOnboarding } = useGroceryStore();

  const [selected, setSelected] = useState<Set<string>>(
    new Set(SUGGESTED_ITEM_NAMES),
  );
  const [customNames, setCustomNames] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const allNames = [...SUGGESTED_ITEM_NAMES, ...customNames];
  const selectedCount = selected.size;

  const toggle = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const addCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const name = inputValue.trim();
    if (!name || allNames.includes(name)) return;
    setCustomNames((prev) => [...prev, name]);
    setSelected((prev) => new Set([...prev, name]));
    setInputValue("");
  };

  const removeCustom = (name: string) => {
    setCustomNames((prev) => prev.filter((n) => n !== name));
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(name);
      return next;
    });
  };

  const handleStart = () => {
    const chosenItems: GroceryItem[] = allNames
      .filter((name) => selected.has(name))
      .map((name, i) => ({
        id: `${Date.now()}-${i}`,
        name,
        isAvailable: true,
      }));
    initializeItems(chosenItems);
    completeOnboarding();
    navigate("/pantry", { replace: true });
  };

  return (
    <div className="min-h-screen bg-violet-50/40 flex flex-col">
      {/* Header */}
      <div className="bg-violet-600 px-6 pt-14 pb-8 text-center relative overflow-hidden">
        <div className="absolute top-[-60px] right-[-60px] w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute bottom-[-40px] left-[-30px] w-32 h-32 rounded-full bg-violet-500/50" />

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.7 }}
          className="relative z-10"
        >
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <ShoppingCart size={28} className="text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Welcome to Grocery Hub
          </h1>
          <p className="text-violet-200 mt-1.5 font-medium text-[15px]">
            Choose what you keep at home
          </p>
        </motion.div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-32">
        {/* Custom item input */}
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onSubmit={addCustom}
          className="bg-white rounded-3xl p-2 flex items-center shadow-[0_8px_30px_-4px_rgba(139,92,246,0.06)] border border-violet-100/40 focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-50 transition-all mb-5"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a custom item..."
            className="flex-1 bg-transparent px-4 py-3 outline-none text-slate-700 placeholder:text-slate-400 font-medium text-[15px]"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="bg-violet-600 text-white w-12 h-12 rounded-[1.25rem] flex items-center justify-center disabled:opacity-40 transition-all active:scale-95 mr-1"
          >
            <Plus size={22} strokeWidth={3} />
          </button>
        </motion.form>

        {/* Selection count pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex items-center justify-between mb-3 px-1"
        >
          <span className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">
            Your pantry items
          </span>
          <span className="text-[12px] font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">
            {selectedCount} selected
          </span>
        </motion.div>

        {/* Items list */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] shadow-[0_8px_30px_-4px_rgba(139,92,246,0.06)] border border-violet-100/40 overflow-hidden"
        >
          <AnimatePresence initial={false}>
            {allNames.map((name, index) => {
              const isSelected = selected.has(name);
              const isCustom = customNames.includes(name);
              return (
                <motion.div
                  key={name}
                  layout
                  initial={isCustom ? { opacity: 0, height: 0 } : false}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={
                    index !== allNames.length - 1
                      ? "border-b border-slate-100/80"
                      : ""
                  }
                >
                  <div className="flex items-center w-full">
                    <button
                      onClick={() => toggle(name)}
                      className={`flex-1 flex items-center justify-between p-4 px-5 transition-colors hover:bg-violet-50/30 active:bg-violet-50`}
                    >
                      <span
                        className={`text-[15px] font-semibold transition-colors ${
                          isSelected ? "text-slate-700" : "text-slate-300"
                        }`}
                      >
                        {name}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                          isSelected
                            ? "bg-violet-500 border-violet-500"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        {isSelected && (
                          <Check
                            size={13}
                            strokeWidth={3}
                            className="text-white"
                          />
                        )}
                      </div>
                    </button>

                    {isCustom && (
                      <button
                        onClick={() => removeCustom(name)}
                        className="pr-5 pl-1 py-4 text-slate-300 hover:text-rose-400 transition-colors flex-shrink-0"
                      >
                        <X size={16} strokeWidth={2.5} />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fixed CTA */}
      <div className="fixed w-lg bottom-0 px-4 py-4 bg-white/90 backdrop-blur-xl border-t border-violet-100/60 shadow-[0_-8px_20px_-4px_rgba(139,92,246,0.08)]">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          onClick={handleStart}
          disabled={selectedCount === 0}
          className="w-full bg-violet-600 text-white font-black py-[18px] rounded-2xl text-[17px] disabled:opacity-40 transition-all active:scale-[0.98] shadow-lg shadow-violet-200/60"
        >
          {selectedCount > 0
            ? `Start tracking ${selectedCount} item${selectedCount !== 1 ? "s" : ""} →`
            : "Select at least one item"}
        </motion.button>
      </div>
    </div>
  );
}
