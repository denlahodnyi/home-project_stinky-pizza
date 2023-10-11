import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      head: ['"Gloria Hallelujah"', 'system-ui', 'sans-serif'],
      text: ['"Grandstander Variable"', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        text: {
          // light: '#888888',
          DEFAULT: '#0e032b',
        },
        textDark: {
          DEFAULT: '#fbfaff',
        },
        background: {
          DEFAULT: '#fbfaff',
        },
        backgroundDark: {
          DEFAULT: '#0e032b',
        },
        surface: {
          DEFAULT: '#ece8ff',
        },
        surfaceDark: {
          DEFAULT: '#1b0651',
        },
        primary: {
          light: '#fecdd5',
          DEFAULT: '#f3496e',
          hover: '#df1f52',
          active: '#bd1345',
          dark: '#87143c',
        },
        primaryDark: {
          DEFAULT: '#f3496e',
        },
        secondary: {
          light: '#def7ac',
          DEFAULT: '#85c61c',
          hover: '#669e12',
          active: '#4d7813',
          dark: '#375116',
        },
        secondaryDark: {
          DEFAULT: '#070a01',
        },
        accent: {
          light: '#a5f5d9',
          DEFAULT: '#0dc9a0',
        },
        accentDark: {
          DEFAULT: '#79f6db',
        },
        error: {
          DEFAULT: colors.red[600],
        },
      },
    },
    data: {},
  },
  plugins: [],
} satisfies Config;
