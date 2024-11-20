import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Moon, 
  Upload, 
  LayoutDashboard, 
  Share2, 
  BarChart2, 
  Calendar, 
  Share,
  LogOut,
  Settings,
  User as UserIcon
} from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';
import { GoogleLogin } from '@react-oauth/google';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation = () => {
  const { theme, currentTheme, setTheme } = useThemeStore();
  const { user, isAuthenticated, setUser, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  const cycleTheme = () => {
    const themes: Array<'blue' | 'purple' | 'gold'> = ['blue', 'purple', 'gold'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const handleGoogleSuccess = (response: any) => {
    // Decode the JWT token to get user info
    const decoded = JSON.parse(atob(response.credential.split('.')[1]));
    setUser({
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture
    });
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/upload', icon: Upload, label: 'Upload' },
    { path: '/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/api-management', icon: Share2, label: 'API Management' },
    { path: '/analytics', icon: BarChart2, label: 'Analytics' },
  ];

  return (
    <nav className={`${theme.gradient} shadow-lg sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-white/10 backdrop-blur-sm`}>
                <Share className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Media Manager</span>
            </Link>
            <div className="hidden md:flex space-x-4">
              {navItems.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium
                    ${location.pathname === path 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                    } transition-colors`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={cycleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Change theme"
            >
              <Moon className="w-6 h-6" />
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <img
                    src={user?.picture}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 shadow-lg py-1"
                    >
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                      </div>
                      <button
                        onClick={() => {}}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>Profile</span>
                      </button>
                      <button
                        onClick={() => {}}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log('Login Failed')}
                useOneTap
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};