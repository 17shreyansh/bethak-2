import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { togethryTheme } from './theme-togethry';
import './index-togethry.css';
import AppRouter from './AppRouter.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={togethryTheme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  </StrictMode>
);
