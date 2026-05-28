export const Colors = {
  primary: '#10b981',
  primaryDark: '#059669',
  primaryLight: '#d1fae5',
  primaryBg: '#ecfdf5',

  background: '#f8fafc',
  card: '#ffffff',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',

  text: '#0f172a',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',

  amber: '#f59e0b',
  amberLight: '#fef3c7',
  blue: '#3b82f6',
  blueLight: '#dbeafe',
  rose: '#f43f5e',
  roseLight: '#ffe4e6',
  purple: '#8b5cf6',
  purpleLight: '#ede9fe',

  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',

  white: '#ffffff',
  black: '#000000',
} as const;

export const Typography = {
  xs: 11,
  sm: 13,
  base: 15,
  lg: 17,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
} as const;

export const Spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
} as const;
