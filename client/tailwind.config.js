/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        '10xl': '10rem',
      },
      colors: {
        'bright-yellow': {
          100: '#F7E05E',
          200: '#F6DB47',
          300: '#F5D62F',
          400: '#F4D218',
          500: '#f3cd00',
          600: '#E6C200',
          700: '#D8B600',
          800: '#CBAB00',
          900: '#BEA000',
        },
        'deep-red': {
          100: '#D78281',
          200: '#D06D6C',
          300: '#C95857',
          400: '#bc2e2d',
          500: '#B32C2B',
          600: '#A92929',
          700: '#A02726',
          800: '#962524',
          900: '#8D2322',
        },
        'bright-blue': {
          100: '#668BBE',
          200: '#4D77B3',
          300: '#3364A8',
          400: '#1A509D',
          500: '#003d92',
          600: '#003A8B',
          700: '#00347C',
          800: '#003175',
          900: '#002E6E',
        },
        'grayish-brown': {
          100: '#9E9391',
          200: '#8E817E',
          300: '#7E6F6C',
          400: '#6E5D59',
          500: '#5e4b47',
          600: '#594743',
          700: '#50403C',
          800: '#4B3C39',
          900: '#473835',
        },
        'dark-cyan': {
          100: '#6FA2B0',
          200: '#5A95A5',
          300: '#458799',
          400: '#307A8E',
          500: '#1b6c82',
          600: '#1A667B',
          700: '#186074',
          800: '#175A6D',
          900: '#155465',
        },
        'grayish-yellow': {
          100: '#F7F9F5',
          200: '#F6F9F3',
          300: '#F5F8F2',
          400: '#F4F7F1',
          500: '#f3f6ef',
          600: '#E6E9E2',
          700: '#D8DBD5',
          800: '#CBCDC8',
          900: '#BEC0BA',
        },
      },
    },
  },
  plugins: [],
  //Mantine UIとTailwind CSSの互換性の問題の解消のため、preflightの設定をする
  corePlugins: {
    preflight: false,
  },
};
