import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0A',
          secondary: '#141414',
          tertiary: '#1A1A1A',
        },
        text: {
          primary: '#E8E8E8',
          secondary: '#8A8A8A',
          tertiary: '#606060',
        },
        accent: '#C8A97E',
        border: '#1E1E1E',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
