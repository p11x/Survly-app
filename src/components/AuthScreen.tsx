import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowRight, ShieldCheck, AlertCircle, User, Phone, Eye, EyeOff, Check, Circle, Smartphone } from 'lucide-react';
import { Role } from '../types';
import { auth, db, googleProvider } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';

export default function AuthScreen() {
  const [activeTab, setActiveTab] = useState<Role>('user');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New Phone Auth State
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };
  const allRulesMet = Object.values(passwordRules).every(Boolean);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      try {
        const userRef = ref(db, `users/${userCredential.user.uid}`);
        const userSnapshot = await get(userRef);
        if (!userSnapshot.exists()) {
          await set(userRef, {
            role: activeTab, // Defaults to 'user' for new Google signups if activeTab wasn't changed
            email: userCredential.user.email,
            name: userCredential.user.displayName,
            createdAt: new Date().toISOString()
          });
        }
      } catch (dbErr) {
        console.warn("Database error during Google Auth, proceeding anyway:", dbErr);
      }
    } catch (err: any) {
      console.error("Google Auth error:", err);
      let message = err.message || 'An error occurred during Google authentication.';
      if (message.includes('auth/configuration-not-found') || message.includes('auth/operation-not-supported-in-this-environment')) {
        message = 'Authentication failed: Please enable the "Google" provider in your Firebase Console.';
      } else if (message.includes('auth/popup-closed-by-user')) {
        message = 'Google sign-in was cancelled.';
      }
      setError(message);
    }
    setIsLoading(false);
  };

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      });
    }
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      setupRecaptcha();
      const appVerifier = (window as any).recaptchaVerifier;
      // Phone number must be in E.164 format, e.g., +1234567890
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone.replace(/\D/g, '')}`;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
    } catch (err: any) {
      console.error("Phone Auth error:", err);
      let message = err.message || 'An error occurred during Phone authentication.';
      if (message.includes('auth/configuration-not-found') || message.includes('auth/operation-not-supported-in-this-environment')) {
        message = 'Authentication failed: Please enable the "Phone" provider in your Firebase Console.';
      } else if (message.includes('auth/invalid-phone-number')) {
        message = 'Invalid phone number format. Please include your country code (e.g., +91).';
      }
      setError(message);
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await confirmationResult.confirm(otp);
      try {
        const userRef = ref(db, `users/${userCredential.user.uid}`);
        const userSnapshot = await get(userRef);
        if (!userSnapshot.exists()) {
          await set(userRef, {
            role: activeTab,
            phone: phone,
            createdAt: new Date().toISOString()
          });
        }
      } catch (dbErr) {
        console.warn("Database error during Phone Auth, proceeding anyway:", dbErr);
      }
    } catch (err: any) {
      console.error("OTP error:", err);
      setError('Invalid verification code. Please try again.');
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (authMethod === 'phone') {
      if (otpSent) {
        await handleVerifyOtp();
      } else {
        await handleSendOtp();
      }
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      if (mode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        try {
          const userRef = ref(db, `users/${userCredential.user.uid}`);
          await set(userRef, {
            role: activeTab,
            email: email,
            name: name,
            phone: phone,
            createdAt: new Date().toISOString()
          });
        } catch (dbErr) {
          console.warn("Database error during Email Signup, proceeding anyway:", dbErr);
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      // Clean up Firebase error messages for display
      let message = err.message || 'An error occurred during authentication.';
      if (message.includes('auth/invalid-credential') || message.includes('auth/user-not-found') || message.includes('auth/wrong-password')) {
        message = 'Invalid email or password.';
      } else if (message.includes('auth/email-already-in-use')) {
        message = 'An account with this email already exists.';
      } else if (message.includes('auth/weak-password')) {
        message = 'Password should be at least 6 characters.';
      } else if (message.includes('auth/configuration-not-found')) {
        message = 'Authentication failed: Please enable the "Email/Password" provider in your Firebase Console.';
      }
      setError(message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] mb-4">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-wider">SURVLY</h1>
          <p className="text-slate-500 mt-2 text-sm">Your Premium Service Marketplace</p>
        </div>

        {/* Glass Card */}
        <motion.div
          layout
          className="bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden shadow-xl shadow-slate-200/50"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {mode === 'login' ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {mode === 'login' ? 'Enter your details to sign in' : 'Join Survly today'}
            </p>
          </div>

          <AnimatePresence mode="popLayout">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-start gap-2"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2-Switch Toggle (Only for Signup) */}
          <AnimatePresence mode="popLayout">
            {mode === 'signup' && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="overflow-hidden"
              >
                <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 relative">
                  <motion.div
                      className="absolute inset-y-1 rounded-xl bg-white border border-slate-200 shadow-sm"
                      layoutId="activeTab"
                      initial={false}
                      animate={{
                        left: activeTab === 'user' ? '4px' : '50%',
                        right: activeTab === 'user' ? '50%' : '4px',
                      }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                  <button
                    type="button"
                    onClick={() => setActiveTab('user')}
                    className={`flex-1 py-3 text-sm font-medium relative z-10 transition-colors ${activeTab === 'user' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('provider')}
                    className={`flex-1 py-3 text-sm font-medium relative z-10 transition-colors ${activeTab === 'provider' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Provider
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div id="recaptcha-container"></div>
            
            {authMethod === 'phone' ? (
              <AnimatePresence mode="wait">
                {!otpSent ? (
                  <motion.div
                    key="phone-input"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-1"
                  >
                    <label className="text-xs font-medium text-slate-500 ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+919876543210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2 ml-1">Include your country code (e.g., +91 for India)</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="otp-input"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-1"
                  >
                    <label className="text-xs font-medium text-slate-500 ml-1">Verification Code</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit code"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all tracking-widest font-mono"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ) : (
              <>
                <AnimatePresence mode="popLayout">
                  {mode === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div className="space-y-1 pt-1">
                        <label className="text-xs font-medium text-slate-500 ml-1">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="text"
                            required={mode === 'signup'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-500 ml-1">Phone Number (Optional)</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g., +919876543210"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === 'signup' ? "Create a password" : "Enter your password"}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-12 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="popLayout">
                  {mode === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 space-y-2 bg-slate-50 border border-slate-100 p-3 rounded-xl">
                        <p className="text-xs font-medium text-slate-600 mb-2">Password must contain:</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <RuleItem met={passwordRules.length} text="At least 8 characters" />
                          <RuleItem met={passwordRules.uppercase} text="One uppercase letter" />
                          <RuleItem met={passwordRules.number} text="One number" />
                          <RuleItem met={passwordRules.special} text="One special character" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading || (authMethod === 'email' && mode === 'signup' && !allRulesMet)}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  {authMethod === 'phone' ? (
                    otpSent ? 'Verify & Sign In' : 'Send Verification Code'
                  ) : (
                    mode === 'login' ? 'Sign In' : `Create ${activeTab === 'user' ? 'Customer' : 'Provider'} Account`
                  )}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative mt-8 mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => { setAuthMethod(authMethod === 'email' ? 'phone' : 'email'); setError(null); }}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {authMethod === 'email' ? <Smartphone className="w-5 h-5 text-indigo-500" /> : <Mail className="w-5 h-5 text-indigo-500" />}
              {authMethod === 'email' ? 'Phone' : 'Email'}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-slate-500">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setError(null); }}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(null); }}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function RuleItem({ met, text }: { met: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-1.5 transition-colors ${met ? 'text-emerald-600' : 'text-slate-400'}`}>
      {met ? <Check className="w-3.5 h-3.5 shrink-0" /> : <Circle className="w-3.5 h-3.5 shrink-0" />}
      <span>{text}</span>
    </div>
  );
}
