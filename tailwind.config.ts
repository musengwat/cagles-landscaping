import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7b9a76',
          light: '#a4c4a0',
          dark: '#5a7456',
        },
        secondary: {
          DEFAULT: '#d7623f',
          light: '#e88d6f',
          dark: '#b54e2f',
        },
        neutral: {
          DEFAULT: '#f6f6f6',
          dark: '#e5e5e5',
        },
        text: {
          primary: '#1a3a08',
          secondary: '#4a5f3f',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
