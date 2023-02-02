const defaultTheme = require('tailwindcss/defaultTheme')

const { animation } = require('./animation')
const {
  backgroundColor,
  borderColor,
  ringColor,
  colors,
  textColor,
} = require('./colors')
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
      // xs = 410px chosen because in the tiers of mobile screen sizes, the
      // larger phone viewport widths start just above 410px (Google Pixels at
      // 412px, iPhones at 414px).
      // https://mediag.com/blog/popular-screen-resolutions-designing-for-all/
      xs: '410px',
      ...defaultTheme.screens,
      '3xl': '1920px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial-t':
          'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(ellipse, var(--tw-gradient-stops))',
        'gradient-radial-t-wide':
          'radial-gradient(80% 50% at top, var(--tw-gradient-stops))',
        'gradient-test':
          'linear-gradient(270deg, #06090B 0%, rgba(6, 9, 11, 0) 49.62%, rgba(6, 9, 11, 0) 51.87%, #06090B 100%)',
      },
      boxShadow: {
        dp2: '0px 1px 2px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 1px 8px rgba(6, 9, 11, 0.04)',
        dp4: '0px 2px 4px rgba(0, 0, 0, 0.16), 0px 4px 8px rgba(0, 0, 0, 0.12), 0px 1px 12px rgba(6, 9, 11, 0.08)',
        dp8: '0px 6px 12px rgba(0, 0, 0, 0.24), 0px 12px 16px rgba(6, 9, 11, 0.2), 0px 1px 20px rgba(0, 0, 0, 0.16)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
        sans: ['inter', ...defaultTheme.fontFamily.sans],
        studiofeixen: ['studiofeixen', ...defaultTheme.fontFamily.sans],
      },
      animation,
      backgroundColor,
      borderColor,
      ringColor,
      colors,
      keyframes,
      textColor,
    },
  },
}

module.exports = tailwindConfig
