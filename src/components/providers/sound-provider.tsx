"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import useSound from 'use-sound';

type SoundContextType = {
  playHover: () => void;
  playClick: () => void;
  playSwitch: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const isClient = typeof window !== 'undefined';

  // Load sounds
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.15 });
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.25 });
  const [playSwitch] = useSound('/sounds/switch.mp3', { volume: 0.3 });

  // Provide no-op functions during SSR to prevent hydration errors
  const value = isClient
    ? { playHover, playClick, playSwitch }
    : { playHover: () => {}, playClick: () => {}, playSwitch: () => {} };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
}

export function useHoverSound() {
  const context = useContext(SoundContext);
  if (!context) throw new Error('useHoverSound must be used within a SoundProvider');
  return context.playHover;
}

export function useClickSound() {
  const context = useContext(SoundContext);
  if (!context) throw new Error('useClickSound must be used within a SoundProvider');
  return context.playClick;
}

export function useThemeSound() {
  const context = useContext(SoundContext);
  if (!context) throw new Error('useThemeSound must be used within a SoundProvider');
  return context.playSwitch;
}
