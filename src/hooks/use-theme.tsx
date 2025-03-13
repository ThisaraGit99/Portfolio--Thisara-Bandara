
import { createContext, useContext, useEffect, useState } from 'react';

// Removed Theme type and now using a constant light theme
const THEME = 'light';

interface ThemeContextType {
  theme: string;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: THEME,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always use light theme
  const value = {
    theme: THEME,
  };

  useEffect(() => {
    // Remove dark class and ensure light theme is applied
    document.documentElement.classList.remove('dark');
    
    // Apply any light-theme specific settings if needed
    localStorage.setItem('theme', THEME);
  }, []);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
