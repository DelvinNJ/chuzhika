"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface LoadingContextType {
  isLoading: boolean;
  isReady: boolean;
  progress: number;
  setProgress: (val: number | ((prev: number) => number)) => void;
  triggerReady: () => void;
  completeLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  isReady: false,
  progress: 0,
  setProgress: () => {},
  triggerReady: () => {},
  completeLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  const triggerReady = useCallback(() => {
    setIsReady(true);
  }, []);

  const completeLoading = useCallback(() => {
    setIsReady(true);
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        isReady,
        progress,
        setProgress,
        triggerReady,
        completeLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
