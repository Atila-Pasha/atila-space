import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: { extend: { colors: {
    background: 'var(--background)', surface: 'var(--surface)', elevated: 'var(--surface-elevated)',
    primary: 'var(--primary)', accent: 'var(--accent)', foreground: 'var(--foreground)',
    muted: 'var(--muted)', border: 'var(--border)',
  }, fontFamily: { sans: ['var(--font-geist)', 'sans-serif'], persian: ['var(--font-vazirmatn)', 'sans-serif'] } } },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
