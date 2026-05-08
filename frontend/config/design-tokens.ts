/**
 * Design System Tokens
 * Central source of truth for the Landing Page Engine.
 * Supports dynamic CSS Variables for real-time updates without re-renders.
 */

export const designTokens = {
  colors: {
    // Estas serão mapeadas para CSS Variables no editor
    primary: 'var(--primary-color, #6366f1)',
    secondary: 'var(--secondary-color, #f43f5e)',
    background: 'var(--bg-color, #ffffff)',
    foreground: 'var(--text-color, #0f172a)',
    muted: 'var(--muted-color, #64748b)',
    accent: 'var(--accent-color, #8b5cf6)',
    border: 'var(--border-color, #e2e8f0)',
  },
  typography: {
    fonts: {
      sans: 'var(--font-sans, "Inter", sans-serif)',
      serif: 'var(--font-serif, "Playfair Display", serif)',
      mono: 'var(--font-mono, "JetBrains Mono", monospace)',
      display: 'var(--font-display, "Outfit", sans-serif)',
    },
    scales: {
      xs: 'clamp(0.7rem, 0.6rem + 0.5vw, 0.8rem)',
      sm: 'clamp(0.8rem, 0.7rem + 0.5vw, 0.9rem)',
      base: 'clamp(1rem, 0.9rem + 0.5vw, 1.1rem)',
      lg: 'clamp(1.2rem, 1.1rem + 0.5vw, 1.3rem)',
      xl: 'clamp(1.5rem, 1.3rem + 1vw, 1.8rem)',
      '2xl': 'clamp(2rem, 1.8rem + 1.5vw, 2.5rem)',
      '3xl': 'clamp(3rem, 2.5rem + 2vw, 4rem)',
      '4xl': 'clamp(4rem, 3rem + 3vw, 6rem)',
    }
  },
  spacing: {
    safe: 'max(1.5rem, 5vw)',
    section: 'clamp(4rem, 8rem + 5vh, 12rem)',
  },
  radius: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    neon: '0 0 20px var(--primary-color)',
  }
};
