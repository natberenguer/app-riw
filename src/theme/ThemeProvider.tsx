import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { colors } from './colors';
import { gradients } from './gradients';
import { typography } from './typography';

type Theme = {
  colors: typeof colors;
  gradients: typeof gradients;
  typography: typeof typography;
};

const ThemeContext = createContext<Theme>({
  colors,
  gradients,
  typography,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo(
    () => ({
      colors,
      gradients,
      typography,
    }),
    []
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

