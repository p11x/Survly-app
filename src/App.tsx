import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import { Role } from './types';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<Role>('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = ref(db, `users/${user.uid}`);
          const userSnapshot = await get(userRef);
          if (userSnapshot.exists()) {
            setRole(userSnapshot.val().role as Role);
          } else {
            // Default to user if no doc exists (fallback)
            setRole('user');
          }
          setIsAuthenticated(true);
        } catch (error) {
          console.warn("Could not fetch user role from Realtime Database (defaulting to Customer):", error);
          // Fallback if DB fails
          setRole('user');
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden relative selection:bg-indigo-500/30">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-40 w-96 h-96 bg-indigo-400/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-400/20 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="h-screen w-full overflow-y-auto"
            >
              <AuthScreen />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-screen w-full"
            >
              <Dashboard role={role} onLogout={handleLogout} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
