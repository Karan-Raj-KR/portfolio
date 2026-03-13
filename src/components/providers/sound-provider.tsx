"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import useSound from 'use-sound';

type SoundContextType = {
  playHover: () => void;
  playClick: () => void;
  playSwitch: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const isClient = typeof window !== 'undefined';
  const [soundEnabled, setSoundEnabled] = useState(false); // Default to muted

  // Load sounds (increased volume because they can be too subtle to hear)
  const [playHover] = useSound('/sounds/hover.wav', { volume: 0.5 });
  const [playClick] = useSound('/sounds/click.wav', { volume: 0.6 });
  const [playSwitch] = useSound('/sounds/switch.wav', { volume: 0.7 });

  // Provide no-op functions during SSR to prevent hydration errors,
  // and wrap play functions in soundEnabled check
  const value = isClient
    ? {
        playHover: () => soundEnabled && playHover(),
        playClick: () => soundEnabled && playClick(),
        playSwitch: () => soundEnabled && playSwitch(),
        soundEnabled,
        toggleSound: () => setSoundEnabled((prev) => !prev),
      }
    : {
        playHover: () => {},
        playClick: () => {},
        playSwitch: () => {},
        soundEnabled: true,
        toggleSound: () => {},
      };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  const context = useContext(SoundContext);
  if (!context) throw new Error('useSoundContext must be used within a SoundProvider');
  return context;
}

export function useHoverSound() {
  const { playHover } = useSoundContext();
  return playHover;
}

export function useClickSound() {
  const { playClick } = useSoundContext();
  return playClick;
}

export function useThemeSound() {
  const { playSwitch } = useSoundContext();
  return playSwitch;
}
