const defaultTheme = require('tailwindcss/defaultTheme')

const { animation } = require('./animation')
const { backgroundColor, borderColor, colors, textColor } = require('./colors')
const { keyframes } = require('./keyframes')

/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const tailwindConfig = {
  darkMode: 'class',
  options: {
    safelist: [/data-theme$/],
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('./button'),
    require('@tailwindcss/typography'),
  ],
  theme: {
    screens: {
      xs: '416px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        'gradient-radial-t': `radial-gradient(ellipse at top, var(--tw-gradient-stops))`,
        'gradient-radial': `radial-gradient(ellipse, var(--tw-gradient-stops))`,
        'gradient-radial-t-wide': `radial-gradient(80% 50% at top, var(--tw-gradient-stops))`,
        'gradient-test': `linear-gradient(270deg, #06090B 0%, rgba(6, 9, 11, 0) 49.62%, rgba(6, 9, 11, 0) 51.87%, #06090B 100%)`,
      },
      boxShadow: {
        slider: '0 0 0 5px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
        sans: ['inter', ...defaultTheme.fontFamily.sans],
      },
      animation,
      backgroundColor,
      borderColor,
      colors,
      keyframes,
      textColor,
    },
  },
}

module.exports = tailwindConfig
