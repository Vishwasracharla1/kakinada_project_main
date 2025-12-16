import { Shield, User, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface LoginPageProps {
  onLogin: (user: { role: string; username: string; name: string }) => void;
}

// Demo credentials
const demoCredentials: Record<string, { password: string; role: 'operator' | 'supervisor' | 'admin'; name: string }> = {
  'operator001': { password: 'demo123', role: 'operator', name: 'Ramesh Kumar' },
  'supervisor001': { password: 'demo123', role: 'supervisor', name: 'SI Priya Singh' },
  'admin001': { password: 'demo123', role: 'admin', name: 'System Admin' }
};

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const credentials = demoCredentials[username.toLowerCase()];
    if (!credentials || credentials.password !== password) {
      setError('Invalid username or password');
      return;
    }

    // Successful login: send full user info
    onLogin({
      role: credentials.role,
      username,
      name: credentials.name
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-16 h-16 text-blue-400" />
          </div>
          <h1 className="text-white text-3xl mb-2">Kakinada 360</h1>
          <p className="text-blue-300 mb-1">Command & Control Centre</p>
          <p className="text-slate-400 text-sm">Andhra Pradesh Police • Smart City Operations</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-white text-xl mb-2">Authorized Access Only</h2>
            <p className="text-slate-400 text-sm">Enter your credentials to access the system</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm mb-2">User ID / Badge Number</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter your User ID"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <button
              onClick={() => setShowCredentials(!showCredentials)}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              {showCredentials ? '← Hide' : 'View'} Demo Credentials
            </button>

            {showCredentials && (
              <div className="mt-4 bg-slate-900/50 rounded-lg p-4">
                <p className="text-slate-400 text-xs mb-3">Demo Mode - Use these credentials:</p>
                <div className="space-y-2 text-xs">
                  {Object.entries(demoCredentials).map(([userId, creds]) => (
                    <div key={userId} className="flex justify-between text-slate-400">
                      <span className="font-mono">{userId}</span>
                      <span className="text-slate-500">•</span>
                      <span className="font-mono">{creds.password}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-blue-400">{creds.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
