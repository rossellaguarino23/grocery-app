import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useGroceryStore } from '../hooks/useGroceryStore';
import { motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';

export function Splash() {
  const navigate = useNavigate();
  const { hasCompletedOnboarding } = useGroceryStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasCompletedOnboarding) {
        navigate('/pantry', { replace: true });
      } else {
        navigate('/welcome', { replace: true });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate, hasCompletedOnboarding]);

  return (
    <div className="min-h-screen bg-violet-600 flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-violet-50 opacity-50" />
          <ShoppingCart size={48} className="text-violet-600 relative z-10" strokeWidth={2.5} />
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight">Grocery Hub</h1>
        <p className="text-violet-200 mt-3 font-medium text-lg">Smart pantry tracking</p>
      </motion.div>
    </div>
  );
}
