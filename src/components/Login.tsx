import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { X, Mail, Lock, LogIn } from 'lucide-react';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login = ({ isOpen, onClose }: LoginProps) => {
  // ...existing state...
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // Newly added error message state
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        const msg = error.message.includes('Invalid login credentials')
          ? 'Email atau password salah. Silakan coba lagi.'
          : error.message || 'Gagal login';
        setErrorMessage(msg);
        throw error;
      }
      toast.success('Login berhasil!');
      onClose();
    } catch (error: any) {
      // Error sudah di-handle melalui errorMessage
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Selamat Datang
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* New Error Message Box */}
          {errorMessage && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm shadow-sm">
              {errorMessage}
            </div>
          )}

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Silakan masuk untuk melanjutkan ke panel admin
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* ...existing form fields... */}
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Masukkan email anda"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Masukkan password anda"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
            >
              <LogIn className="h-5 w-5" />
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Login;
