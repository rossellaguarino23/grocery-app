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
      navigate(hasCompletedOnboarding ? '/pantry' : '/welcome', { replace: true });
    }, 2200);
    return () => clearTimeout(timer);
  }, [navigate, hasCompletedOnboarding]);

  return (
    <div className="min-h-screen bg-violet-600 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background decorative circles */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute w-[500px] h-[500px] rounded-full bg-white top-[-100px] right-[-150px]"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.1 }}
        className="absolute w-[300px] h-[300px] rounded-full bg-violet-300 bottom-[-50px] left-[-80px]"
      />

      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0.45, duration: 0.9 }}
        className="flex flex-col items-center relative z-10"
      >
        <div className="w-28 h-28 bg-white rounded-[2.2rem] flex items-center justify-center shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-violet-100" />
          <ShoppingCart size={54} className="text-violet-600 relative z-10" strokeWidth={2} />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-[2.6rem] font-black text-white tracking-tight"
        >
          Grocery Hub
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-violet-200 mt-2 font-medium text-lg"
        >
          Smart pantry tracking
        </motion.p>
      </motion.div>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-16 flex gap-2"
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            className="w-2 h-2 rounded-full bg-white/60"
          />
        ))}
      </motion.div>
    </div>
  );
}
