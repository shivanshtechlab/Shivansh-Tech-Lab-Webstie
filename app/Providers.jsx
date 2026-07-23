'use client'

import { ThemeProvider } from '../context/ThemeContext';
import { LoaderProvider } from '../context/LoaderContext';
import { AppProvider } from '../context/AppContext';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <LoaderProvider>
        <AppProvider>
          {children}
        </AppProvider>
      </LoaderProvider>
    </ThemeProvider>
  );
}
