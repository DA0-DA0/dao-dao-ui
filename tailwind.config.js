module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  options: {
    safelist: [/data-theme$/],
  },
  darkMode: 'media',
  theme: {
    fontFamily: {
      sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'JetBrains Mono, monospace, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    extend: {
      backgroundImage: {
        'gradient-radial-t':
          'radial-gradient(ellipse at top, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(ellipse, var(--tw-gradient-stops))',
        'gradient-radial-t-wide':
          'radial-gradient(80% 40% at top, var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 10s cubic-bezier(.6,1.15,.89,.81) infinite',
        'spin-medium': 'spin 3s cubic-bezier(.6,1.15,.89,.81) infinite',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/line-clamp'),
    require('./tailwind/button'),
  ],
  daisyui: {
    themes: [require('./styles/daisyui-themes.json')],
  },
}
