import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  colors: typeof darkColors;
  setTheme: (theme: ThemeType) => void;
}

const lightColors = {
  primary: '#0066CC',
  primaryTransparent: 'rgba(0, 102, 204, 0.1)',
  secondary: '#00CC99',
  accent: '#FF6600',
  background: '#F7F9FC',
  backgroundDarker: '#E5E9F0',
  backgroundTransparent: 'rgba(0, 0, 0, 0.4)',
  card: '#FFFFFF',
  text: '#2E3440',
  textSecondary: '#4C566A',
  textLight: '#FFFFFF',
  border: '#E5E9F0',
  success: '#4CAF50',
  warning: '#FFA600',
  error: '#FF3B30',
};

const darkColors = {
  primary: '#4D9DFF',
  primaryTransparent: 'rgba(77, 157, 255, 0.1)',
  secondary: '#00E5AD',
  accent: '#FF7E33',
  background: '#1E2229',
  backgroundDarker: '#171A1F',
  backgroundTransparent: 'rgba(0, 0, 0, 0.6)',
  card: '#2E343D',
  text: '#ECEFF4',
  textSecondary: '#8E99AB',
  textLight: '#FFFFFF',
  border: '#393F4A',
  success: '#5BD75B',
  warning: '#FFB84D',
  error: '#FF6961',
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  colors: darkColors,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>('dark');
  
  // Determine colors based on the active theme
  const getColors = () => {
    if (theme === 'system') {
      return systemColorScheme === 'dark' ? darkColors : lightColors;
    }
    return theme === 'dark' ? darkColors : lightColors;
  };
  
  const contextValue = {
    theme,
    colors: getColors(),
    setTheme,
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeProvider