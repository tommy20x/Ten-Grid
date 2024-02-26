import { createTheme } from '@mui/material/styles';
import { red, indigo, amber } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      cardBorder: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors?: {
      cardBorder?: string;
    };
  }
}

// A light theme for this app
export const light = createTheme({
  palette: {
    primary: {
      main: indigo[500],//'#1FC7D4',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  colors: {
    cardBorder: '#ffffff'
  }
});

// A dark theme for this app
export const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: amber[500],
    },
  },
  colors: {
    cardBorder: '#ffffff'
  }
});
