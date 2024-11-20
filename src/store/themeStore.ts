import { create } from 'zustand';
import { ThemeColor, Theme } from '../types/theme';

const themes: Record<ThemeColor, Theme> = {
  blue: {
    primary: 'from-blue-500 to-blue-900',
    secondary: 'from-cyan-400 to-blue-600',
    accent: 'text-blue-400',
    gradient: 'bg-gradient-to-br from-blue-500 via-blue-700 to-blue-900'
  },
  purple: {
    primary: 'from-purple-500 to-purple-900',
    secondary: 'from-fuchsia-400 to-purple-600',
    accent: 'text-purple-400',
    gradient: 'bg-gradient-to-br from-purple-500 via-purple-700 to-purple-900'
  },
  gold: {
    primary: 'from-amber-400 to-amber-800',
    secondary: 'from-yellow-400 to-amber-600',
    accent: 'text-amber-400',
    gradient: 'bg-gradient-to-br from-[#FFD700] via-[#DAA520] to-[#B8860B]'
  }
};

interface ThemeStore {
  currentTheme: ThemeColor;
  theme: Theme;
  setTheme: (color: ThemeColor) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  currentTheme: 'blue',
  theme: themes.blue,
  setTheme: (color) => set({ currentTheme: color, theme: themes[color] })
}));