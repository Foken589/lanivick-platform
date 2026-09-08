import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const Auth: React.FC = () => {
  const [tab, setTab] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, register, loginDemoCustomer, loginDemoAdmin } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please provide your email address.', 'error');
      return;
    }

    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);

    if (email.toLowerCase().includes('admin')) {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      showToast('Please fill in all registration fields.', 'error');
      return;
    }

    setIsLoading(true);
    await register(name, email, phone);
    setIsLoading(false);
    navigate('/dashboard');
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Password reset link sent to ${email || 'your email'}. Check your inbox!`, 'info');
    setTab('login');
  };

  return (
    <div className="bg-radial-gradient min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-luxury border border-borderLine p-8 sm:p-10">
        {/* Brand Monogram */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-wine-900 text-gold-400 flex items-center justify-center font-serif text-2xl font-bold mx-auto mb-3 shadow-md border border-gold-500/30">
            L
          </div>
          <h2 className="font-serif text-2xl font-bold text-ink-900">
            {tab === 'login' && 'Welcome to Lanivick'}
            {tab === 'signup' && 'Create Your Account'}
            {tab === 'forgot' && 'Reset Your Password'}
          </h2>
          <p className="text-xs text-ink-500 mt-1">
            {tab === 'login' && 'Sign in to track orders, save hair bookings, and manage addresses.'}
            {tab === 'signup' && 'Join Lanivick for seamless treats and priority hair styling.'}
            {tab === 'forgot' && 'Enter your email to receive recovery instructions.'}
          </p>
        </div>

        {/* Tab Toggle (Only for login / signup) */}
        {tab !== 'forgot' && (
          <div className="flex rounded-2xl bg-cream-100 p-1 mb-6 border border-borderLine">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                tab === 'login' ? 'bg-white text-wine-900 shadow-xs' : 'text-ink-500 hover:text-ink-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                tab === 'signup' ? 'bg-white text-wine-900 shadow-xs' : 'text-ink-500 hover:text-ink-900'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* 1. Login Form */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-ink-800">Password</label>
                <button
                  type="button"
                  onClick={() => setTab('forgot')}
                  className="text-[11px] text-wine-900 hover:underline font-semibold"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In to Account'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* 2. Signup Form */}
        {tab === 'signup' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Chioma Adebayo"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0803 123 4567"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1">Create Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{isLoading ? 'Creating Account...' : 'Complete Registration'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* 3. Forgot Password Form */}
        {tab === 'forgot' && (
          <form onSubmit={handleForgot} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-ink-800 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine text-xs focus:border-wine-900 focus:outline-none bg-cream-50/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-wine-900 hover:bg-wine-800 text-white font-bold text-xs transition-all"
            >
              Send Reset Link
            </button>

            <button
              type="button"
              onClick={() => setTab('login')}
              className="w-full text-center text-xs text-ink-500 hover:text-ink-900 mt-2"
            >
              Back to Sign In
            </button>
          </form>
        )}

        {/* Fast 1-Click Demo Switcher Section */}
        <div className="mt-8 pt-6 border-t border-borderLine">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-ink-500 block text-center mb-3">
            Instant Demo Account Access
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                loginDemoCustomer();
                navigate('/dashboard');
              }}
              className="p-2.5 rounded-xl border border-borderLine bg-cream-50 hover:bg-cream-100 text-xs font-bold text-ink-800 flex items-center justify-center gap-1.5 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-wine-900" />
              <span>Demo Customer</span>
            </button>

            <button
              type="button"
              onClick={() => {
                loginDemoAdmin();
                navigate('/admin');
              }}
              className="p-2.5 rounded-xl border border-wine-300 bg-wine-50 hover:bg-wine-100 text-xs font-bold text-wine-900 flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-wine-900" />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
