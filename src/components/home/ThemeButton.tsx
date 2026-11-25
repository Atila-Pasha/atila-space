'use client';

import { useState } from 'react';
import { Icon } from './Icon';

export function ThemeButton() {
  const [glowMuted, setGlowMuted] = useState(false);
  return <button
    className="theme-button"
    type="button"
    aria-label={glowMuted ? 'Restore violet glow' : 'Reduce violet glow'}
    title={glowMuted ? 'Restore violet glow' : 'Reduce violet glow'}
    onClick={() => {
      const next = !glowMuted;
      setGlowMuted(next);
      document.documentElement.classList.toggle('glow-muted', next);
    }}
  ><Icon name={glowMuted ? 'sun' : 'moon'} /></button>;
}
