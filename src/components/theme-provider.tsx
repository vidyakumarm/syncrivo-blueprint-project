
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'dark',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    // Function to handle theme application with mobile enforcement
    const applyTheme = () => {
      // Check for mobile viewport (standard breakpoint is usually 768px for tablets/mobile)
      // Since user said "mobile users", sticking to a safe mobile breakpoint like 768px seems reasonable.
      const isMobile = window.matchMedia('(max-width: 768px)').matches;

      // Always remove both first to ensure clean state
      root.classList.remove('light', 'dark');

      if (isMobile) {
        console.log('🎨 [ThemeProvider] Enforcing Dark Mode for Mobile');
        root.classList.add('dark');
        return;
      }

      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';

        console.log('🎨 [ThemeProvider] System theme detected', { systemTheme });
        root.classList.add(systemTheme);
      } else {
        console.log('🎨 [ThemeProvider] Applying manual theme', { theme });
        root.classList.add(theme);
      }
    };

    applyTheme();

    // Listen for resize events to handle switching between mobile/desktop if window is resized
    const handleResize = () => applyTheme();
    window.addEventListener('resize', handleResize);

    // Listen for system theme changes (only matters if not mobile and theme is system)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      // Only apply if NOT mobile. If mobile, we ignore system preferences and stick to dark.
      if (window.matchMedia('(max-width: 768px)').matches) return;

      if (theme === 'system') {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        root.classList.remove('light', 'dark');
        root.classList.add(newSystemTheme);
      }
    };
    mediaQuery.addEventListener('change', handleSystemChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleSystemChange);
    };
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
