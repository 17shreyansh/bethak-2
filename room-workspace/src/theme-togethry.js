import { createTheme } from '@mui/material/styles';

// Togethry Design System - Minimal, Modern, Fast
// Inspired by Linear, Notion, Arc Browser

const COLORS = {
  // Neutral palette
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  // Single accent color - refined blue
  accent: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  // Semantic colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

export const togethryTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: COLORS.accent[600],
      light: COLORS.accent[400],
      dark: COLORS.accent[700],
      contrastText: '#ffffff',
    },
    background: {
      default: COLORS.neutral[50],
      paper: '#ffffff',
    },
    text: {
      primary: COLORS.neutral[900],
      secondary: COLORS.neutral[600],
      disabled: COLORS.neutral[400],
    },
    divider: COLORS.neutral[200],
    grey: COLORS.neutral,
    success: { main: COLORS.success },
    warning: { main: COLORS.warning },
    error: { main: COLORS.error },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: { fontWeight: 700, fontSize: '2.5rem', letterSpacing: '-0.02em', lineHeight: 1.2 },
    h2: { fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.01em', lineHeight: 1.25 },
    h3: { fontWeight: 600, fontSize: '1.5rem', letterSpacing: '-0.01em', lineHeight: 1.3 },
    h4: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.4 },
    h5: { fontWeight: 600, fontSize: '1.125rem', lineHeight: 1.4 },
    h6: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.5 },
    body1: { fontWeight: 400, fontSize: '0.9375rem', lineHeight: 1.6 },
    body2: { fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 500, fontSize: '0.875rem' },
    caption: { fontWeight: 400, fontSize: '0.75rem', lineHeight: 1.4 },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    ...Array(18).fill('none'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '8px 16px',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        contained: {
          '&:hover': { transform: 'translateY(-1px)' },
        },
        outlined: {
          borderColor: COLORS.neutral[300],
          '&:hover': { borderColor: COLORS.neutral[400], bgcolor: COLORS.neutral[50] },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        outlined: {
          border: `1px solid ${COLORS.neutral[200]}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: `1px solid ${COLORS.neutral[200]}`,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: '0.8125rem',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          '&:hover': { bgcolor: COLORS.neutral[100] },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            '& fieldset': { borderColor: COLORS.neutral[300] },
            '&:hover fieldset': { borderColor: COLORS.neutral[400] },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: `1px solid ${COLORS.neutral[200]}`,
        },
      },
    },
  },
});

// Minimal design utilities
export const minimalStyles = {
  thinDivider: {
    borderColor: COLORS.neutral[200],
    borderWidth: '1px',
  },
  hoverLift: {
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
  },
  subtleHover: {
    transition: 'background-color 0.15s ease',
    '&:hover': {
      bgcolor: COLORS.neutral[50],
    },
  },
};
