import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      head: ['"Gloria Hallelujah"', 'system-ui', 'sans-serif'],
      text: ['"Grandstander Variable"', 'system-ui', 'sans-serif'],
    },
    colors: {
      text: {
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
      primary: {
        DEFAULT: '#f3496e',
      },
      primaryDark: {
        DEFAULT: '#f3496e',
      },
      secondary: {
        DEFAULT: '#def7ac',
      },
      secondaryDark: {
        DEFAULT: '#070a01',
      },
      accent: {
        DEFAULT: '#0dc9a0',
      },
      accentDark: {
        DEFAULT: '#79f6db',
      },
    },
    extend: {},
    data: {},
  },
  plugins: [],
} satisfies Config;
