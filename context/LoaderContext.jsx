'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const LoaderContext = createContext(null);

export function LoaderProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 600);
      } else {
        setProgress(Math.floor(p));
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoaderContext.Provider value={{ isLoading, progress }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) throw new Error('useLoader must be used within LoaderProvider');
  return context;
}
