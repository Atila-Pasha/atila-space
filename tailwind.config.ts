import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: { extend: { colors: {
    background: 'var(--background)', surface: 'var(--surface)', elevated: 'var(--surface-elevated)',
    primary: 'var(--primary)', accent: 'var(--accent)', foreground: 'var(--foreground)',
    muted: 'var(--muted)', border: 'var(--border)',
  }, fontFamily: { sans: ['var(--font-geist)', 'sans-serif'], persian: ['var(--font-vazirmatn)', 'sans-serif'] } } },
  plugins: [typography],
};
export default config;
